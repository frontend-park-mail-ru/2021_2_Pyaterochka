import Component from 'irbis/component';
import IconComponent from 'ui-library/icon';
import './style.scss';

class Bell extends Component<
    {
        notificationNumber: number,
    }> {
    defaultProps () {
        return {
            notificationNumber: 0
        };
    }

    render () {
        return (
            <div className="bell">
                <div className="bell__notification-number">
                    {this.props.notificationNumber}
                </div>

                <IconComponent
                    size={23}
                    url="/imgs/icons/bell.svg"
                    color="var(--color-default)"
                />
            </div>
        );
    }
}

export default Bell;
