import Component from '../components/basecomponent.js'

class IndexView extends Component {
    render () {
        const element = document.createElement('div')

        element.innerHTML = `
            Hello world
        `
        return element
    }
}

export default IndexView
