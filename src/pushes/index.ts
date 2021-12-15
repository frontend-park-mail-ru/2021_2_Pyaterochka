import app from '../../modules/irbis';

const socket = new WebSocket('wss://api.pyaterochka-team.site/api/v1/user/push');

socket.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`);
    app.$notification.push('', 3000, {
        message: 'Там что-то прилетело. Смотри консоль.'
    });
};

socket.onclose = function (event) {
    if (event.wasClean) {
        // alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        // alert('[close] Connection died');
    }
};

socket.onerror = function (error: ErrorEvent) {
    console.error(`[error] ${error.message}`);
};

export default socket;
