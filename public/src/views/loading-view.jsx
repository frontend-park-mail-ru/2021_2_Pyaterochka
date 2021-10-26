import Component from '../components/basecomponent';
import Spinner from '../components/spinner';

class LoadingView extends Component {
    constructor (props, ...slot) {
        super();
        this.slot = slot;
    }

    render () {
        return <div className="loading-view_container">
            <Spinner/>
            {this.slot}
        </div>;
    }
}

const styles = `
.loading-view_container {
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);

export default LoadingView;
