import Component from 'irbis/component';
import SwitchComponent from '../switch';

import './style.scss';

class SwitchContainer extends Component {
    defaultProps () {
        return {
            isOn: true,
            onChange: (i) => { },
            title: ''
        };
    }

    change () {
        this.attributes.isOn = !this.attributes.isOn;

        this.attributes.onChange(this.attributes.isOn);
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
