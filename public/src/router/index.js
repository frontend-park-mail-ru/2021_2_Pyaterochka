/**
 * @module Роутер
 */

/**
 * Путь роутера
 */
class Route {
    constructor (url, component, title = '') {
        this.url = url;
        this.component = component;
        this.title = title;
        this.loadingView = null;
    }
}

/**
 * Роутер
 */
class Router {
    constructor (container, routes = []) {
        this.routes = routes;
        this.container = container;
        this.addRouterListeners();
    }

    /**
     * Добавить путь
     * @param {Route} route путь
     */
    addRoute (route) {
        this.routes.push(route);
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
        // this.go(url);
    }

    /**
     * Перейти по адресу
     *
     * @param {string} url адрес
     */
    go (url = '') {
        history.pushState(url, url, url);
        // location.hash = url;

        const route = this.getRoute(url);
        if (route.url.endsWith('*')) {
            route.data = url.replace(route.url.replace('*', ''), '');
        }
        this.renderRoute(route);
        window.scrollTo(0, 0);
    }

    /**
     * Отобразить путь
     * @param {Route} route путь
     */
    async renderRoute (route) {
        document.title = route.title;

        if (this.loadingView) {
            if (this.layout) {
                this.layout.slot = this.loadingView.renderReactive();
            } else {
                this.container.innerHTML = '';
                this.container.appendChild(this.loadingView.renderReactive());
            }
        }
        const Component = (await route.component()).default;
        const view = new Component();

        if (this.layout) {
            if (route.data) { view.data = route.data; }

            this.layout.slot = view.renderReactive();
            return;
        }
        this.container.innerHTML = '';
        this.container.appendChild(view.renderReactive());
    }

    /**
     * Установить контейнер для роутера
     * @param {Element} container контейнер
     */
    setContainer (container) {
        this.container = container;
    }

    /**
     * Установить шаблон для роутера
     * @param {Component} layout шаблон
     */
    setLayout (layout) {
        this.layout = layout;
        this.container.innerHTML = '';
        this.container.appendChild(layout.renderReactive().createElement());
        console.log(layout);
    }

    /**
     * Установка обработчиков
     */
    addRouterListeners () {
        this.container.addEventListener('click', (e) => {
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
        });
        window.addEventListener('popstate', (e) => {
            this.renderRoute(this.getRoute(location.pathname));
        });
    }

    /**
     * Установка компонента загрузки
     *
     * Данный компонент будет отображаться во время динамической
     * загрузки компонентов страниц
     * @param {Component} component компонент загрузки
     */
    setLoadingView (component) {
        this.loadingView = component;
    }
}

export default Router;

export { Route };
