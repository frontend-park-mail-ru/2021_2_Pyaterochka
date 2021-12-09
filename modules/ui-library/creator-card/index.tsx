import app from 'irbis';
import Component from 'irbis/component';
import './style.scss';

/**
 * Компонент карточки создателя
 */
class CreatorCard extends Component<
    {
        id?: string,
        name: string,
        avatar: string,
        description: string,
        shadow?: boolean,
        clickable?: boolean,
        noHoverShadow?: boolean
    }> {
    defaultProps () {
        return {
            id: null,
            name: '',
            avatar: '',
            description: '',
            shadow: false,
            clickable: true,
            noHoverShadow: false
        };
    }

    render () {
        const style = `background-image: url('${this.props.avatar}')`;

        return (
            <div
                className={[
                    'creator-card',
                    this.props.clickable ? 'clickable' : '',
                    this.props.noHoverShadow ? 'creator-card--no-hover-shadow' : ''
                ]}
                router-go={this.props.clickable ? app.$router.createUrl('creator', this.props.id) : null}
            >
                <div
                    className={[
                        'creator-card__avatar',
                        this.props.shadow ? 'shadow' : ''
                    ]}
                >
                    <div
                        className="creator-card__avatar__image"
                        style={style}
                    />
                </div>

                <div className="creator-card__header">
                    {this.props.name}
                </div>

                <div className="creator-card__description">
                    {this.props.description}
                </div>
            </div>
        );
    }
}

export default CreatorCard;
