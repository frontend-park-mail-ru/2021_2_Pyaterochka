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
        loading = false,
        onclick = () => { }
    }) {
        super();
        this.attributes.text = text;
        this.attributes.color = color;
        this.attributes.rounded = rounded;
        this.attributes.loading = loading;
        this.attributes.onclick = onclick;
    }

    render () {
        const classList = `btn btn-${this.attributes.color} ${this.attributes.rounded ? 'btn-rounded' : ''}`;
        const element = (
            <button className={classList}>
                {this.attributes.loading
                    ? <Spinner/>
                    : this.attributes.text}

            </button>
        );

        element.addEventListener('click', this.attributes.onclick);
        return element;
    }
}

export default Button;
