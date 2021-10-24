import Component from '../basecomponent';
import TimeAgoComponent from '../time-ago';
import './style.css';

/**
 * Компонент комментария
 */
class Comment extends Component {
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
                    <span className="comment__info__published">
                        <TimeAgoComponent date={this.attributes.published} />
                    </span>
                </div>

                <div className="comment__body">{this.attributes.body}</div>
            </div>
        </div>;
    }
}

export default Comment;
