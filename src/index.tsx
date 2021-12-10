import App from 'irbis';
import ErrorPage from './views/errorpage';
import LoadingView from './views/loading-view';
import registerValidSW from './service-worker';
import Router from 'irbis-router';
import routes from './routes';
import user from './storage/user';

import Layout from './components/layout';
import './styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
    user.update();

    App.setup(
        <Router
            layout={Layout}
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
