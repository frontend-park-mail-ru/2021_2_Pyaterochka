import Component from 'irbis/component';
import Footer from '../footer';
import Navbar from '../navbar';
import NotificationPool from 'ui-library/notification-pool';
import user from '../../storage/user';

/**
 * Компонент разметки страницы
 */
class Layout extends Component<Record<string, never>> {
    constructor (attr, slot = null) {
        super();
        this.slot = slot;
    }

    render () {
        return (
            <div className={user.theme}>
                <div>
                    <Navbar
                        user={user.user}
                        key='navbar' />

                    <div>
                        {this.slot}
                    </div>
                </div>

                <Footer key='footer' />

                <NotificationPool key='notification-pool' />
            </div>
        );
    }
}

export default Layout;
