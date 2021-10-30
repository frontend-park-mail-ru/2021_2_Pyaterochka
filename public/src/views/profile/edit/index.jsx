import Component from '../../../components/basecomponent';
import Spinner from '../../../components/spinner';
import TabsContainer from '../../../components/tabs-container';
import ProfileEditCommon from './Common';
import ProfileEditNotification from './Notification';
import ProfileEditSecure from './Secure';

import './style.css';

class ProfileEditView extends Component {
    render () {
        return <div className="profile-edit">
            <h1 className="profile-edit__title">Настройки</h1>
            <TabsContainer

                activeTab="common"
                tabs={
                    [
                        {
                            key: 'common',
                            title: 'Основная информация',
                            component: <ProfileEditCommon />
                        },
                        {
                            key: 'secure',
                            title: 'Безопасность',
                            component: <ProfileEditSecure/>
                        },
                        {
                            key: 'notifications',
                            title: 'Уведомления',
                            component: <ProfileEditNotification/>
                        },
                        {
                            key: 'creator_settings',
                            title: 'Аккаунт креатора',
                            component: <>
                                Тут будут уровни подписки
                            </>
                        }

                    ]
                }
                noActive={
                    <Spinner />
                }
            />
        </div>;
    }
}

export default ProfileEditView;
