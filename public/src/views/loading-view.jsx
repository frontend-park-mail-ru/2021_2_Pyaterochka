import Component from '../components/basecomponent.js';
import Spinner from '../components/spinner.jsx';

class LoadingView extends Component {
    render () {
        return <div class="text-center" style="margin:50px;">
            <Spinner/>
        </div>
    }
}

export default LoadingView;
