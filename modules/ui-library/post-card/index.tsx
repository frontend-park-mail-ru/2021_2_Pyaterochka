import app from 'irbis';
import Button from '../button';
import Component from 'irbis/component';
import CountersComponent from '../counters';
import LockMessage from '../lock-message';
import TimeAgoComponent from '../time-ago';
import './style.scss';

/**
 * Компонент карточки записи
 */
class PostCard extends Component<{
    title: string,
    published: Date,
    likes?: number,
    views?: number,
    description: string,
    id?: string,
    levelId?: string,
    creatorId?: string,
    level?: string,
    opened?: boolean,
    image?: string,
}> {
    defaultProps () {
        return {
            title: '',
            published: new Date(),
            likes: 0,
            views: 0,
            description: '',
            id: null,
            levelId: null,
            creatorId: null,
            level: '',
            opened: true,
            image: ''
        };
    }

    open () {
        app.$router.go(
            this.goUrl()
        );
    }

    goUrl () {
        return this.props.opened
            ? app.$router.createUrl('post.view', this.props.creatorId + '/' + this.props.id)
            : app.$router.createUrl('payment', this.props.creatorId + '/' + this.props.levelId);
    }

    render () {
        const style = `background-image:url('${this.props.image}')`;
        return (
            <div className="post-card">
                <div
                    className="post-card__image"
                    router-go={this.goUrl()}>
                    <div
                        className={['image', this.props.opened ? '' : 'blur']}
                        style={style}
                    />

                    {this.props.opened
                        ? (
                            ''
                        )
                        : (
                            <LockMessage
                                dark={false}
                                text={this.props.level}
                            />
                        )}
                </div>

                <div className="post-card__body">
                    <div
                        className="post-card__title"
                        router-go={this.goUrl()}>
                        {this.props.title}
                    </div>

                    <div className="post-card__meta">
                        <div>
                            <span className="post-card__published">
                                <TimeAgoComponent date={this.props.published} />
                            </span>
                        </div>

                        <CountersComponent
                            likes={this.props.likes}
                            views={this.props.views}
                        />
                    </div>

                    <div className="post-card__desc">
                        {this.props.description}
                    </div>

                    <Button
                        onClick={() => {
                            this.open();
                        }}
                        text="Открыть материал"
                    />
                </div>
            </div>
        );
    }
}

export default PostCard;
