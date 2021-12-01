import Component from 'irbis/component';
import './style.scss';
/**
 * Компонент сообщения с замочком
 */
class LockMessage extends Component {
    constructor ({
        text = 'Стань патроном, чтобы продолжить наслаждаться работами автора',
        dark = true
    }, slot = null) {
        super();
        this.attributes.text = text;
        this.attributes.dark = dark;
        this.slot = slot;
    }

    render () {
        return (<div className={
            ['lock-message', this.attributes.dark ? 'dark' : '']
        }
        >
            <div className='icon' />

            <span>
                {this.attributes.text}
            </span>

            {
                this.slot ? this.slot : ''
            }
        </div>);
    }
}
export default LockMessage;
