const CoworkingSpace = require('../models/CoworkingSpace');
const Reservation = require('../models/Reservation');
const Invitation = require('../models/Invitation');
const User = require('../models/User');

const { ErrorResponse, MSG } = require('../utils/error');
const { reservationBubble, getRecipientLineIds } = require('../utils/line');

// @desc    Get all reservations
// @route   GET /api/v1/reservations
// @route   GET /api/v1/coworking-spaces/:coworkingSpaceId/reservations
// @access  Private
exports.getReservations = async (req, res, next) => {
    try {
        const filter = {};

        // Filter by coworking space if nested route is used (applies to ALL roles)
        if (req.params.coworkingSpaceId) {
            filter.coworkingSpace = req.params.coworkingSpaceId;
        }

        // Non-admins can only see reservations they own or co-booked
        if (req.user.role !== 'admin') {
            filter.$or = [{ user: req.user.id }, { cobooker: req.user.id }];
        }

        // Executing query with filter
        const reservations = await Reservation.find(filter)
            .sort({ reserveDate: -1 })
            .populate([
                {
                    path: 'coworkingSpace',
                    select: 'name address telephoneNumber openTime closeTime maximumCapacity',
                },
                {
                    path: 'user',
                    select: 'name email',
                },
                {
                    path: 'cobooker',
                    select: 'name email',
                },
            ]);

        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single reservation
// @route   GET /api/v1/reservations/:id
// @access  Private
exports.getReservation = async (req, res, next) => {
    try {
        // Find Reservation by ID
        const reservation = await Reservation.findById(req.params.id);

        // Reservation with the ID not found
        if (!reservation) {
            return next(
                new ErrorResponse(
                    MSG.RESERVATION_NOT_FOUND(req.params.id),
                    404,
                ),
            );
        }

        // Check if user is owner/co-booker/admin
        const isOwner = reservation.user.toString() === req.user.id;
        const isCobooker = reservation.cobooker.some(
            (userId) => userId.toString() === req.user.id,
        );
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isCobooker && !isAdmin) {
            return next(new ErrorResponse(MSG.NOT_RESOURCE_OWNER, 403));
        }

        // Query co-working space and user/cobooker name
        await reservation.populate([
            {
                path: 'coworkingSpace',
                select: 'name address telephoneNumber openTime closeTime maximumCapacity',
            },
            {
                path: 'user',
                select: 'name email',
            },
            {
                path: 'cobooker',
                select: 'name email',
            },
        ]);

        // Fetch associated invitations
        const invitationFilter = { reservation: req.params.id };

        // Hosts and admins see all invitations; co-bookers see only invitations meant for them
        if (!isOwner && !isAdmin) {
            invitationFilter.recipient = req.user.id;
        }

        const invitations = await Invitation.find(invitationFilter)
            .sort({ updatedAt: -1 })
            .populate('inviter', 'name email')
            .populate('recipient', 'name email');

        // Found Reservation
        res.status(200).json({
            success: true,
            data: {
                ...reservation.toObject(),
                invitations,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a reservation
// @route   POST /api/v1/coworking-spaces/:coworkingSpaceId/reservations
// @access  Private
exports.createReservation = async (req, res, next) => {
    try {
        req.body.coworkingSpace = req.params.coworkingSpaceId;

        const coworkingSpace = await CoworkingSpace.findById(
            req.params.coworkingSpaceId,
        );

        if (!coworkingSpace)
            return next(
                new ErrorResponse(
                    MSG.COWORKING_SPACE_NOT_FOUND(req.params.coworkingSpaceId),
                    404,
                ),
            );

        // Add user Id to req.body
        req.body.user = req.user.id;

        // Check for existed reservation
        const existedReservations = await Reservation.find({
            user: req.user.id,
        });

        // If the user is not an admin, they can only create 3 appointment.
        if (existedReservations.length >= 3 && req.user.role !== 'admin')
            return next(
                new ErrorResponse(MSG.RESERVATION_LIMIT(req.user.id), 400),
            );

        const reservation = await Reservation.create(req.body);

        // LINE Message for user login with LINE
        // const lineUserIds = await getRecipientLineIds(reservation, req.user.id);
        // if (lineUserIds.length > 0) {
        //     lineUserIds.forEach((lineUserId) => {
        //         reservationBubble(
        //             lineUserId,
        //             coworkingSpace,
        //             reservation,
        //             'created',
        //         ).catch((err) =>
        //             console.error(MSG.CANT_SEND_LINE_MSG(lineUserId), err),
        //         );
        //     });
        // }

        res.status(201).json({
            success: true,
            data: reservation,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update reservation
// @route   PUT /api/v1/reservations/:id
// @access  Private
exports.updateReservation = async (req, res, next) => {
    try {
        let reservation = await Reservation.findById(req.params.id);

        if (!reservation)
            return next(
                new ErrorResponse(
                    MSG.RESERVATION_NOT_FOUND(req.params.id),
                    404,
                ),
            );

        // Make sure user is the appointment owner
        if (
            reservation.user.toString() !== req.user.id &&
            req.user.role !== 'admin'
        )
            return next(new ErrorResponse(MSG.NOT_RESOURCE_OWNER, 403));

        reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            },
        );

        // LINE Message for user login with LINE
        // const lineUserIds = await getRecipientLineIds(reservation, req.user.id);
        // if (lineUserIds.length > 0) {
        //     const coworkingSpace = await CoworkingSpace.findById(
        //         reservation.coworkingSpace,
        //     );
        //     lineUserIds.forEach((lineUserId) => {
        //         reservationBubble(
        //             lineUserId,
        //             coworkingSpace,
        //             reservation,
        //             'updated',
        //         ).catch((err) =>
        //             console.error(MSG.CANT_SEND_LINE_MSG(lineUserId), err),
        //         );
        //     });
        // }

        res.status(200).json({
            success: true,
            data: reservation,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete reservation
// @route   DELETE  /api/v1/reservations/:id
// @access  Private
exports.deleteReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation)
            return next(
                new ErrorResponse(
                    MSG.RESERVATION_NOT_FOUND(req.params.id),
                    404,
                ),
            );

        // Make sure user is the reservation owner
        if (
            reservation.user.toString() !== req.user.id &&
            req.user.role !== 'admin'
        ) {
            return next(new ErrorResponse(MSG.NOT_RESOURCE_OWNER, 403));
        }

        // Cascade delete all invitations related to this reservation
        await Invitation.deleteMany({
            reservation: req.params.id,
        });

        // Delete Reservation
        await reservation.deleteOne();

        // LINE Message for user login with LINE
        // const lineUserIds = await getRecipientLineIds(reservation, req.user.id);
        // if (lineUserIds.length > 0) {
        //     const coworkingSpace = await CoworkingSpace.findById(
        //         reservation.coworkingSpace,
        //     );
        //     lineUserIds.forEach((lineUserId) => {
        //         reservationBubble(
        //             lineUserId,
        //             coworkingSpace,
        //             reservation,
        //             'deleted',
        //         ).catch((err) =>
        //             console.error(MSG.CANT_SEND_LINE_MSG(lineUserId), err),
        //         );
        //     });
        // }

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};
