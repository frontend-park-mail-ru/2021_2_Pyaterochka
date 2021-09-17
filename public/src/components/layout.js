import Component from '../components/basecomponent.js'
import Navbar from '../components/navbar.js'

class Layout extends Component {
    constructor (slot = null) {
        super()
        this.slot = slot
    }

    render () {
        const element = document.createElement('div')
        const navbar = new Navbar(
            {
                user: null
            }
        )
        element.innerHTML = `
            ${navbar.render().outerHTML}
            ${this.slot ? this.slot.render().outerHTML : ''}
        `
        return element
    }
}

export default Layout
