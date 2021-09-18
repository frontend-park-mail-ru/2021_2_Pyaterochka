import Component from '../components/basecomponent.js'
import Navbar from '../components/navbar.js'
import user from '../storage/user.js'

class Layout extends Component {
    constructor (slot = null) {
        super()
        this.slot = slot
    }

    render () {
        const element = document.createElement('div')
        const navbar = new Navbar(
            {
                user: user.user
            }
        )
        element.innerHTML = ''
        element.appendChild(navbar.renderReactive())
        if (this.slot) {
            element.appendChild(this.slot.renderReactive())
        }
        return element
    }
}

export default Layout
