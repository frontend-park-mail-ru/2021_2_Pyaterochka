import Component from './basecomponent.js'

class Step extends Component {
    constructor ({
        number = '',
        name = '',
        description = ''
    }) {
        super()
        this.attributes.number = number
        this.attributes.name = name
        this.attributes.description = description
    }

    render () {
        const element = document.createElement('div')
        element.innerHTML = `
        <div class="step">
        
        ${this.attributes.number % 2 === 0
        ? `
            
            <div class="step-content">
                <div class="step-content__number">ШАГ ${this.attributes.number}</div>
                <div class="step-content__name">
                    ${this.attributes.name}
                </div>
                <div class="step-content__description">
                    <span>${this.attributes.description}</span></div>
            </div>
            <div class="image">
                <img src="../../imgs/steps/step${this.attributes.number}.png" alt="">
            </div>
            `
        : `
            <div class="image">
                <img src="../../imgs/steps/step${this.attributes.number}.png" alt="">
            </div>
            <div class="step-content">
                <div class="step-content__number">ШАГ ${this.attributes.number}</div>
                <div class="step-content__name">
                    ${this.attributes.name}
                </div>
                <div class="step-content__description">
                    <span>${this.attributes.description}</span></div>
            </div>
            `
}
        </div>
        `
        return element
    }
}
export default Step

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
`

const styleElement = document.createElement('style')
styleElement.innerHTML = styles
document.body.appendChild(styleElement)
