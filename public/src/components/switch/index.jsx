import Component from '../basecomponent';

import './style.css';

class SwitchComponent extends Component {
    constructor ({
        isOn = true,
        onChange = (i) => {}
    }) {
        super();
        this.attributes.isOn = !!isOn;
        this.attributes.onChange = onChange;
    }

    onClick (e) {
        this.attributes.isOn = !this.attributes.isOn;
        this.attributes.onChange(this.attributes.isOn);
    }

    render () {
        return <div className={['switch', this.attributes.isOn ? 'switch--on' : 'switch--off']} onClick={(e) => { this.onClick(e); }}></div>;
    }
}

export default SwitchComponent;
