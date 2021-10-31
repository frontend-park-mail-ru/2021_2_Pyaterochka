import Component from '../basecomponent';
import './style.scss';

class SelectComponent extends Component {
    constructor ({
        inital = '',
        value = inital,
        options = [],
        placeholder = '',
        onChange = () => { }
    }) {
        super();

        this.attributes.inital = inital;
        this.attributes.value = value;
        this.attributes.options = options;
        this.attributes.placeholder = placeholder;
        this.attributes.onChange = onChange;
    }

    change (e) {
        this.attributes.onChange(e.target.value);
    }

    render () {
        return <div className="select-component">
            <div className="select-component__placeholder">
                {this.attributes.placeholder}
            </div>
            <select className="select-component__select" onChange={
                (e) => {
                    this.change(e);
                }
            }>
                {
                    this.attributes.inital
                        ? <option disabled selected={this.attributes.inital === this.attributes.value}>
                            {this.attributes.inital}
                        </option>
                        : ''
                }

                {
                    this.attributes.options.map((option, i) => (
                        <option key={i} selected={option === this.attributes.value}>{option} </option>
                    ))
                }
            </select>
        </div>;
    }
}

export default SelectComponent;
