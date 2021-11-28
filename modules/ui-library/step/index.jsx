import Component from 'irbis/component';
import './style.scss';

/**
 * Компонент шага
 */
class Step extends Component {
    constructor ({ number = 0, image = '', name = '', description = '' }) {
        super();
        this.attributes.number = number;
        this.attributes.image = image;
        this.attributes.name = name;
        this.attributes.description = description;
    }

    render () {
        const isLeftText = this.attributes.number % 2;
        return (
            <div className={['step', isLeftText ? 'step_left-text' : '']}>
                <img
                    alt=""
                    src={this.attributes.image}
                />

                <div className="step-content">
                    <div className="step-content__number">
                        ШАГ
                        {' '}

                        {this.attributes.number}
                    </div>

                    <div className="step-content__name">
                        {this.attributes.name}
                    </div>

                    <div className="step-content__description">
                        <span>
                            {this.attributes.description}
                        </span>
                    </div>
                </div>

            </div>
        );
    }
}
export default Step;
