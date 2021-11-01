import Component from '../../../components/basecomponent';
import SwitchContainer from '../../../components/switch-container';
import user from '../../../storage/user';

class ProfileEditNotification extends Component {
    render () {
        if (!user.user) return <div></div>;
        return <div>

            <div className="profile-edit--little-width" style="max-width:400px">
                <p className="profile-edit__subtitle">
                    E-mail уведомления
                </p>
                <SwitchContainer title="Новый подписчик или донат" />
                <SwitchContainer title="Новости сервиса" />
                <SwitchContainer title="Новый комментарий" />

            </div>
            <p className="profile-edit__subtitle">
                <b> Данная страница в разработке</b>
            </p>
        </div>;
    }
}

export default ProfileEditNotification;
