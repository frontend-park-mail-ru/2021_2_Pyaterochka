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
    }

    render () {
        const element = (
            <div>
                <label className={['input-field', this.attributes.valid]}>
                    <input
                        placeholder=" "
                        type={this.attributes.type}
                        value={this.attributes.value}
                        onInput={(e) => { this.onInput(e); }}
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
        console.log('input');
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
