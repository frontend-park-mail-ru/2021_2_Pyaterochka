import patchDom from './base/patchDom.js'

const updateBlocks = new Set()
setInterval(() => {
    updateBlocks.forEach((block) => {
        block.updatePartly()
    })
    updateBlocks.clear()
}, 10)

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
        if (force) return this.updateForce()

        updateBlocks.add(this)
    }

    updatePartly () {
        console.log('updating', this)
        const newDom = this.render()
        this.dom = patchDom(this.dom, newDom)
        console.log('updated', this, newDom)
    }

    updateForce () {
        const newDom = this.render()
        this.dom.replaceWith(newDom)
        this.dom = newDom
    }

    set slot (component) {
        this._slot = component
        this.update(true)
    }

    get slot () {
        return this._slot
    }

    renderReactive () {
        this.created()
        this.dom = this.render()
        return this.dom
    }
}

export default Component
