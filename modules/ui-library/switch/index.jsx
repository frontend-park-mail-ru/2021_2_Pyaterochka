import Component from 'irbis/component';

import './style.scss';

class SwitchComponent extends Component {
    defaultProps () {
        return {
            isOn: true,
            changeOnClick: true,
            onChange: (i) => { }
        };
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
