import Component from './basecomponent.js';

/**
 * Компонент шага
 */
class Step extends Component {
    constructor ({ number = 0, name = '', description = '' }) {
        super();
        this.attributes.number = number;
        this.attributes.name = name;
        this.attributes.description = description;
    }

    render () {
        return (
            <div className="step">
                {this.attributes.number % 2 === 0
                    ? (
                        <>
                            <div className="step-content">
                                <div className="step-content__number">
                                    ШАГ {this.attributes.number}
                                </div>
                                <div className="step-content__name">{this.attributes.name}</div>
                                <div className="step-content__description">
                                    <span>{this.attributes.description}</span>
                                </div>
                            </div>
                            <img
                                src={`../../imgs/steps/step${this.attributes.number}.png`}
                                alt=""
                            />
                        </>
                    )
                    : (
                        <>
                            <img
                                src={`../../imgs/steps/step${this.attributes.number}.png`}
                                alt=""
                            />
                            <div className="step-content">
                                <div className="step-content__number">
                                    ШАГ {this.attributes.number}
                                </div>
                                <div className="step-content__name">{this.attributes.name}</div>
                                <div className="step-content__description">
                                    <span>{this.attributes.description}</span>
                                </div>
                            </div>
                        </>
                    )}
            </div>
        );
    }
}
export default Step;

const styles = `
.step {
    display: flex;
    justify-content: space-between;
    margin-bottom: 110px;
}

.step-content {
    display: inline-block;
    max-width: 786px;
}

.step-content__number {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: var(--color-step-text);
}

.step-content__name {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 42px;
}

.step-content__description {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 28px;
    color: var(--color-step-text);
}

.step-content__description_link {
    text-decoration: none;
    color: var(--color-primary);
}

.step-content__description_link:hover {
    color: var(--color-primary-light);
}

.step-content__description_link:active {
    color: var(--color-primary-dark);
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
