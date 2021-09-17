import Component from '../components/basecomponent.js'

class SignupView extends Component {
    render () {
        const element = document.createElement('div')

        element.innerHTML = `
            SignupView
        `
        return element
    }
}

export default SignupView
