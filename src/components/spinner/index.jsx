import Component from '../basecomponent';

/**
 * Компонент спинера - индикатор загрузки
 */
class Spinner extends Component {
    constructor ({
        color = '#000'
    } = {}) {
        super();
        this.attributes.color = color;
    }

    render () {
        return (<div
            className="spinner"
            style={
                `
            border-color: ${this.attributes.color};
            border-top-color: transparent;
            `
            }
        />);
    }
}
export default Spinner;
