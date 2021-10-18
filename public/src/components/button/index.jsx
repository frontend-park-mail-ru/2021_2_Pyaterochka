import Component from '../basecomponent';
import Spinner from '../spinner';
import './style.css';

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
        const classList = `btn btn-${this.attributes.color} ${this.attributes.rounded ? 'btn-rounded' : ''}`;
        const element = (
            <button
                className={classList}
                onClick={(e) => { this.attributes.onclick(e); }}
            >
                {this.attributes.loading
                    ? <Spinner />
                    : this.attributes.text}

            </button>
        );

        return element;
    }
}

export default Button;
