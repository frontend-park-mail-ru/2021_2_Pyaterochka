import Component from 'irbis/component';
import SwitchComponent from '../switch';

import './style.scss';

class SwitchContainer extends Component<{
    isOn: boolean,
    onChange: (value?: boolean) => unknown,
    title: string
}> {
    defaultProps () {
        return {
            isOn: true,
            onChange: () => { },
            title: ''
        };
    }

    change () {
        this.props.onChange(!this.props.isOn);
    }

    render () {
        return (<div
            className="switch-container"
            onClick={() => this.change()}
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
