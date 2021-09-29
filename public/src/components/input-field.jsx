import Component from './basecomponent.js';

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
                    />
                    <span onClick="this.parentElement.querySelector('input').focus();">
                        {' '}
                        {this.attributes.placeholder}{' '}
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

        element.addEventListener('input', (e) => {
            this.input = e.target;
            this.dom = this.input.parentElement.parentElement;
            this.validate();
        });
        if (!this.input) {
            this.input = element.querySelector('input');
        }

        return element;
    }

    getValue () {
        return this.input.value;
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

const styles = `
.input-field {
    position:relative;
    display:block;
}

.input-field input:placeholder-shown {
    background: #F4F4F4;
}

.input-field input:placeholder-shown + span {
    top:12px;
    font-size:18px;
}

.input-field input:focus + span {
    font-size:10px;
    top:0;
}

.input-field span {
    color: #4C4C4C;
    position: absolute;
    top:0px;
    left:10px;
    font-size:10px;
    cursor: text;
    transition: all .3s;
}

.input-field input {
    background: #fff;
    display:block;
    width:100%;
    padding:12px 10px 8px;
    border-radius:5px;
    border: 1px solid #DEDEDE;
    outline: 0;
    transition: all .3s;
    font-size:18px;
}

.input-field input:focus {
    background: #fff;
}

.input-field.invalid input {
    border-color:#FF424D;
}

.input-field.valid input {
    border-color:#3BBA2E;
}

.input-validation {
    margin: 10px 2px 15px;

}
.input-validation__error {
    text-align:left;
    color:#707070;
    font-size:14px;
    margin: 2px;
    margin-left:20px;
    position:relative;
}

.input-validation__error::before {
    content: '!';
    position:absolute;
    left: -10px;
    color: #E42F2F;
    font-weight:900;
    font-size:16px;
    top:-2px;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
