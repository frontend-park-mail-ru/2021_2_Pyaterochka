import Component from '../components/basecomponent.js'

class SigninView extends Component {
    render () {
        const element = document.createElement('div')

        element.innerHTML = `
            Вход
        `
        return element
    }
}

export default SigninView
