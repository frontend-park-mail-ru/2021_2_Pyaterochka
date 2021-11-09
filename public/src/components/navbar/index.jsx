import app from '../../core/app';
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
                <a href="#" className="navbar__brand" router-go={app.$router ? app.$router.createUrl('main') : ''}>
                    Patreon
                </a>
                {!app.$router
                    ? ''
                    : this.attributes.user
                        ? (
                            <div className="navbar__profile">
                                <img src={this.attributes.user.avatar} />
                                <div className="navbar__profile-name">
                                    {this.attributes.user.username}
                                </div>
                                <div className="navbar__popup">
                                    <a router-go={app.$router.createUrl('profile')}>Профиль</a>
                                    <a
                                        router-go={app.$router.createUrl('logout')}
                                    >
                                        Выйти
                                    </a>
                                </div>
                            </div>
                        )
                        : (
                            <div>
                                <a router-go={app.$router.createUrl('signup')} className="navbar__link">
                                    Регистрация
                                </a>
                                <a router-go={app.$router.createUrl('signin')} className="navbar__link">
                                    Войти
                                </a>
                            </div>
                        )}
            </div>
        );
    }
}
export default Navbar;
