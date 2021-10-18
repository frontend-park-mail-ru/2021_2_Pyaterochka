import user from '../../storage/user';
import Component from '../basecomponent';
import './style.css';

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
                <a href="#" className="navbar-brand" router-go="/main">
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
                                <a router-go="/">Профиль</a>
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
                            <a router-go="/signup" className="navbar-link">
                                Регистрация
                            </a>
                            <a router-go="/signin" className="navbar-link">
                                Войти
                            </a>
                        </div>
                    )}
            </div>
        );
    }
}
export default Navbar;
