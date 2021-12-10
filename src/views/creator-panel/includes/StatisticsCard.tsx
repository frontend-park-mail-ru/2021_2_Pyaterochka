import Component from 'irbis/component';
import './style.scss';

class StatisticsCard extends Component<{
    title: string,
    counter: string | number
}> {
    defaultProps () {
        return {
            title: '',
            counter: 0
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
        </div>);
    }
}

export default StatisticsCard;
