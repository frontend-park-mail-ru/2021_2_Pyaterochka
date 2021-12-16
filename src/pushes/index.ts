import app from '../../modules/irbis';

// type ID = string | number;
/**
type ServerNotification = {
    type: 'Comment',
    push: {
        post_id: ID,

    }
};
 **/

const socket = new WebSocket('wss://pyaterochka-team.site/api/v1/user/push');

socket.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`);
    app.$notification.push('', 3000, {
        message: 'Там что-то прилетело. Смотри консоль.'
    });
};

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);

        app.$notification.push('', 3000, {
            message: `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        });
    } else {
        console.log('[close] Connection died');
        app.$notification.push('', 3000, {
            message: '[close] Connection died'
        });
    }
};

socket.onerror = function (error: ErrorEvent) {
    console.error(`[error] ${error.message}`);
};

export default socket;
