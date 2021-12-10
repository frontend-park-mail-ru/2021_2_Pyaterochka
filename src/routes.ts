import Route from 'irbis-router/route';

import ErrorPage from './views/errorpage';
import IndexView from './views/index-view';

export default [
    new Route({
        url: '/',
        component: async () => { return { default: IndexView }; },
        title: 'Главная страница',
        name: 'main'
    }),
    new Route({
        url: '/signin',
        component: async () => await import('./views/signin'),
        title: 'Войти',
        name: 'signin'
    }),
    new Route({
        url: '/signup',
        component: async () => await import('./views/signup'),
        title: 'Регистрация',
        name: 'signup'
    }),
    new Route({
        url: '/logout',
        component: async () => await import('./views/logout'),
        title: 'Выход',
        name: 'logout'
    }),
    new Route({
        url: '/components',
        component: async () => await import('./views/component-gallery'),
        title: 'Галерея компонентов',
        name: 'component-gallery'
    }),
    new Route({
        url: '/feed',
        component: async () => await import('./views/feed'),
        title: 'Лента',
        name: 'feed'
    }),
    new Route({
        url: '/payment/*',
        component: async () => await import('./views/payment-page'),
        title: 'Страница оформления подписки',
        name: 'payment'
    }),
    new Route({
        url: '/creator/*',
        component: async () => await import('./views/creator'),
        title: 'Страница автора',
        name: 'creator'
    }),
    new Route({
        url: '/profile',
        component: async () => await import('./views/profile'),
        title: 'Профиль',
        name: 'profile'
    }), new Route({
        url: '/search',
        component: async () => await import('./views/creators-search'),
        title: 'Поиск авторов',
        name: 'creators.search'
    }),
    new Route({
        url: '/profile/edit/*',
        component: async () => await import('./views/profile/edit'),
        title: 'Настройки',
        name: 'profile.edit'
    }),
    new Route({
        url: '/creator-panel',
        component: async () => await import('./views/creator-panel'),
        title: 'Панель автора',
        name: 'creator.panel'
    }),
    new Route({
        url: '/profile/creator/level/create',
        component: async () => await import('./views/profile/edit/addLevel'),
        title: 'Создание уровня',
        name: 'creator.level.create'
    }),
    new Route({
        url: '/profile/creator/level/edit/*',
        component: async () => await import('./views/profile/edit/addLevel'),
        title: 'Редактирование уровня',
        name: 'creator.level.edit'
    }),
    new Route({
        url: '/post/create',
        component: async () => await import('./views/post/create'),
        title: 'Создание поста',
        name: 'post.create'
    }),
    new Route({
        url: '/edit/post/*',
        component: async () => await import('./views/post/edit'),
        title: 'Редактирование поста',
        name: 'post.edit'
    }),

    new Route({
        url: '/post/*',
        component: async () => await import('./views/post/view'),
        title: 'Просмотр поста',
        name: 'post.view'
    }),
    new Route({
        url: '',
        component: async () => { return { default: ErrorPage }; },
        title: 'Страница не найдена'
    })
];
