import Component from '../basecomponent';
import './style.css';

/**
 * Компонент комментария
 */
class Comment extends Component {
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

    constructor ({
        user = null,
        published = new Date(),
        body = ''

    }) {
        super();
        this.attributes.user = user;
        this.attributes.published = published;
        this.attributes.body = body;
    }

    render () {
        return <div>
            <div className="comment">
                <div className="comment__user-avatar">
                    <img src={this.attributes.user.avatar} alt="Аватар комментатора" />
                </div>

                <div className="comment__info">
                    <span className="comment__info__username">{this.attributes.user.username}</span>
                    <span className="comment__info__published"> {this.timeDiff(this.attributes.published)}</span>
                </div>

                <div className="comment__body">{this.attributes.body}</div>
            </div>
        </div>;
    }
}

export default Comment;
