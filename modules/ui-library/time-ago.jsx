import Component from 'irbis/component';

class TimeAgoComponent extends Component {
    constructor ({
        date
    }) {
        super();
        this.attributes.date = date;
    }

    timeDiff (date) {
        const diff = (new Date()).getTime() - date;
        if (diff <= 1000 * 60 * 5) {
            return 'менее 5 минут назад';
        }

        if (diff < 1000 * 60 * 60) {
            return Math.round(diff / (1000 * 60)) + ' минут назад';
        }

        if (diff < 1000 * 60 * 60 * 24) {
            return Math.round(diff / (1000 * 60 * 60)) + ' часов назад';
        }

        if (diff < 1000 * 60 * 60 * 24 * 30) {
            return Math.round(diff / (1000 * 60 * 60 * 24)) + ' дней назад';
        }

        if (diff < 1000 * 60 * 60 * 24 * 30 * 12) {
            return Math.round(diff / (1000 * 60 * 60 * 24 * 30)) + ' месяцев назад';
        }

        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timezone: 'UTC'
        };

        return new Date(date).toLocaleString('ru', options);
    }

    render () {
        return (<span>
            {this.timeDiff(this.attributes.date)}
        </span>);
    }
}

export default TimeAgoComponent;
