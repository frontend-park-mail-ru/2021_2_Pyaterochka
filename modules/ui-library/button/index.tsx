import Component from 'irbis/component';
import Spinner from '../spinner';
import './style.scss';

/**
 * Компонент кнопки
 */
class Button extends Component<{
    text: string,
    color?: string,
    rounded?: boolean,
    loading?: boolean,
    onClick?: (e?:MouseEvent) => unknown
}
> {
    defaultProps () {
        return {
            text: '',
            color: 'default',
            rounded: false,
            loading: false,
            onClick: () => { }
        };
    }

    render () {
        const classList = `btn btn_${this.props.color} ${this.props.rounded ? 'btn_rounded' : ''}`;
        return (
            <button
                className={classList}
                onClick={(e:MouseEvent) => {
                    this.props.onClick(e);
                }}
            >
                {this.props.loading
                    ? <Spinner />
                    : this.props.text}

            </button>
        );
    }
}

export default Button;
