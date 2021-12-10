import Router from 'irbis-router';
import LoadingView from './views/loading-view';
import user from './storage/user';
import App from 'irbis';
import ErrorPage from './views/errorpage';
import registerValidSW from './service-worker';
import routes from './routes';

import './styles/index.scss';
import Layout from './components/layout';

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
