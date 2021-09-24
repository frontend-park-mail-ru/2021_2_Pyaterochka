import Component from './basecomponent.js';
import Navbar from './navbar.jsx';
import user from '../storage/user.js';
import Footer from './footer.jsx';

/**
 * Компонент разметки страницы
 */
class Layout extends Component {
    constructor (slot = null) {
        super();
        this.slot = slot;
    }

    render () {
        return (
            <div>
                <div>
                    <Navbar user={user.user} />
                    {this.slot ? this.slot : ''}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Layout;
