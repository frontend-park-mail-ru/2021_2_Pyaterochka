import Component from '../components/basecomponent.js'
import Spinner from '../components/spinner.js'

class LoadingView extends Component {
    render () {
        const element = document.createElement('div')
        element.appendChild((new Spinner()).renderReactive())
        element.className = 'text-center'
        element.style.margin = '50px'
        return element
    }
}

export default LoadingView
