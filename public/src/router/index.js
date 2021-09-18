class Route {
    constructor (url, component, title = '') {
        this.url = url
        this.component = component
        this.title = title
    }
}

class Router {
    constructor (container, routes = []) {
        this.routes = routes
        this.container = container
        this.addRouterListeners()
    }

    addRoute (route) {
        this.routes.push(route)
    }

    getRoute (url) {
        const route = this.routes.find((route) => {
            if (route.url === '') return true

            const res = (new RegExp(route.url, 'gi')).exec(url)
            if (!res) return false
            return res.join('') === url
        })
        return route
    }

    start () {
        let url = location.hash.substr(1)
        if (url === '') url = '/'
        this.go(url)
    }

    go (url = '') {
        history.pushState(url, location.href)
        location.hash = url

        const route = this.getRoute(url)
        this.renderRoute(route)
    }

    renderRoute (route) {
        document.title = route.title
        if (this.layout) {
            this.layout.slot = route.component
            return
        }
        this.container.innerHTML = ''
        this.container.appendChild(route.component.renderReactive())
    }

    setContainer (container) {
        this.container = container
    }

    setLayout (layout) {
        this.layout = layout
        this.container.innerHTML = ''
        this.container.appendChild(layout.renderReactive())
    }

    addRouterListeners () {
        this.container.addEventListener('click', (e) => {
            if (e.target instanceof Element) {
                if (e.target.hasAttribute('router-go')) {
                    e.preventDefault()
                    this.go(e.target.getAttribute('router-go'))
                }
            }
            e.preventDefault()
        })
        window.addEventListener('popstate', (e) => {
            this.renderRoute(this.getRoute(e.state))
        })
    }
}

export default Router

export { Route }
