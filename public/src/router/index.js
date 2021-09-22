class Route {
    constructor (url, component, title = '') {
        this.url = url;
        this.component = component;
        this.title = title;
        this.loadingView = null;
    }
}

class DynamicComponentLoader {
    constructor (url, ...attrs) {
        this.url = url;
        this.attrs = attrs;
        this.component = null;
    }

    async load () {
        if (this.component) return this.component;
        const module = await import(this.url);
        const Component = module.default;
        this.component = new Component(...this.attrs);
        return this.component;
    }
}

class Router {
    constructor (container, routes = []) {
        this.routes = routes;
        this.container = container;
        this.addRouterListeners();
    }

    addRoute (route) {
        this.routes.push(route);
    }

    getRoute (url) {
        const route = this.routes.find((route) => {
            if (route.url === '') return true;
            const res = (new RegExp(route.url, 'gi')).exec(url);
            if (!res) return false;
            return res.join('') === url;
        });
        return route;
    }

    start () {
        let url = location.hash.substr(1);
        if (url === '') url = '/';
        this.go(url);
    }

    go (url = '') {
        history.pushState(url, location.href);
        location.hash = url;

        const route = this.getRoute(url);
        this.renderRoute(route);
    }

    async renderRoute (route) {
        document.title = route.title;
        let view = route.component;

        if (view instanceof DynamicComponentLoader) {
            if (this.loadingView && !view.component) {
                if (this.layout) {
                    this.layout.slot = this.loadingView.renderReactive();
                } else {
                    this.container.innerHTML = '';
                    this.container.appendChild(this.loadingView.renderReactive());
                }
            }
            view = await view.load();
        }
        if (this.layout) {
            this.layout.slot = view.renderReactive();
            return;
        }
        this.container.innerHTML = '';
        this.container.appendChild(view.renderReactive());
    }

    setContainer (container) {
        this.container = container;
    }

    setLayout (layout) {
        this.layout = layout;
        this.container.innerHTML = '';
        this.container.appendChild(layout.renderReactive());
    }

    addRouterListeners () {
        this.container.addEventListener('click', (e) => {
            if (e.target instanceof Element) {
                if (e.target.hasAttribute('router-go')) {
                    e.preventDefault();
                    this.go(e.target.getAttribute('router-go'));
                }
            }
            e.preventDefault();
        });
        // window.addEventListener('popstate', (e) => {
        //     this.renderRoute(this.getRoute(e.state))
        // })
    }

    setLoadingView (component) {
        this.loadingView = component;
    }
}

export default Router;

export { Route, DynamicComponentLoader };
