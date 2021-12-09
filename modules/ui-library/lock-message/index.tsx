import Component from 'irbis/component';
import './style.scss';

/**
 * Компонент сообщения с замочком
 */
class LockMessage extends Component<{
    text?: string,
    dark?: boolean
}> {
    defaultProps () {
        return {
            text: 'Стань патроном, чтобы продолжить наслаждаться работами автора',
            dark: true
        };
    }

    constructor (unused, slot = null) {
        super();
        this.slot = slot;
    }

    render () {
        return (<div className={
            ['lock-message', this.props.dark ? 'dark' : '']
        }
        >
            <div className="icon" />

            <span>
                {this.props.text}
            </span>

            {
                this.slot ? this.slot : ''
            }
        </div>);
    }
}

export default LockMessage;
