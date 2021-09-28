import Component from './basecomponent.js';

/**
 * Компонент карточки создателя
 */
class CreatorCard extends Component {
    constructor ({
        id = null,
        name = '',
        avatar = '',
        description = '',
        shadow = false,
        clickable = true
    }) {
        super();
        this.attributes.id = id;
        this.attributes.name = name;
        this.attributes.avatar = avatar;
        this.attributes.description = description;
        this.attributes.shadow = shadow;
        this.attributes.clickable = clickable;
    }

    render () {
        const style = `background-image: url(${this.attributes.avatar})`;

        return (
            <div
                className={[
                    'creator-card',
                    this.attributes.clickable ? 'clickable' : ''
                ]}
                router-go={this.attributes.clickable ? '/creator/' + this.attributes.id : null}
            >
                <div
                    className={[
                        'creator-card__avatar',
                        this.attributes.shadow ? 'shadow' : ''
                    ]}
                    style={style}
                ></div>
                <div className="creator-card__header">{this.attributes.name}</div>
                <div className="creator-card__description">
                    {this.attributes.description}
                </div>
            </div>
        );
    }
}

export default CreatorCard;

const styles = `
.creator-card {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: space-between;
    padding: 20px;
    transition: box-shadow .5s;
}
.creator-card__header {
    font-family: "Montserrat", sans-serif;
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    text-align: center;
}
.creator-card__description {
    font-size: 20px;
    font-weight: 300;
    text-align: center;
}
.creator-card .creator-card__avatar {
    width:200px;
    height:200px;
    border-radius:100%;
    background-color:var(--color-primary);
    background-size: 100%;
    background-position: center;
    z-index: 1;
    transition: background 0.1s ease-in;
} 
.creator-card.clickable:hover {
    cursor: pointer;
    box-shadow: 0 0 5px #0002;
}
.creator-card:hover .creator-card__avatar {
    background-size:120%;
}
`;
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
