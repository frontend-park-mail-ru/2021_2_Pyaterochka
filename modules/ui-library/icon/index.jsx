import Component from 'irbis/component';
import './style.scss';

/**
 * Компонент иконки
 */
class IconComponent extends Component {
    defaultProps () {
        return {
            title: '',
            url: '',
            size: 24,
            color: 'var(--color-text-light)',
            colorHover: 'var(--color-text)',
            onClick: () => { }
        };
    }

    render () {
        return (
            <div
                title={this.attributes.title}
                className="icon-container"
                onClick={
                    () => { this.attributes.onClick(); }
                }
            >
                <div
                    className="icon-container__icon"
                    style={`
                    --icon-color: ${this.attributes.color};
                    --icon-color-hover: ${this.attributes.colorHover};
                    --icon: url(${this.attributes.url});
                    --size: ${this.attributes.size}px;
                    `}
                />
            </div>
        );
    }
}

export default IconComponent;
