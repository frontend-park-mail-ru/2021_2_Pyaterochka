import app from 'irbis';
import CountersComponent from '../counters';
import Component from 'irbis/component';
import TimeAgoComponent from '../time-ago';
import './style.scss';

class PostHeaderComponent extends Component<{
    size?: string,
    title: string,
    published?: Date,
    views?: number,
    likes?: number,
    id?: string,
    creatorId?: string
}
    > {
    defaultProps () {
        return {
            size: '32px',
            title: '',
            published: null,
            views: 0,
            likes: 0,
            id: null,
            creatorId: null
        };
    }

    render () {
        return (<div className="post-header">
            <p
                className="post-header__title"
                router-go={
                    app.$router.createUrl('post.view', this.props.creatorId + '/' + this.props.id)
                }
                style={'font-size:' + this.props.size + ';'}
            >
                {this.props.title}
            </p>

            <div className="post-header__sub">
                <TimeAgoComponent date={this.props.published} />

                <CountersComponent
                    likes={this.props.likes}
                    views={this.props.views}
                />
            </div>
        </div>);
    }
}

export default PostHeaderComponent;
