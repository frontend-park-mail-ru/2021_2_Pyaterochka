import api from '../../api/index';
import Component from '../../components/basecomponent';
import Button from '../../components/button';
import CreatorCard from '../../components/creator-card';
import ProfileCard from '../../components/profile-card';
import app from '../../core/app';
import user from '../../storage/user';

import './style.css';

class ProfileView extends Component {
    constructor () {
        super();
        this.attributes.user = null;
        this.attributes.creators = [];
    }

    render () {
        if (!this.attributes.user) return <></>;
        return (
            <div>
                <div className="profile-block shadow">
                    <ProfileCard
                        username={this.attributes.user.username}
                        avatar={this.attributes.user.avatar}
                        supportCount={this.attributes.creators.length}
                    >
                        <Button text="Редактировать профиль" color="primary" />
                    </ProfileCard>
                </div>
                <h1 className="text-center">Подписки:</h1>
                <div className="creators-container">
                    {this.attributes.creators.map((creator) => {
                        return (new CreatorCard(creator)).renderReactive();
                    })}
                </div>
            </div>
        );
    }

    async created () {
        if (!user.user) return app.$router.go('/signin');

        this.attributes.user = Object.assign(user.user);

        this.attributes.creators = await api.creators();
    }
}

export default ProfileView;
