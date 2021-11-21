import Component from './basecomponent';

class SimplifyNumComponent extends Component {
    constructor ({
        num
    }) {
        super();
        this.attributes.num = num;
    }

    simplifyNum (num) {
        if (num < 1e3) return num;
        if (num < 1e6) return Math.round(num / 1e3) + 'k';
        if (num < 1e9) return Math.round(num / 1e6) + 'm';
        return Math.round(num / 1e9) + 'b';
    }

    render () {
        return (<span>
            {this.simplifyNum(this.attributes.num)}
        </span>);
    }
}

export default SimplifyNumComponent;
