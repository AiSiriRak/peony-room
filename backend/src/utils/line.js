const line = require('@line/bot-sdk');
const User = require('../models/User');

const ADD_LINE_LINK = 'https://lin.ee/Qp3cqaj';
const FRONTEND_URL = process.env.FRONTEND_TUNNEL_URL;

let client;
const getClient = () => {
    if (!client) {
        client = new line.messagingApi.MessagingApiClient({
            channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
        });
    }
    return client;
};

const getRecipientLineIds = async (reservation, mainUserId) => {
    const mainUser = await User.findById(mainUserId);
    await reservation.populate('cobooker');

    const recipients = [mainUser, ...(reservation.cobooker || [])];

    return [...new Set(recipients.map((u) => u?.lineUserId).filter(Boolean))];
};

// For pushing normal text
const pushText = async (to, text) => {
    try {
        return await getClient().pushMessage({
            to,
            messages: [{ type: 'text', text }],
        });
    } catch (error) {
        console.error(
            'LINE Push Message Error:',
            error.response ? error.response.data : error.message,
        );
        throw error;
    }
};

// For Reply user's message
const replyText = async (replyToken, text) => {
    try {
        return await getClient().replyMessage({
            replyToken,
            messages: [{ type: 'text', text }],
        });
    } catch (error) {
        console.error(
            'LINE reply Message Error:',
            error.response ? error.response.data : error.message,
        );
        throw error;
    }
};

// For Push message to user
const pushMessages = async (to, messages) => {
    try {
        return await getClient().pushMessage({
            to,
            messages,
        });
    } catch (error) {
        console.error(
            'LINE push Message Error:',
            error.response ? error.response.data : error.message,
        );
        throw error;
    }
};

// For sending reminder before reservation date.
// Use in this format :
// reminderBubble({UserLineId}, coworkingSpace data, reservation data, 3)
const reminderBubble = (to, coworkingSpace, reservation, days) => {
    return notiBubble(
        to,
        coworkingSpace,
        reservation,
        'Reminder',
        `${days === 0 ? 'Today is the reservation date!' : `Reservation in ${days} day${days === 1 ? '' : 's'}`}`,
        `${FRONTEND_URL}/reservations/${reservation._id}`,
    );
};

// For sending reservation status when create/update/delete reservation
// Use in this format :
// reservationBubble({UserLineId}, coworkingSpace data, reservation data, 'created')
const reservationBubble = (to, coworkingSpace, reservation, action) => {
    return notiBubble(
        to,
        coworkingSpace,
        reservation,
        'New update of reservation',
        `Your reservation has been ${action}!`,
        `${FRONTEND_URL}/reservations/${reservation._id}`,
    );
};

// For sending invitation to be co-booker
// Use in this format :
// inviteBubble({UserLineId}, coworkingSpace data, reservation data, 'Owner Name', invitation data)
const inviteBubble = async (to, invitation) => {
    return pushMessages(to, [
        {
            type: 'template',
            altText: 'You have a new invitation',
            template: {
                type: 'buttons',
                title: 'New invitation',
                text: 'Someone invited you. Do you want to accept?',
                actions: [
                    {
                        type: 'postback',
                        label: 'Accept',
                        data: `invite:accept:${invitation._id}`,
                    },
                    {
                        type: 'postback',
                        label: 'Decline',
                        data: `invite:decline:${invitation._id}`,
                    },
                ],
            },
        },
    ]);
};

// For send reminder to user in general.
// Use in this format :
// notiBubble({UserLineId}, coworkingSpace data, reservation data, 'Reminder', 'Reservation in 3 days')
const notiBubble = async (
    to,
    coworkingSpace,
    reservation,
    headerTxt,
    descriptionTxt,
    detailLink = `${FRONTEND_URL}/coworking-spaces`,
) => {
    try {
        return await getClient().pushMessage({
            to,
            messages: [
                {
                    type: 'flex',
                    altText: `${headerTxt} ${descriptionTxt}`,
                    contents: {
                        type: 'bubble',
                        body: {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                                {
                                    type: 'text',
                                    text: headerTxt,
                                    decoration: 'none',
                                    color: '#a15c86',
                                },
                                {
                                    type: 'text',
                                    text: coworkingSpace.name,
                                    weight: 'bold',
                                    size: 'xxl',
                                    margin: 'sm',
                                },
                                {
                                    type: 'text',
                                    text: descriptionTxt,
                                    weight: 'regular',
                                    size: 'xl',
                                    margin: 'none',
                                    wrap: true,
                                },
                                {
                                    type: 'box',
                                    layout: 'vertical',
                                    margin: 'lg',
                                    spacing: 'sm',
                                    contents: [
                                        {
                                            type: 'box',
                                            layout: 'baseline',
                                            spacing: 'sm',
                                            contents: [
                                                {
                                                    type: 'text',
                                                    text: 'Date',
                                                    color: '#aaaaaa',
                                                    size: 'sm',
                                                    flex: 3,
                                                },
                                                {
                                                    type: 'text',
                                                    text: reservation.reserveDate,
                                                    wrap: true,
                                                    color: '#666666',
                                                    size: 'sm',
                                                    flex: 5,
                                                },
                                            ],
                                        },
                                        {
                                            type: 'box',
                                            layout: 'baseline',
                                            spacing: 'sm',
                                            contents: [
                                                {
                                                    type: 'text',
                                                    text: 'Open time',
                                                    color: '#aaaaaa',
                                                    size: 'sm',
                                                    flex: 3,
                                                    wrap: true,
                                                },
                                                {
                                                    type: 'text',
                                                    text: `${coworkingSpace.openTime} - ${coworkingSpace.closeTime}`,
                                                    wrap: true,
                                                    color: '#666666',
                                                    size: 'sm',
                                                    flex: 5,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        footer: {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                                {
                                    type: 'button',
                                    action: {
                                        type: 'uri',
                                        label: 'Details',
                                        uri: detailLink,
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
        });
    } catch (error) {
        console.error(
            'LINE Push Message Error:',
            error.response ? error.response.data : error.message,
        );
        throw error;
    }
};

module.exports = {
    getRecipientLineIds,
    pushText,
    replyText,
    pushMessages,
    reminderBubble,
    inviteBubble,
    reservationBubble,
    notiBubble,
    ADD_LINE_LINK,
};
