import Component from 'irbis/component';
import InputField from 'ui-library/input-field';
import SwitchContainer from 'ui-library/switch-container';

export class PropsView extends Component {
    constructor ({
        component
    }) {
        super();
        this.componentVDom = component;

        this.component.updatePartly = () => {
            Component.prototype.updatePartly.bind(this.component)();
            this.update();
        };
    }

    get component () {
        return this.componentVDom._component;
    }

    renderField (attribute, key, setter) {
        if (key.split('.').length > 10) return null;
        if (attribute === null) {
            return (<InputField
                disabled
                key={key}
                placeholder={key}
                value={attribute}
            />);
        }
        if (attribute instanceof Date) {
            return (<InputField
                key={key}
                onInput={(e) => {
                    setter(e.target.valueAsDate || new Date());
                }}
                placeholder={key}
                type="datetime-local"
                value={attribute.toISOString().substr(0, 16)}
            />);
        }
        switch (typeof (attribute)) {
        case 'string':
            return (<InputField
                key={key}
                onInput={(e) => {
                    setter(e.target.value);
                }}
                placeholder={key}
                value={attribute[key]}
            />);
        case 'number':
            return (<InputField
                key={key}
                onInput={(e) => {
                    setter(Number(e.target.value) || 0);
                }}
                placeholder={key}
                type="number"
                value={attribute}
            />);
        case 'boolean':
            return (<SwitchContainer
                isOn={attribute}
                key={key}
                onChange={(state) => {
                    setter(state);
                }}
                title={key}
            />);
        case 'object':
            if (Array.isArray(attribute)) {
                return (<div>
                    <b>
                        {key}
                    </b>

                    {attribute.map((childAttribute, childKey) => {
                        return this.renderField(childAttribute, key + '.' + childKey, (value) => {
                            const patched = attribute;
                            patched[childKey] = value;
                            setter(patched);
                        });
                    })}
                </div>);
            }
            return (<div>
                <b>
                    {key}
                </b>

                {Object.keys(attribute).map((childKey) => {
                    return this.renderField(attribute[childKey], key + '.' + childKey, (value) => {
                        const patched = attribute;
                        patched[childKey] = value;
                        setter(patched);
                    });
                })}
            </div>);

        default:
            return (<InputField
                disabled
                key={key}
                placeholder={key}
                value={attribute}
            />);
        }
    }

    render () {
        return (<div className="component-wrapper__table">
            <div>
                <b>
                    PROPS:
                </b>

                {' '}
            </div>

            {Object.keys(this.component.defaultProps()).map((key) => {
                return this.renderField(this.component.props[key], key, (value) => {
                    this.component.props[key] = value;
                    this.component.update();
                });
            })}

            <div>
                <b>
                    State:
                </b>

                {' '}
            </div>

            {Object.keys(this.component.state).map((key) => {
                return this.renderField(this.component.state[key], key, (value) => {
                    this.component.state[key] = value;
                });
            })}
        </div>);
    }
}
