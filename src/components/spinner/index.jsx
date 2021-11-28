import Component from '../basecomponent';

/**
 * Компонент спинера - индикатор загрузки
 */
class Spinner extends Component {
    defaultProps () {
        return {
            color: '#000'
        };
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
