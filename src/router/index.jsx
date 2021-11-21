/**
 * @module Роутер
 */

import Component from '../components/basecomponent';
import Layout from '../components/layout';
import app from '../core/app';

class Router extends Component {
    constructor ({ routes = [], loadingView = null, errorView = null, offlineView = null }) {
        super();

        this.routes = routes;
        this.loadingView = loadingView;
        this.errorView = errorView;
        this.offlineView = offlineView;

        if (this.loadingView) {
            this.slot = this.loadingView;
        } else {
            this.slot = null;
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
    go (url = '', rerender = true) {
        history.pushState(url, url, url);

        if (rerender) {
            this.start();
        }
    }

    /**
     * Отобразить путь
     * @param {Route} route путь
     */
    async renderRoute (route) {
        document.title = route.title;

        if (this.loadingView) {
            this.slot = (<Layout>
                {this.loadingView}
            </Layout>);
        }
        try {
            const Component = (await route.component()).default;
            const view = new Component();

            if (route.data) {
                view.data = route.data;
            }
            this.slot = (<Layout>
                {view.renderReactive()}
            </Layout>);
        } catch (e) {
            console.error("Can't load page", e);
            if (navigator.onLine) {
                this.slot = (<Layout>
                    {this.errorView}
                </Layout>);
            } else {
                this.slot = (<Layout>
                    {this.offlineView}
                </Layout>);
            }
        }
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
    // e.preventDefault();
    }

    onPopState () {
        this.start();
    }

    /**
     * Установка обработчиков
     */
    addRouterListeners () {
        document.addEventListener('click', (e) => { this.onClick(e); });
        window.addEventListener('popstate', (e) => { this.onPopState(e); });
    }

    createUrl (name, param = null) {
        const route = this.routes.find((r) => {
            if (!r) return false;
            return r.name === name;
        });

        if (!route) {
            console.error('Route ' + name + ' not found');
            return;
        }

        return route.url.replace('*', param || '');
    }
}

export default Router;
