import app from 'irbis';
import Component from 'irbis/component';
import Notification from './notification';
import './style.scss';

type NotificationProps = {
    message: string,
    action: string,
    onOpen: () => unknown,
};
type NotificationType = {
    id: string,
    props?: NotificationProps,
    message?: string,
    closed?: boolean,
    added?: boolean,
};
export default class NotificationPool extends Component<never, {
    notifications: NotificationType[];
}> {
    constructor () {
        super();
        app.$notification = this;

        this.state.notifications = [];
    }

    removeNotification (id: string) {
        this.state.notifications
            .filter((n) => n.id === id)
            .forEach((n) => {
                n.closed = true;
            });
        this.update();

        setTimeout(() => {
            this.state.notifications = this.state.notifications
                .filter((n) => n.id !== id);
        }, 1000);
    }

    push (message:string, timeout = -1, props?: NotificationProps) {
        const id = Date.now() + ';' + Math.random();
        this.state.notifications.push({
            id,
            message,
            props,
            added: true
        });
        this.update();
        setTimeout(() => {
            this.state.notifications = this.state.notifications.map(n => {
                n.added = false;
                return n;
            });
        }, 20);
        if (timeout > 0) {
            setTimeout(() => {
                this.removeNotification(id);
            }, timeout);
        }
    }

    render () {
        return (<div className="notification-pool">
            {this.state.notifications.map((notification) => {
                return (<div
                    key={notification.id}
                    className={[
                        notification.added || notification.closed ? 'added' : ''
                    ]}>
                    {notification.props
                        ? <Notification
                            message={notification.props.message}
                            action={notification.props.action}
                            onClose={
                                () => {
                                    this.removeNotification(notification.id);
                                }
                            }
                            onAction={
                                () => {
                                    this.removeNotification(notification.id);
                                    if (notification.props.onOpen) {
                                        notification.props.onOpen();
                                    }
                                }
                            }
                        />
                        : <div>
                            {notification.message}
                        </div>}
                </div>);
            })}
        </div>);
    }
}
