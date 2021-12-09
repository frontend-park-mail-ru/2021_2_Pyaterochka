import Component from 'irbis/component';
import './style.scss';

/**
 * Компонент иконки
 */
class IconComponent extends Component<{
    title?: string,
    url?: string,
    size?: number,
    color?: string,
    colorHover?: string,
    onClick?: () => unknown
}> {
    defaultProps () {
        return {
            title: '',
            url: '',
            size: 24,
            color: 'var(--color-text-light)',
            colorHover: 'var(--color-text)',
            onClick: () => {
            }
        };
    }

    render () {
        return (
            <div
                title={this.props.title}
                className="icon-container"
                onClick={
                    () => {
                        this.props.onClick();
                    }
                }
            >
                <div
                    className="icon-container__icon"
                    style={`
                    --icon-color: ${this.props.color};
                    --icon-color-hover: ${this.props.colorHover};
                    --icon: url(${this.props.url});
                    --size: ${this.props.size}px;
                    `}
                />
            </div>
        );
    }
}

export default IconComponent;
