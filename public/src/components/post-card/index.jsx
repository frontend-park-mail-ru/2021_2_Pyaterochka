import Component from '../basecomponent';
import Button from '../button';
import LockMessage from '../lock-message';
import TimeAgoComponent from '../time-ago';
import './style.scss';
import CountersComponent from '../../counters';
import app from '../../core/app';

/**
 * Компонент карточки записи
 */
class PostCard extends Component {
    constructor ({
        title = '',
        published = new Date(),
        likes = 0,
        views = 0,
        description = '',
        id = null,
        creatorId = null,
        level = '',
        opened = true,
        image = ''
    }) {
        super();
        this.attributes.title = title;
        this.attributes.published = published;
        this.attributes.likes = likes;
        this.attributes.views = views;
        this.attributes.description = description;
        this.attributes.id = id;
        this.attributes.creatorId = creatorId;
        this.attributes.level = level;
        this.attributes.opened = opened;
        this.attributes.image = image;
    }

    render () {
        const style = `background-image:url('${this.attributes.image}')`;
        return (
            <div className="post-card">
                <div className="post-card__image">
                    <div
                        className={['image', this.attributes.opened ? '' : 'blur']}
                        style={style}
                    />
                    {this.attributes.opened
                        ? (
                            ''
                        )
                        : (
                            <LockMessage text={this.attributes.level} dark={false}/>
                        )}
                </div>
                <div className="post-card__body">
                    <div className="post-card__title">{this.attributes.title}</div>
                    <div className="post-card__meta">
                        <div>
                            <span className="post-card__published">
                                <TimeAgoComponent date={this.attributes.published}/>
                            </span>
                        </div>
                        <CountersComponent likes={this.attributes.likes} views={this.attributes.views}/>
                    </div>
                    <div className="post-card__desc">{this.attributes.description}</div>
                    <Button text="Открыть материал" onClick={() => {
                        app.$router.go(
                            app.$router.createUrl('post.view', this.attributes.creatorId + '/' + this.attributes.id)
                        );
                    }}/>
                </div>
            </div>
        );
    }
}

export default PostCard;
