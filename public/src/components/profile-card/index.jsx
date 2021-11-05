import Component from '../basecomponent';
import './style.scss';

/**
 * Компонент карточки профиля
 */
class ProfileCard extends Component {
    constructor ({
        username = '',
        avatar = null,
        supportCount = 0
    } = {}, ...slot) {
        super();
        this.attributes.username = username;
        this.attributes.avatar = avatar;
        this.attributes.supportCount = supportCount;
        this.slot = slot;
    }

    render () {
        return <div className="profile-card">
            <img src={this.attributes.avatar} />
            <div className="profile-card__body">
                <div className="profile-card__username">
                    {this.attributes.username}
                </div>
                <div className="profile-card__support-count" style={this.slot ? 'margin-bottom:20px' : ''}>
                    Поддерживает {this.attributes.supportCount} авторов
                </div>
                {this.slot ? this.slot : ''}
            </div>
        </div>;
    }
}
export default ProfileCard;
