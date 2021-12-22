import Component from 'irbis/component';
import TimeAgoComponent from '../time-ago';
import './style.scss';

/**
 * Компонент комментария
 */
class Comment extends Component<{
    user?: {
        avatar:string,
        username:string
    },
    published: Date,
    body: string
}> {
    defaultProps () {
        return {
            user: null,
            published: new Date(),
            body: ''
        };
    }

    render () {
        return (<div>
            <div className="comment">
                <div className="comment__user-avatar">
                    <img
                        alt="Аватар комментатора"
                        src={this.props.user.avatar}
                    />
                </div>

                <div className="comment__info">
                    <span className="comment__info-username">
                        {this.props.user.username}
                    </span>

                    <span className="comment__info-published">
                        <TimeAgoComponent date={this.props.published} />
                    </span>
                </div>

                <div className="comment__body">
                    {this.props.body}
                </div>
            </div>
        </div>);
    }
}

export default Comment;
