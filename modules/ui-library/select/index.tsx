import Component from 'irbis/component';
import './style.scss';

type PropsType = {
    inital?: string,
    options?: string[],
    placeholder?: string,
    onChange?: (value?: string) => unknown
};
class SelectComponent extends Component<PropsType, {
    value: string
}> {
    defaultProps () {
        return {
            inital: '',
            options: [],
            placeholder: '',
            onChange: () => {
            }
        };
    }

    constructor ({
        inital
    }: PropsType) {
        super();

        this.state.value = inital;
    }

    change (e: InputEvent) {
        if (!(e.target instanceof HTMLInputElement)) {
            return;
        }
        this.attributes.onChange(e.target.value);
    }

    render () {
        return (<div className="select-component">
            <div className="select-component__placeholder">
                {this.attributes.placeholder}
            </div>

            <select
                className="select-component__select"
                onChange={
                    (e) => {
                        this.change(e);
                    }
                }
            >
                {
                    this.attributes.inital
                        ? <option
                            disabled
                            selected={this.attributes.inital === this.attributes.value}
                        >
                            {this.attributes.inital}
                        </option>
                        : ''
                }

                {
                    this.attributes.options.map((option, i) => (
                        <option
                            key={i}
                            selected={option === this.attributes.value}
                        >
                            {option}

                            {' '}
                        </option>
                    ))
                }
            </select>
        </div>);
    }
}

export default SelectComponent;
