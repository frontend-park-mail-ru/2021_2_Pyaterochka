/**
 * @module Роутер
 */

import Component from 'irbis/component';
import app from 'irbis';
import VDomComponent from 'irbis/vdom/vdom-component';
import Route from './route';
import VDomNode from 'irbis/vdom/vdom-node';

class Router extends Component {
    defaultProps () {
        return {
            routes: [],
            loadingView: null,
            errorView: null,
            offlineView: null,
            layout: null
        };
    }

    propsChanged () {
        this.slot = [new VDomComponent(this.props.layout, {}, [
            this.props.loadingView || ''
        ])];

        this.start();
    }

    constructor () {
        super();

        this.addRouterListeners();

        app.$router = this;
    }

    render () {
        if (Array.isArray(this.slot)) {
            return this.slot[0];
        }
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
    getRoute (url: string): Route {
        const route = this.props.routes.find((route: Route) => {
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
            window.scrollTo(0, 0);
            this.start();
        }
    }

    /**
     * Отобразить путь
     * @param {Route} route путь
     */
    async renderRoute (route: Route) {
        document.title = route.title;

        let slot: VDomNode;
        if (Array.isArray(this.slot)) {
            slot = this.slot[0];
        } else {
            slot = this.slot;
        }
        if (!(slot instanceof VDomComponent) || !slot._component) return;

        if (this.props.loadingView) {
            slot._component.slot = this.props.loadingView;
        }
        try {
            const Component = (await route.component()).default;
            slot._component.slot = new VDomComponent(Component, { route }, []);
        } catch (e) {
            console.error("Can't load page", e);
            if (navigator.onLine) {
                slot._component.slot = this.props.errorView;
            } else {
                slot._component.slot = this.props.offlineView;
            }
        }
    }

    onClick (e: MouseEvent) {
        if (e.target) {
            let url = null;
            let node = e.target;

            while (!url && node && node instanceof Element) {
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
    }

    onPopState () {
        this.start();
    }

    /**
     * Установка обработчиков
     */
    addRouterListeners () {
        document.addEventListener('click', (e: MouseEvent) => { this.onClick(e); });
        window.addEventListener('popstate', () => { this.onPopState(); });
    }

    createUrl (name: string, param: string = null) {
        const route = this.props.routes.find((r) => {
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
