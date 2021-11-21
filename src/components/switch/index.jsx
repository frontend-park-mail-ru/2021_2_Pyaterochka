import Component from '../basecomponent';

import './style.scss';

class SwitchComponent extends Component {
    constructor ({
        isOn = true,
        changeOnClick = true,
        onChange = (i) => {}
    }) {
        super();
        this.attributes.isOn = !!isOn;
        this.attributes.onChange = onChange;
        this.attributes.changeOnClick = changeOnClick;
    }

    onClick (e) {
        if (!this.attributes.changeOnClick) return;

        this.attributes.isOn = !this.attributes.isOn;
        this.attributes.onChange(this.attributes.isOn);
    }

    render () {
        return (<div
            className={['switch', this.attributes.isOn ? 'switch_on' : 'switch_off']}
            onClick={(e) => {
                this.onClick(e);
            }}
        />);
    }
}

export default SwitchComponent;
