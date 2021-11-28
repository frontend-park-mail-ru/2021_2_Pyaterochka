import Component from 'irbis/component';
import TabsContainer from 'ui-library/tabs-container';
import consts from '../../../consts';
import app from 'irbis';
import ProfileEditCommon from './Common';
import ProfileEditCreator from './Creator';
import ProfileEditNotification from './Notification';
import ProfileEditSecure from './Secure';

import './style.scss';

class ProfileEditView extends Component {
    render () {
        return (<div className="profile-edit">
            <h1 className="profile-edit__title">
                {consts.settings}
            </h1>

            <TabsContainer
                activeTab={this.data || 'common'}
                onChange={
                    (tab) => {
                        app.$router.go(
                            app.$router.createUrl('profile.edit', tab.key), false
                        );
                    }
                }
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
            />
        </div>);
    }
}

export default ProfileEditView;
