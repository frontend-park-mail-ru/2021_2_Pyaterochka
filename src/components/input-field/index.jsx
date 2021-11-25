import Component from '../basecomponent';
import './style.scss';

/**
 * Компонент поля ввода
 */
class InputField extends Component {
    constructor ({
        placeholder = '',
        type = 'text',
        value = '',
        disabled = false,
        onInput = () => { },
        onChange = () => { },
        validation = []
    }) {
        super();
        this.attributes.placeholder = placeholder;
        this.attributes.type = type;
        this.attributes.value = value;
        this.attributes.validation = validation;
        this._value = '';
        this.attributes.valid = '';
        this.attributes.errors = [];
        this.attributes.onInput = onInput;
        this.attributes.onChange = onChange;
        this.attributes.disabled = disabled;
    }

    onCheckBox (e) {
        this.input = e.target;
        this.attributes.value = !this.attributes.value;
        this.attributes.onInput(e);
        this.attributes.onChange(e);

        this.updateForce();
    }

    render () {
        return (
            <div>
                <label
                    className={['input-field', this.attributes.valid, this.attributes.disabled ? 'input-field_disabled' : '']}
                >
                    {this.attributes.type === 'checkbox'
                        ? <input
                            placeholder=" "
                            type={this.attributes.type}
                            checked={this.attributes.value ? 'checked' : ''}
                            onClick={(e) => {
                                this.onCheckBox(e);
                            }}
                            disabled={this.attributes.disabled}
                        />
                        : <input
                            placeholder=" "
                            type={this.attributes.type}
                            value={this.attributes.value}
                            onInput={(e) => {
                                this.onInput(e);
                            }}
                            onChange={(e) => {
                                this.attributes.onChange(e);
                            }}
                            disabled={this.attributes.disabled}
                        />}

                    <span onClick="this.parentElement.querySelector('input').focus();">
                        {' '}

                        {this.attributes.placeholder}

                        {' '}
                    </span>
                </label>

                <div className="input-validation">
                    {
                        this.attributes.errors.map((error) => {
                            return (
                                <div
                                    className="input-validation_error"
                                    key={error.key}
                                >
                                    {error.error}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    getValue () {
        return this.input.value;
    }

    onInput (e) {
        this.attributes.onInput(e, e.value);
        this.input = e.target;
        this.validate();
    }

    validate () {
        if (!this.attributes.validation.length) { return; }
        const value = this.getValue();

        this.attributes.errors = this.attributes.validation
            .map((rule, i) => {
                return {
                    key: i,
                    error: rule(value)
                };
            })
            .filter((err) => err.error !== null);

        if (this.attributes.errors.length === 0) {
            this.attributes.valid = 'valid';
        } else {
            this.attributes.valid = 'invalid';
        }

        return this.attributes.errors;
    }
}
export default InputField;
