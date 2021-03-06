import app from '../../modules/irbis';

type ID = string | number;

const socket = new WebSocket('wss://pyaterochka-team.site/api/v1/user/push');

socket.onmessage = function (event) {
    const message = JSON.parse(event.data) as {
        type: string,
        push: Record<string, string | ID>
    };

    if (message.type === 'Post') {
        app.$notification.push('', 10000, {
            message: `Вышел новый пост "${message.push.post_title}" у автора ${message.push.creator_nickname}`,
            action: 'Открыть пост',
            onOpen: () => {
                app.$router.go(app.$router.createUrl('post.view', `${message.push.creator_id}/${message.push.post_id}`));
            }
        });
    }

    if (message.type === 'Payment') {
        app.$notification.push('', 10000, {
            message: `Оплата подписки автора ${message.push.creator_nickname} прошла успешно`,
            action: 'Открыть автора',
            onOpen: () => {
                app.$router.go(app.$router.createUrl('creator', message.push.creator_id));
            }
        });
    }

    if (message.type === 'Comment') {
        app.$notification.push('', 10000, {
            message: `Новый комментарий в посте "${message.push.post_title}"`,
            action: 'Открыть пост',
            onOpen: () => {
                app.$router.go(app.$router.createUrl('post.view', `${message.push.creator_id}/${message.push.post_id}`));
            }
        });
    }
};

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        console.log('[close] Connection died');
    }
};

socket.onerror = function (error: ErrorEvent) {
    console.error(`[error] ${error.message}`);
};

export default socket;
