import Component from 'irbis/component';
import ValidationError from 'ui-library/validation-error';
import './style.scss';

/**
 * Компонент поля ввода
 */
class InputField extends Component {
    defaultProps () {
        return {
            placeholder: '',
            type: 'text',
            value: '',
            disabled: false,
            onInput: () => { },
            onChange: () => { },
            validation: [],
            validateAlways: false
        };
    }

    constructor () {
        super();
        this.state.valid = '';
        this.state.errors = [];
    }

    propsChanged () {
        if (this.props.validateAlways) {
            this.validate();
        }
    }

    render () {
        return (
            <div>
                <label
                    className={['input-field', this.attributes.valid, this.attributes.disabled ? 'input-field_disabled' : '']}
                >
                    <input
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
                    />

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
                                <ValidationError
                                    value={error.error}
                                    key={error.key} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    get input () {
        return this?.vdom?.dom?.querySelector('input');
    }

    getValue () {
        return this.input?.value;
    }

    onInput (e) {
        this.attributes.onInput(e, e.value);
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
