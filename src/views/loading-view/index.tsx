import Component from 'irbis/component';
import Spinner from 'ui-library/spinner';

import './style.scss';

class LoadingView extends Component<never> {
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
