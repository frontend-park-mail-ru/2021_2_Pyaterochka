import Component from '../../components/basecomponent';
import Spinner from '../../components/spinner';

import './style.scss';

class LoadingView extends Component {
    constructor (props, ...slot) {
        super();
        this.slot = slot;
    }

    render () {
        return (<div className="loading-view_container">
            <Spinner />

            {this.slot}
        </div>);
    }
}

export default LoadingView;
