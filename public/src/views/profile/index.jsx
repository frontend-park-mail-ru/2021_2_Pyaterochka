import api from '../../api/index';
import Component from '../../components/basecomponent';
import Button from '../../components/button';
import CreatorCard from '../../components/creator-card';
import ProfileCard from '../../components/profile-card';
import Skeleton from '../../components/skeleton';
import app from '../../core/app';
import user from '../../storage/user';

import './style.scss';

class ProfileView extends Component {
    constructor () {
        super();
        this.attributes.user = null;
        this.attributes.creators = null;
    }

    render () {
        if (!this.attributes.user) return <></>;
        return (
            <div>
                <div className="profile-block shadow">
                    <ProfileCard
                        username={this.attributes.user.username}
                        avatar={this.attributes.user.avatar}
                        supportCount={
                            this.attributes.creators
                                ? this.attributes.creators.length
                                : '?'
                        }
                    >
                        <Button text="Редактировать профиль" color="primary" onClick={
                            () => {
                                app.$router.go(app.$router.createUrl('profile.edit'));
                            }
                        } />
                    </ProfileCard>
                </div>
                <h1 className="text-center">Подписки:</h1>

                {
                    this.attributes.creators
                        ? <>

                            <div className="creators-container">
                                {this.attributes.creators.map((creator) => {
                                    return (new CreatorCard(creator)).renderReactive();
                                })}
                            </div>
                            {
                                !this.attributes.creators.length
                                    ? <div className="profile-block__no-creators">
                                        <img
                                            src="/imgs/find_creators_message.svg"
                                            router-go={app.$router.createUrl('creators.search')}
                                        />
                                    </div>
                                    : <></>
                            }
                        </>
                        : <div className="creators-container">
                            {[1, 2, 3].map((i) => (
                                <div key={i}>
                                    <Skeleton type="circle" />
                                    <Skeleton type="text" height={45} width={200} />
                                </div>
                            ))}
                        </div>
                }
            </div>
        );
    }

    async created () {
        if (!user.user) return app.$router.go('/signin');

        this.attributes.user = Object.assign(user.user);

        this.attributes.creators = await api.subscriptions();
    }
}

export default ProfileView;
