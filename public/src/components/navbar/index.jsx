import app from '../../core/app';
import user from '../../storage/user';
import Component from '../basecomponent';
import './style.scss';

/**
 * Компонент шапки
 */
class Navbar extends Component {
    constructor ({ user = null } = {}) {
        super();
        this.attributes.user = user;
        this.attributes.isOpen = false;
    }

    render () {
        return (
            <div className="navbar">
                <a href="#" className="navbar-brand" router-go={app.$router.createUrl('main')}>
                    Patreon
                </a>
                {this.attributes.user
                    ? (
                        <div className="navbar-profile">
                            <img src={this.attributes.user.avatar} />
                            <div className="navbar-profile__name">
                                {this.attributes.user.username}
                            </div>
                            <div className="navbar-popup">
                                <a router-go={app.$router.createUrl('profile')}>Профиль</a>
                                <a
                                    onClick={() => {
                                        user.logout();
                                    }}
                                >
                                    Выйти
                                </a>
                            </div>
                        </div>
                    )
                    : (
                        <div>
                            <a router-go={app.$router.createUrl('signup')} className="navbar-link">
                                Регистрация
                            </a>
                            <a router-go={app.$router.createUrl('signin')} className="navbar-link">
                                Войти
                            </a>
                        </div>
                    )}
            </div>
        );
    }
}
export default Navbar;
