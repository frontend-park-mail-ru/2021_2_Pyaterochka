import Component from '../components/basecomponent.js'
import Button from '../components/button.js'
import InputField from '../components/input-field.js'

class IndexView extends Component {
    render () {
        const element = document.createElement('div')
        element.className = 'container'
        element.innerHTML = `
            <style>
            .container {
                width:1000px;
                max-width:100%;
                margin:auto;
                margin-top:50px;
            }
            </style>
        `

        const components = [
            new InputField({ placeholder: 'Placeholder', validation: [(v) => v === '' ? null : 'Поле не должно быть пустым'] }),
            ...['default', 'primary', 'success', 'grey', 'warning', 'accent'].map((color) => new Button({ text: 'Button ' + color, color: color })),
            ...['default', 'primary', 'success', 'grey', 'warning', 'accent'].map((color) => new Button({ text: 'Button ' + color, color: color, rounded: true }))
        ]

        components.forEach((component) => {
            const p = document.createElement('p')
            p.innerText = component.constructor.name + ' ' + JSON.stringify(component.attributes)
            element.appendChild(p)
            element.appendChild(component.render())
        })
        return element
    }
}

export default IndexView
