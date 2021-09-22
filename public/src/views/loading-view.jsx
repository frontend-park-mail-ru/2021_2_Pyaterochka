import Component from '../components/basecomponent.js';
import Spinner from '../components/spinner.jsx';

class LoadingView extends Component {
    render () {
        return <div className="text-center" style="margin:50px;">
            <Spinner/>
        </div>;
    }
}

export default LoadingView;
