import Component from '../basecomponent';
import './style.css';

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
        const element = (
            <div>
                <label className={['input-field', this.attributes.valid, this.attributes.disabled ? 'input-field__disabled' : '']}>
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
                            onInput={(e) => { this.onInput(e); }}
                            onChange={(e) => { this.attributes.onChange(e); }}
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
                                <div key={error.key} className="input-validation__error">
                                    {error.error}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );

        return element;
    }

    getValue () {
        return this.dom.dom.querySelector('input').value;
    }

    onInput (e) {
        this.attributes.onInput(e);
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
