import Component from '../components/basecomponent.js'
import Navbar from '../components/navbar.js'
import user from '../storage/user.js'

class Layout extends Component {
    constructor(slot = null) {
        super()
        this.slot = slot
    }

    render() {
        const element = document.createElement('div')
        const navbar = new Navbar(
            {
                user: user.user
            }
        )
        element.innerHTML = ''
        element.appendChild(navbar.render())
        if (this.slot) {
            element.appendChild(this.slot.render())
        }
        return element
    }
}

export default Layout
