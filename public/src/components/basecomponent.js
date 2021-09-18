class Component {
    constructor () {
        this.attributes = new Proxy({}, {
            set: (attrs, key, value) => {
                attrs[key] = value
                this.update()
                return true
            }
        })
        this._slot = null
        this.dom = null
    }

    render () {
    }

    created () {

    }

    update (force = false) {
        if (!this.dom) return
        force = true
        if (force) return this.updateForce()
    }

    updateForce () {
        const newDom = this.render()
        this.dom.replaceWith(newDom)
        this.dom = newDom
    }

    set slot (component) {
        this._slot = component
        this.update()
    }

    get slot () {
        return this._slot
    }

    renderReactive () {
        this.dom = this.render()
        this.created()
        return this.dom
    }
}

export default Component
