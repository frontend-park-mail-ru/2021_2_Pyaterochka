import app from 'irbis';
import Bell from 'ui-library/bell';
import Component from 'irbis/component';
import NotificationPool from 'ui-library/notification-pool';
import user from '../../storage/user';
import './style.scss';

/**
 * Компонент шапки
 */
class Navbar extends Component<{
    user?: {
        avatar: string,
        username: string
    }
}> {
    defaultProps () {
        return {
            user: null
        };
    }

    render () {
        return (
            <div className="navbar">
                <div className="navbar__content">
                    <a
                        className="navbar__brand"
                        href="#"
                        router-go={app.$router ? app.$router.createUrl('main') : ''}
                    >
                        Patreon
                    </a>

                    <div className="navbar__user">
                        <div className="navbar__bell">
                            <Bell notificationNumber={0} />

                            <div className="navbar__bell_popup">
                                <NotificationPool key='notification-pool' />
                            </div>
                        </div>

                        {!app.$router
                            ? ''
                            : this.props.user
                                ? (
                                    <div className="navbar__profile">
                                        <img src={this.props.user.avatar} />

                                        <div className="navbar__profile-name">
                                            {this.props.user.username}
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

                </div>

            </div>
        );
    }
}

export default Navbar;
