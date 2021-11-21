import Component from '../../components/basecomponent';
import InputField from '../../components/input-field';
import SwitchContainer from '../../components/switch-container';

export class PropsView extends Component {
    constructor ({
        component
    }) {
        super();
        this.component = component;

        this.component.updatePartly = () => {
            Component.prototype.updatePartly.bind(this.component)();
            this.update();
        };
    }

    render () {
        return (<div className="component-wrapper__table">
            {Object.keys(this.component.attributes).map((key) => {
                const typeC = typeof this.component.attributes[key];

                if (this.component.attributes[key] instanceof Date) {
                    return (<InputField
                        key={key}
                        onInput={(e) => {
                            this.component.attributes[key] = e.target.valueAsDate || new Date();
                        }}
                        placeholder={key}
                        type="datetime-local"
                        value={this.component.attributes[key].toISOString().substr(0, 16)}
                    />);
                }
                switch (typeC) {
                case 'string':
                    return (<InputField
                        key={key}
                        onInput={(e) => {
                            this.component.attributes[key] = e.target.value;
                        }}
                        placeholder={key}
                        value={this.component.attributes[key]}
                    />);
                case 'number':
                    return (<InputField
                        key={key}
                        onInput={(e) => {
                            this.component.attributes[key] = Number(e.target.value) || 0;
                        }}
                        placeholder={key}
                        type="number"
                        value={this.component.attributes[key]}
                    />);
                case 'boolean':
                    return (<SwitchContainer
                        isOn={this.component.attributes[key]}
                        key={key}
                        onChange={(state) => {
                            this.component.attributes[key] = state;
                        }}
                        title={key}
                    />);
                default:
                    return (<InputField
                        disabled
                        key={key}
                        placeholder={key}
                        value={this.component.attributes[key]}
                    />);
                }
            })}
        </div>);
    }
}
