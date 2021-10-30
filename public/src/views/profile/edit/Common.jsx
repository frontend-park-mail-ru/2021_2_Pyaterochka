import AvatarUploader from '../../../components/avatar-uploader';
import Component from '../../../components/basecomponent';
import InputField from '../../../components/input-field';
import user from '../../../storage/user';

class ProfileEditCommon extends Component {
    render () {
        if (!user.user) return <div></div>;
        return <div>
            <p className="profile-edit__subtitle">
                Оформление профиля
            </p>
            <AvatarUploader avatar={user.user.avatar}/>
            <br />
            <div className="profile-edit--little-width">
                <p className="profile-edit__subtitle">
                    Никнейм
                </p>
                <InputField placeholder="Текущее имя пользователя" value={user.user.username} disabled/>
            </div>

        </div>;
    }
}

export default ProfileEditCommon;
