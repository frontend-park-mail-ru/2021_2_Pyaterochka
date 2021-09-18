import Component from './basecomponent.js'

class LockMessage extends Component {
    constructor ({
        text = 'Стань патроном, чтобы продолжить наслаждаться работами автора',
        dark = true
    }, slot = null) {
        super()
        this.attributes.text = text
        this.attributes.dark = dark
        this.slot = slot
    }

    render () {
        const element = document.createElement('div')
        element.className = `lock-message ${this.attributes.dark ? 'dark' : ''}`

        element.innerHTML = `
            <div class='icon'></div>
            <span>${this.attributes.text}</span>
        `

        if (this.slot) {
            element.appendChild(this.slot.renderReactive())
        }

        return element
    }
}
export default LockMessage

const styles = `

.lock-message{
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    color:#fff;
}
.lock-message .icon {
    width:80px;
    height: 80px;
    border-radius: 100%;
    margin-bottom: 10px;
    box-shadow: 0px 2px 10px 0px #FFFFFF66;
    background:#fff;
}
.lock-message .icon::after{
    content: '';
    width:56px;
    height:56px;
    display:block;
    background-color: var(--color-primary);
    margin: 12px; 
    mask-image: url(/imgs/icons/lock_outline_28.svg);
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
    -webkit-mask-image: url(/imgs/icons/lock_outline_28.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-size: contain;
}
.lock-message span {
    margin-bottom:10px;
}
.lock-message .btn {
    width:200px;
}
.lock-message.dark .icon{
    box-shadow: 0px 2px 10px 0px #00000066;
}
.lock-message.dark{
    color:#000;
}
`
const styleElement = document.createElement('style')
styleElement.innerHTML = styles
document.body.appendChild(styleElement)
