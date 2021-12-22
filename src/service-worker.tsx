import app from 'irbis';
import Layout from './components/layout';
import LoadingView from './views/loading-view';

const askUserToUpdate = reg => {
    app.$notification.push('', -1, {
        message: 'Кажется вышло новое обновление!',
        action: 'Установить сейчас',
        onOpen: () => {
            app.setComponent(<Layout>
                <LoadingView >
                    Установка обновления
                </LoadingView>
            </Layout>);
            app.forceUpdate();

            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            });

            if (reg && reg.waiting) {
                reg.waiting.postMessage('skipWaiting');
            } else {
                window.location.reload();
            }

            setTimeout(() => {
                app.$notification.push('', -1, {
                    message: 'Установка обновления затянулась. Попробуйте обновить страницу',
                    action: 'Обновить страницу',
                    onOpen: () => {
                        window.location.reload();
                    }
                });
            }, 5000);
        }
    });
};

const registerValidSW = (swUrl) => {
    if (!('serviceWorker' in navigator)) {
        return;
    }

    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.addEventListener('updatefound', (e) => {
                if (e.target.waiting) {
                    askUserToUpdate(e.target);
                }
            });
            if (registration.waiting) {
                askUserToUpdate(registration);
            }
        });
};

export default registerValidSW;
