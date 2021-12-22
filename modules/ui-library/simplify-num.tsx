import Component from 'irbis/component';

class SimplifyNumComponent extends Component<{
    num: number
}> {
    defaultProps () {
        return {
            num: 0
        };
    }

    simplifyNum (num): string {
        if (num < 1e3) return num;
        if (num < 1e6) return Math.round(num / 1e3) + 'k';
        if (num < 1e9) return Math.round(num / 1e6) + 'm';
        return Math.round(num / 1e9) + 'b';
    }

    render () {
        return (<span>
            {this.simplifyNum(this.props.num)}
        </span>);
    }
}

export default SimplifyNumComponent;
