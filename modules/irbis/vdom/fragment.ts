import Component from '../component';
import VDomNode from './vdom-node';

/**
 * Компонент объединения нескольких компонентов в группу
 */
class Fragment extends Component<never> {
    constructor (props: Record<string, never>, ...c: VDomNode[]) {
        super();

        this.slot = c;
    }
}

export default Fragment;
