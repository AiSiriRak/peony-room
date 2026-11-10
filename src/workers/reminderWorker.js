const cron = require('node-cron');
const Reservation = require('../models/Reservation');
const { reminderBubble } = require('../utils/line');

const notifyForDaysAhead = async (days) => {
    const target = new Date();
    target.setDate(target.getDate() + days);
    const dateStr = target.toISOString().split('T')[0]; // "YYYY-MM-DD"

    const reservations = await Reservation.find({ reserveDate: dateStr })
        .populate('user')
        .populate('coworkingSpace')
        .populate('cobooker');

    for (const reservation of reservations) {
        const { user, coworkingSpace, cobooker } = reservation;

        // Get all recipients
        const recipients = [user, ...(cobooker || [])];

        // Send message to everyone who login with line
        for (const recipient of recipients) {
            if (recipient?.lineUserId) {
                await reminderBubble(
                    recipient.lineUserId,
                    coworkingSpace,
                    reservation,
                    days,
                ).catch((err) =>
                    console.error(
                        `Failed to send reminder to ${recipient._id}:`,
                        err,
                    ),
                );
            }
        }
    }
};

module.exports = () => {
    cron.schedule(
        '0 10 * * *',
        () => {
            console.log('[Cron Worker] Running 10:00 AM reminders...');
            Promise.all([notifyForDaysAhead(3), notifyForDaysAhead(1)]).catch(
                (err) => console.error('Cron Worker Error:', err),
            );
        },
        {
            scheduled: true,
            timezone: 'Asia/Bangkok',
        },
    );
};
