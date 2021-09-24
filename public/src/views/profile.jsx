import Component from '../components/basecomponent.js';
import Button from '../components/button.jsx';
import CreatorCard from '../components/creator-card.jsx';
import ProfileCard from '../components/profile-card.jsx';
import { router } from '../index.js';
import user from '../storage/user.js';

class ProfileView extends Component {
    constructor () {
        super();
        this.attributes.user = {};
        this.attributes.creators = [
            {
                name: 'IU7-memes',
                description: 'создает мемы из закулисий цирка',
                avatar:
          'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
            },
            {
                name: 'МГТУ',
                description: 'выпускает инженеров без мозгов',
                avatar:
          'https://sun1-17.userapi.com/s/v1/ig2/X7179Lm-iwEnlM913tharnvCw19---S9eyuFwy-3ECPsTzLQ77zP4BgfWIbr2P8uZbBXt2HauM5CQyCKsdW8pMQo.jpg?size=100x100&quality=95&crop=0,0,1000,1000&ava=1'
            },

            {
                name: 'Че пловец, да? Красавчик!',
                description: 'обучает всех желающих пловцов',
                avatar:
          'https://sun1-57.userapi.com/s/v1/ig2/uQqLid-BfLA-VAqWh94Szq4QnEiEAIo0FDyDcgQ5Xzv781soP12s9xOoUisEVJGKMT5QJ5BljosYahyZy_6J5O36.jpg?size=100x100&quality=95&crop=74,11,389,389&ava=1'
            }
        ];
        this.attributes.creators.forEach((c) => this.attributes.creators.push(c));
    }

    render () {
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
    }
}

export default ProfileView;

const styles = `
.creators-container{
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
