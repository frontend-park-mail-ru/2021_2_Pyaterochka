import Component from 'irbis/component';
import SwitchComponent from '../switch';

import './style.scss';

class SwitchContainer extends Component {
    defaultProps () {
        return {
            isOn: true,
            onChange: () => { },
            title: ''
        };
    }

    change () {
        this.attributes.onChange(!this.props.isOn);
    }

    render () {
        return (<div
            className="switch-container"
            onClick={(e) => this.change(e)}
        >
            <span>
                {this.attributes.title}
            </span>

            <SwitchComponent
                changeOnClick={false}
                isOn={this.attributes.isOn}
            />
        </div>);
    }
}

export default SwitchContainer;
