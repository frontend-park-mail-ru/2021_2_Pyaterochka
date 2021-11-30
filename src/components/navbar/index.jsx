import app from 'irbis';
import Component from 'irbis/component';
import user from '../../storage/user';
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
                <a
                    className="navbar__brand"
                    href="#"
                    router-go={app.$router ? app.$router.createUrl('main') : ''}
                >
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
                                    <a router-go={app.$router.createUrl('profile')}>
                                        Профиль
                                    </a>

                                    {
                                        user.user.haveCreator
                                            ? <a router-go={app.$router.createUrl('creator.panel')}>
                                                Панель автора
                                            </a>
                                            : null
                                    }

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
                                <a
                                    className="navbar__link"
                                    router-go={app.$router.createUrl('signup')}
                                >
                                    Регистрация
                                </a>

                                <a
                                    className="navbar__link"
                                    router-go={app.$router.createUrl('signin')}
                                >
                                    Войти
                                </a>
                            </div>
                        )}
            </div>
        );
    }
}
export default Navbar;
