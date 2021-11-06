import Component from '../basecomponent';
import Button from '../button';

import './style.scss';

class ConfirmComponent extends Component {
    constructor ({
        title = '',
        description = '',
        dangerButton = 'Удалить',
        positiveButton = 'Отмена',
        onDanger = () => { },
        onPositive = () => { }
    }) {
        super();

        this.attributes.title = title;
        this.attributes.description = description;
        this.attributes.dangerButton = dangerButton;
        this.attributes.positiveButton = positiveButton;
        this.attributes.onDanger = onDanger;
        this.attributes.onPositive = onPositive;
    }

    render () {
        return <div className="confirm-component">
            <h1 className="confirm-component__title">
                {this.attributes.title}
            </h1>

            <p>
                {this.attributes.description}
            </p>
            <div className="confirm-component__button-box">
                <Button color="primary" text={this.attributes.dangerButton} onClick={() => {
                    this.attributes.onDanger();
                }} />
                <Button color="success" text={this.attributes.positiveButton} onClick={() => {
                    this.attributes.onPositive();
                }} />
            </div>
        </div>;
    }
}

export default ConfirmComponent;
