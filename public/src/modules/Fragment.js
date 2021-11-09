import Component from '../components/basecomponent';

/**
 * Компонент объединения нескольких компонентов в группу
 */
class Fragment extends Component {
    constructor (a, ...c) {
        super();
        this.c = c;
    }

    render () {
        return this.c;
    }
}

export default Fragment;
