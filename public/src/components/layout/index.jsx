import Component from '../basecomponent';
import Navbar from '../navbar';
import user from '../../storage/user';
import Footer from '../footer';

/**
 * Компонент разметки страницы
 */
class Layout extends Component {
    constructor (attr, slot = null) {
        super();
        this.slot = slot;
    }

    render () {
        return (
            <div>
                <div>
                    <Navbar user={user.user} />
                    {this.slot}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Layout;
