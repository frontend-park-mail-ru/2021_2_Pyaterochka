import Component from '../component';
import VDomNode from './vdom-node';

/**
 * Компонент объединения нескольких компонентов в группу
 */
class Fragment extends Component {
    constructor (props: any, ...c: VDomNode[]) {
        super();

        this.slot = c;
    }
}

export default Fragment;
