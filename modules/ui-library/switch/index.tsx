import Component from 'irbis/component';

import './style.scss';

class SwitchComponent extends Component<{
    isOn: boolean,
    changeOnClick?: boolean,
    onChange?: (value?: boolean) => unknown
}, {
    isOn: boolean
}> {
    defaultProps () {
        return {
            isOn: true,
            changeOnClick: true,
            onChange: () => {
            }
        };
    }

    get isOn () {
        if (this.props.changeOnClick) {
            return this.state.isOn;
        }
        return this.props.isOn;
    }

    onClick () {
        this.props.onChange(!this.isOn);

        if (this.props.changeOnClick) {
            this.state.isOn = !this.state.isOn;
        }
    }

    render () {
        return (<div
            className={['switch', this.isOn ? 'switch_on' : 'switch_off']}
            onClick={() => {
                this.onClick();
            }}
        />);
    }
}

export default SwitchComponent;
