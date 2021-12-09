import Component from 'irbis/component';
import './style.scss';

class ValidationError extends Component<{
    value:string
}> {
    defaultProps () {
        return { value: '' };
    }

    render () {
        return (<div
            className="validation_error"
        >
            {this.props.value}
        </div>);
    }
}

export default ValidationError;
