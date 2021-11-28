import Router from './router';
import LoadingView from './views/loading-view';
import user from './storage/user';
import App from './core/app';
import ErrorPage from './views/errorpage';
import registerValidSW from './modules/service-worker';
import routes from './routes';

import './styles/index.scss';

document.addEventListener('DOMContentLoaded', async () => {
    user.update();

    App.setup(
        <Router
            errorView={
                <ErrorPage desc="Не удалось загрузить страницу" />
            }
            loadingView={
                <LoadingView />
            }
            offlineView={
                <ErrorPage desc="Нет соединения с интернетом" />
            }
            routes={routes}
        />,
        document.getElementById('root'));

    console.log(App);

    registerValidSW('/sw.js');
});
