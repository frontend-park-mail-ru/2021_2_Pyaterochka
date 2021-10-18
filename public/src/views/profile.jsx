import api from '../api/index';
import Component from '../components/basecomponent';
import Button from '../components/button';
import CreatorCard from '../components/creator-card';
import ProfileCard from '../components/profile-card';
import { router } from '../index';
import user from '../storage/user';

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
        if (!user.user) return router.go('/signin');

        this.attributes.user = Object.assign(user.user);

        this.attributes.creators = await api.creators();
    }
}

export default ProfileView;

const styles = `
.creators-container {
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
}

.creators-container > * {
    margin:20px;
    max-width:325px;
}

.profile-block {
    padding:20px;
    margin-bottom: 50px;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
