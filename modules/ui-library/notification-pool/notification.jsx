import Component from 'irbis/component';
import Button from '../button';
import './notification.scss';

export default class Notification extends Component {
    defaultProps () {
        return {
            message: '',
            action: '',
            onClose: () => { },
            onAction: () => { }
        };
    }

    render () {
        return (<div className="notification">

            <div className="notification__message">
                <div
                    className="notification__close"
                    onClick={() => {
                        this.props.onClose();
                    }}>
                    &times;
                </div>

                {this.props.message}

            </div>

            {
                this.props.action
                    ? <Button
                        text={this.props.action}
                        color="primary"
                        onClick={() => {
                            this.props.onAction();
                        }} />
                    : ''
            }

        </div>);
    }
}
