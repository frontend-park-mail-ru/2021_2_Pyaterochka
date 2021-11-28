import Component from 'irbis/component';
import Button from '../button';

import './style.scss';

class ConfirmComponent extends Component {
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
                {this.attributes.title}
            </h1>

            <p>
                {this.attributes.description}
            </p>

            <div className="confirm-component__button-box">
                <Button
                    color="primary"
                    onClick={() => {
                        this.attributes.onDanger();
                    }}
                    text={this.attributes.dangerButton}
                />

                <Button
                    color="success"
                    onClick={() => {
                        this.attributes.onPositive();
                    }}
                    text={this.attributes.positiveButton}
                />
            </div>
        </div>);
    }
}

export default ConfirmComponent;
