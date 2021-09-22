import Component from './basecomponent.js';

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
    }

    render () {
        const element = <div>
            <label className="input-field">
                <input placeholder=" " type={this.attributes.type} value={this.attributes.value} />
                <span
                    onClick="this.parentElement.querySelector('input').focus();"
                > {this.attributes.placeholder} </span>
            </label>
            <div className="input-validation">

            </div>
        </div>;

        element.addEventListener('input', e => {
            this.validate();
        });
        this.input = element.querySelector('input');
        this.element = element;

        return element;
    }

    getValue () {
        return this.input.value;
    }

    validate () {
        const element = this.element;
        const inputField = element.querySelector('.input-field');
        const validation = element.querySelector('.input-validation');
        const value = element.querySelector('input').value;

        const errors = this.attributes.validation.map((rule) => {
            return rule(value);
        }).filter((err) => err !== null);

        const elements = errors.map(error => {
            return <div key={errors.id} className="input-validation__error">
                {error}
            </div>;
        });

        validation.innerHTML = '';
        elements.forEach(element => {
            validation.appendChild(element);
        });

        if (elements.length === 0) {
            inputField.classList.add('valid');
            inputField.classList.remove('invalid');
        } else {
            inputField.classList.remove('valid');
            inputField.classList.add('invalid');
        }

        return errors;
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
.input-field input:placeholder-shown + span{
    top:10px;
    font-size:18px;
}

.input-field input:focus + span{
    font-size:10px;
    top:0;
}

.input-field span {
    color: #4C4C4C;
    position: absolute;
    top:-2px;
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
}


.input-field input:focus {
    background: #fff;
}

.input-field.invalid input{
    border-color:#FF424D;
}
.input-field.valid input{
    border-color:#3BBA2E;
}

.input-validation {
    margin: 10px 2px 15px;

}
.input-validation__error{
    text-align:left;
    color:#707070;
    font-size:14px;
    margin: 2px;
    margin-left:20px;
    position:relative;
}
.input-validation__error::before{
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
