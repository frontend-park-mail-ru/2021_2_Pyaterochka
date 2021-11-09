import Component from '../basecomponent';
import Spinner from '../spinner';
import './style.scss';

/**
 * Компонент кнопки
 */
class Button extends Component {
    constructor ({
        text = '',
        color = 'default',
        rounded = false,
        loading = false
    }) {
        super();
        this.attributes.text = text;
        this.attributes.color = color;
        this.attributes.rounded = rounded;
        this.attributes.loading = loading;
        this.attributes.onclick = arguments[0].onclick || arguments[0].onClick || (() => {});
    }

    render () {
        const classList = `btn btn_${this.attributes.color} ${this.attributes.rounded ? 'btn_rounded' : ''}`;
        return (
            <button
                className={classList}
                onClick={(e) => {
                    this.attributes.onclick(e);
                }}
            >
                {this.attributes.loading
                    ? <Spinner/>
                    : this.attributes.text}

            </button>
        );
    }
}

export default Button;
