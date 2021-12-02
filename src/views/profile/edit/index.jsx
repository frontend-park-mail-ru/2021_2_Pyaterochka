import Component from 'irbis/component';
import TabsContainer from 'ui-library/tabs-container';
import consts from '../../../consts';
import app from 'irbis';
import ProfileEditCommon from './Common';
import ProfileEditCreator from './Creator';
import ProfileEditNotification from './Notification';
import ProfileEditSecure from './Secure';
import ErrorPage from '../../errorpage';

import './style.scss';

class ProfileEditView extends Component {
    defaultProps () {
        return {
            route: null
        };
    }

    render () {
        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }

        return (<div className="profile-edit">
            <h1 className="profile-edit__title">
                {consts.settings}
            </h1>

            <TabsContainer
                activeTab={this.props?.route?.data || 'common'}
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
