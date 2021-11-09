import Button from '../components/button';
import Layout from '../components/layout';
import app from '../core/app';
import LoadingView from '../views/loading-view';

const askUserToUpdate = reg => {
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
        app.setComponent(<Layout>
            <LoadingView>
                <div style="max-width:500px;">
                    Установка обновления затянулась. Попробуйте обновить страницу.
                    <Button color="primary" text="Обновить" onClick={
                        () => {
                            window.location.reload();
                        }
                    } />
                </div>
            </LoadingView>

        </Layout>);
        app.forceUpdate();
    }, 5000);
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
                    // console.log('[Service Worker Setup]', 'has updates');
                    askUserToUpdate(e.target);
                }
            });
            if (registration.waiting) {
                // console.log('[Service Worker Setup]', 'has updates');
                askUserToUpdate(registration);
            }
        });
};

export default registerValidSW;
