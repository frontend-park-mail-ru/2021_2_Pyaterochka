import Component from '../../../components/basecomponent';
import TabsContainer from '../../../components/tabs-container';
import app from '../../../core/app';
import ProfileEditCommon from './Common';
import ProfileEditCreator from './Creator';
import ProfileEditNotification from './Notification';
import ProfileEditSecure from './Secure';

import './style.scss';

class ProfileEditView extends Component {
    render () {
        return <div className="profile-edit">
            <h1 className="profile-edit__title">Настройки</h1>
            <TabsContainer
                activeTab={this.data || 'common'}
                tabs={
                    [
                        {
                            key: 'common',
                            title: 'Основная информация',
                            component: ProfileEditCommon
                        },
                        {
                            key: 'creator_settings',
                            title: 'Аккаунт автора',
                            component: ProfileEditCreator

                        },
                        {
                            key: 'secure',
                            title: 'Безопасность',
                            component: ProfileEditSecure
                        },
                        {
                            key: 'notifications',
                            title: 'Уведомления',
                            component: ProfileEditNotification
                        }

                    ]

                }

                onChange={
                    (tab) => {
                        app.$router.go(
                            app.$router.createUrl('profile.edit', tab.key), false
                        );
                    }
                }
            />
        </div>;
    }
}

export default ProfileEditView;
