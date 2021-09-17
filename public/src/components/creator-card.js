import Component from './basecomponent.js'

class CreatorCard extends Component {
    constructor ({
        id = null,
        name = "",
        avatar = "",
        description = "",
        shadow = false
    }) {
        super()
        this.attributes.name = name
        this.attributes.avatar = avatar
        this.attributes.description = description
        this.attributes.shadow = shadow
    }

    render () {
        const element = document.createElement('div')
        element.className = `creator-card`

        element.innerHTML = `
            <img class="${this.attributes.shadow ? "shadow": ""}" src="${this.attributes.avatar}"/>
            <div class="creator-card__header">
                ${this.attributes.name}
            </div>
            <div class="creator-card__description">
                ${this.attributes.description}
            </div>
        `
        return element
    }
}

export default CreatorCard

const styles = `
.creator-card {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: space-between;
}
.creator-card__header {
    font-family: "Montserrat", sans-serif;
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    text-align: center;
}
.creator-card__description {
    font-size: 20px;
    font-weight: 300;
    text-align: center;
}
.creator-card img {
    width:200px;
    height:200px;
    border-radius:100%;
    background-color:var(--color-primary)
} 
`
const styleElement = document.createElement('style')
styleElement.innerHTML = styles
document.body.appendChild(styleElement)
