import patchDom from './base/patchDom.js'

const updateBlocks = new Set()
setInterval(() => {
    updateBlocks.forEach((block) => {
        try {
            block.updatePartly()
        } catch (err) {
            console.error('Не удалось обновить компонент', block, err)
            try {
                block.updateForce()
            } catch {

            }
        }
    })
    updateBlocks.clear()
}, 10)

class Component {
    constructor () {
        const getter = (attrs, key) => attrs[key]

        const update = (attrs, key, value) => {
            if (value instanceof Object && !(value instanceof Date)) {
                value = new Proxy(value, {
                    set: update,
                    get: getter
                })
            }
            attrs[key] = value
            this.update()
            return true
        }
        this.attributes = new Proxy({}, {
            set: update,
            get: getter
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
        const newDom = this.render()
        this.dom = patchDom(this.dom, newDom)
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
