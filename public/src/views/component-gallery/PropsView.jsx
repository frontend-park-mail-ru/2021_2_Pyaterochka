import Component from '../../components/basecomponent';
import InputField from '../../components/input-field';
import SwitchComponent from '../../components/switch';

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
        return <div className="component-wrapper__table">
            {Object.keys(this.component.attributes).map((key) => {
                const typeC = typeof this.component.attributes[key];

                if (this.component.attributes[key] instanceof Date) {
                    return <InputField
                        type="datetime-local"
                        key={key}
                        placeholder={key}
                        value={this.component.attributes[key].toISOString().substr(0, 16)}
                        onInput={(e) => {
                            this.component.attributes[key] = e.target.valueAsDate || new Date();
                        }} />;
                }
                switch (typeC) {
                case 'string':
                    return <InputField
                        key={key}
                        placeholder={key}
                        value={this.component.attributes[key]}
                        onInput={(e) => {
                            this.component.attributes[key] = e.target.value;
                        }} />;
                case 'number':
                    return <InputField
                        type="number"
                        key={key}
                        placeholder={key}
                        value={this.component.attributes[key]}
                        onInput={(e) => {
                            this.component.attributes[key] = Number(e.target.value) || 0;
                        }} />;
                case 'boolean':
                    return <div>
                        <SwitchComponent
                            key={key}
                            isOn={this.component.attributes[key]}
                            onChange={(state) => {
                                this.component.attributes[key] = state;
                            }} />

                        {key}
                    </div>;
                default:
                    return <InputField
                        key={key}
                        disabled={true}
                        placeholder={key}
                        value={this.component.attributes[key]} />;
                }
            })}
        </div>;
    }
}
