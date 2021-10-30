import app from '../../core/app';
import Component from '../basecomponent';
import './style.scss';

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
        clickable = true,
        noHoverShadow = false
    }) {
        super();
        this.attributes.id = id;
        this.attributes.name = name;
        this.attributes.avatar = avatar;
        this.attributes.description = description;
        this.attributes.shadow = shadow;
        this.attributes.noHoverShadow = noHoverShadow;
        this.attributes.clickable = clickable;
    }

    render () {
        const style = `background-image: url(${this.attributes.avatar})`;

        return (
            <div
                className={[
                    'creator-card',
                    this.attributes.clickable ? 'clickable' : '',
                    this.attributes.noHoverShadow ? 'creator-card--no-hover-shadow' : ''
                ]}
                router-go={this.attributes.clickable ? app.$router.createUrl('creator', this.attributes.id) : null}
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
