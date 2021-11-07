import Router from './router';
import Route from './router/route';
import LoadingView from './views/loading-view';
import user from './storage/user';
import App from './core/app';
import ErrorPage from './views/errorpage';
import registerValidSW from './modules/service-worker';
import MainPageView from './views/main-page';

import '../styles/index.scss';
import Layout from './components/layout';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await user.update();
    } catch {

    }

    if (!navigator.onLine) {
        App.setup(
            <Layout>
                <ErrorPage
                    err="-1"
                    desc="Нет соединения с интернетом"
                    goHome={false}
                />
            </Layout>
            , document.getElementById('root'));

        window.addEventListener('online', () => {
            setupApp();
            console.log('Internet');
        }, {
            once: true
        });
    } else {
        setupApp();
    }

    registerValidSW('/sw.js');

    console.log(App);
});

function setupApp () {
    App.setup(
        <Router routes={[
            new Route({
                url: '/',
                component: async () => { return { default: MainPageView }; },
                title: 'Главная страница',
                name: 'main'
            }),
            new Route({
                url: '/signin',
                component: async () => await import('views/signin'),
                title: 'Войти',
                name: 'signin'
            }),
            new Route({
                url: '/signup',
                component: async () => await import('views/signup'),
                title: 'Регистрация',
                name: 'signup'
            }),
            new Route({
                url: '/logout',
                component: async () => await import('views/logout'),
                title: 'Выход',
                name: 'logout'
            }),
            new Route({
                url: '/components',
                component: async () => await import('views/component-gallery'),
                title: 'Галерея компонентов',
                name: 'component-gallery'
            }),
            new Route({
                url: '/payment/*',
                component: async () => await import('views/payment-page'),
                title: 'Страница оформления подписки',
                name: 'payment'
            }),
            new Route({
                url: '/creator/*',
                component: async () => await import('views/creator'),
                title: 'Страница автора',
                name: 'creator'
            }),
            new Route({
                url: '/loading-view',
                component: async () => { return { default: LoadingView }; }
            }),
            new Route({
                url: '/profile',
                component: async () => await import('views/profile'),
                title: 'Профиль',
                name: 'profile'
            }), new Route({
                url: '/search',
                component: async () => await import('views/creators-search'),
                title: 'Поиск авторов',
                name: 'creators.search'
            }),
            new Route({
                url: '/profile/edit/*',
                component: async () => await import('views/profile/edit'),
                title: 'Настройки',
                name: 'profile.edit'
            }),
            new Route({
                url: '/creator-panel',
                component: async () => await import('views/creator-panel'),
                title: 'Панель автора',
                name: 'creator.panel'
            }),
            new Route({
                url: '/profile/creator/level/create',
                component: async () => await import('views/profile/edit/addLevel'),
                title: 'Создание уровня',
                name: 'creator.level.create'
            }),
            new Route({
                url: '/profile/creator/level/edit/*',
                component: async () => await import('views/profile/edit/addLevel'),
                title: 'Редактирование уровня',
                name: 'creator.level.edit'
            }),
            new Route({
                url: '/post/create',
                component: async () => await import('views/post/create'),
                title: 'Создание поста',
                name: 'post.create'
            }),
            new Route({
                url: '/edit/post/*',
                component: async () => await import('views/post/edit'),
                title: 'Редактирование поста',
                name: 'post.edit'
            }),

            new Route({
                url: '/post/*',
                component: async () => await import('views/post/view'),
                title: 'Просмотр поста',
                name: 'post.view'
            }),
            new Route({
                url: '/core/pathChildren',
                component: async () => await import('components/random-anim')
            }),
            new Route({
                url: '',
                component: async () => { return { default: ErrorPage }; },
                title: 'Страница не найдена'
            })
        ]} loadingView={
            <LoadingView />
        } />
        , document.getElementById('root'));
}
