/**
 * @module Роутер
 */

import Component from '../components/basecomponent';
import app from '../core/app';

class Router extends Component {
    constructor ({ routes = [], loadingView = null }) {
        super();

        this.routes = routes;
        this.loadingView = loadingView;
        if (this.loadingView) {
            this.slot = this.loadingView;
        } else {
            this.slot = <></>;
        }

        this.addRouterListeners();

        app.$router = this;
    }

    render () {
        return this.slot;
    }

    created () {
        this.start();
    }

    /**
     * Найти подходящий путь
     *
     * @param {string} url
     * @returns {Route} путь
     */
    getRoute (url) {
        const route = this.routes.find((route) => {
            if (route.url === '') return true;
            if (route.url.endsWith('*')) {
                return url.startsWith(route.url.replace('*', ''));
            }
            const res = (new RegExp(route.url, 'gi')).exec(url);
            if (!res) return false;
            return res.join('') === url;
        });
        return route;
    }

    /**
     * Запуск роутера
     */
    start () {
        const url = location.pathname;
        const route = this.getRoute(url);
        if (route.url.endsWith('*')) {
            route.data = url.replace(route.url.replace('*', ''), '');
        }
        this.renderRoute(route);
    }

    /**
     * Перейти по адресу
     *
     * @param {string} url адрес
     */
    go (url = '') {
        history.pushState(url, url, url);

        this.start();
    }

    /**
     * Отобразить путь
     * @param {Route} route путь
     */
    async renderRoute (route) {
        document.title = route.title;

        if (this.loadingView) {
            this.view = this.loadingView;
        }
        const Component = (await route.component()).default;
        const view = new Component();

        if (route.data) { view.data = route.data; }
        this.slot = view.renderReactive();
    }

    onClick (e) {
        if (e.target) {
            let url = null;
            let node = e.target;

            while (!url && node) {
                if (node.hasAttribute('router-go')) {
                    url = node.getAttribute('router-go');
                }
                node = node.parentElement;
            }
            if (url) {
                e.preventDefault();
                this.go(url);
            }
        }
        e.preventDefault();
    }

    onPopState () {
        this.renderRoute(this.getRoute(location.pathname));
    }

    /**
     * Установка обработчиков
     */
    addRouterListeners () {
        document.addEventListener('click', (e) => { this.onClick(e); });
        window.addEventListener('popstate', (e) => { this.onPopState(e); });
    }
}

export default Router;
