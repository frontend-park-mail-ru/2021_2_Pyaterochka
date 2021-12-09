import Component from 'irbis/component';
import Button from '../button';

import './style.scss';

class ConfirmComponent extends Component<{
    title: string,
    description?: string,
    dangerButton?: string,
    positiveButton?: string,
    onDanger?: () => unknown,
    onPositive?: () => unknown
}> {
    defaultProps () {
        return {
            title: '',
            description: '',
            dangerButton: 'Удалить',
            positiveButton: 'Отмена',
            onDanger: () => { },
            onPositive: () => { }
        };
    }

    render () {
        return (<div className="confirm-component">
            <h1 className="confirm-component__title">
                {this.props.title}
            </h1>

            <p>
                {this.props.description}
            </p>

            <div className="confirm-component__button-box">
                <Button
                    color="primary"
                    onClick={() => {
                        this.props.onDanger();
                    }}
                    text={this.props.dangerButton}
                />

                <Button
                    color="success"
                    onClick={() => {
                        this.props.onPositive();
                    }}
                    text={this.props.positiveButton}
                />
            </div>
        </div>);
    }
}

export default ConfirmComponent;
