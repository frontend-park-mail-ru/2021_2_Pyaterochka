import Component from '../components/basecomponent.js'

class ErrorPage extends Component {
    constructor (err = 404, desc = 'Страница не найдена') {
        super()
        this.attributes.error = err
        this.attributes.message = desc
    }

    render () {
        const element = document.createElement('div')

        element.innerHTML = `
            ${this.attributes.error} - 
            ${this.attributes.message}
        `
        return element
    }
}

export default ErrorPage
