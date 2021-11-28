import Component from 'irbis/component';
import SwitchContainer from 'ui-library/switch-container';
import consts from '../../../consts';
import user from '../../../storage/user';

class ProfileEditNotification extends Component {
    render () {
        if (!user.user) return <div />;
        return (<div>

            <div
                className="profile-edit--little-width"
                style="max-width:400px"
            >
                <p className="profile-edit__subtitle">
                    {consts.emailNotifications}
                </p>

                <SwitchContainer title="Новый подписчик или донат" />

                <SwitchContainer title="Новости сервиса" />

                <SwitchContainer title="Новый комментарий" />

            </div>

            <p className="profile-edit__subtitle">
                <b>
                    {' '}

                    {consts.pageInDevelopment}
                </b>
            </p>
        </div>);
    }
}

export default ProfileEditNotification;
