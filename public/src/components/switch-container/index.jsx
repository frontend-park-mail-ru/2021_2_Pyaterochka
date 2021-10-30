import Component from '../basecomponent';
import SwitchComponent from '../switch';

import './style.css';

class SwitchContainer extends Component {
    constructor ({
        isOn = true,
        onChange = (i) => { },
        title = ''
    }) {
        super();
        this.attributes.title = title;
        this.attributes.isOn = !!isOn;
        this.attributes.onChange = onChange;
    }

    change () {
        this.attributes.isOn = !this.attributes.isOn;

        this.attributes.onChange(this.attributes.isOn);
    }

    render () {
        return <div className="switch-container" onClick={(e) => this.change(e)}>
            <span>{this.attributes.title}</span>
            <SwitchComponent
                isOn={this.attributes.isOn}
                changeOnClick={false}
            />
        </div>;
    }
}

export default SwitchContainer;
