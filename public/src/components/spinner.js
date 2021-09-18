import Component from './basecomponent.js'

class Spinner extends Component {
    render () {
        const element = document.createElement('div')
        element.className = 'spinner'
        return element
    }
}
export default Spinner
