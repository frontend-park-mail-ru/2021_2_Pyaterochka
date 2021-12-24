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
            <div
                key="layout"
                className={user.theme}
            >
                <div key="layout_top">
                    <Navbar
                        key="layout_top_navbar"
                        user={user.user}
                    />

                    <div
                        key="layout_top_content"
                    >
                        {this.slot}
                    </div>
                </div>

                <Footer key="layout_footer" />

                <NotificationPool key="notification-pool" />
            </div>
        );
    }
}

export default Layout;
