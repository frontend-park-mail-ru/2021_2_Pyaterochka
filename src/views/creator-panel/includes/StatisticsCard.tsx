import Component from 'irbis/component';
import './style.scss';

class StatisticsCard extends Component<{
    title: string,
    counter: string | number
    duration?: string
}> {
    defaultProps () {
        return {
            title: '',
            counter: 0,
            duration: ''
        };
    }

    render () {
        return (<div className="statistics-card shadow">
            <div className="statistics-card__header">
                {this.props.title}
            </div>

            <div className="statistics-card__counter">
                {this.props.counter}
            </div>

            <div className="statistics-card__duration">
                {this.props.duration}
            </div>

        </div>);
    }
}

export default StatisticsCard;
