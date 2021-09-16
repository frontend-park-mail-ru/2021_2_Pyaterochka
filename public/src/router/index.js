class Route {
    // url;
    // title;
    // component;
    constructor (url, component, title = '') {
        this.url = url
        this.component = component
        this.title = title
    }
}

class Router {
    // routes = []
    // container;
    addRoute (route) {
        this.routes.push(route)
    }

    getCurrentRoute () {
        return this.routes[0]
    }

    go (url) {
        this.container.innerHtml = ''
        history.pushState({}, url)
        const component = this.getCurrentRoute().component.render()
        this.container.appendChild()
    }

    setContainer (container) {
        this.container = container
    }

    addRouterListeners () {
        window.addEventListener('click', (ev) => {

        })

        window.addEventListener('popstate', () => {

        })
    }
}
