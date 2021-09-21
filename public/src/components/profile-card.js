import Component from './basecomponent.js';

class ProfileCard extends Component {
    constructor ({
        username = '',
        avatar = null,
        supportCount = 0
    } = {}, slot = null) {
        super();
        this.attributes.username = username;
        this.attributes.avatar = avatar;
        this.attributes.supportCount = supportCount;
        this.slot = slot;
    }

    render () {
        const element = document.createElement('div');
        element.className = 'profile-card';
        element.innerHTML = `
            <img src="${this.attributes.avatar}" />
            <div class="profile-card-body">
                <div class="profile-card__username">
                    ${this.attributes.username}
                </div>
                <div class="profile-card__support-count">
                    Поддерживает ${this.attributes.supportCount} авторов
                </div>
            </div>
        `;
        if (this.slot) {
            const dom = this.slot.renderReactive();
            dom.style.marginTop = '20px';
            element.querySelector('.profile-card-body').appendChild(dom);
        }

        return element;
    }
}
export default ProfileCard;

const styles = `
.profile-card {
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items: center;
}
.profile-card img{
    width: 200px;
    height: 200px;
    box-shadow: 0px 4px 4px 0px #00000040;
    border-radius:100%;
}

.profile-card-body {
    padding:10px 30px;
    max-width:400px
}
.profile-card__username {
    font-family: "Montserrat", sans-serif;
    font-size: 46px;
    font-weight: 700;
    line-height: 56px;
    text-align: center;
}

.profile-card__support-count {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 300;
    line-height: 23px;
    text-align: center;
}
`;
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
