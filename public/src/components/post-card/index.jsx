import Component from '../basecomponent';
import Button from '../button';
import LockMessage from '../lock-message';
import TimeAgoComponent from '../time-ago';
import './style.css';
import CountersComponent from '../../counters';

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
        this.attributes.level = level;
        this.attributes.opened = opened;
        this.attributes.image = image;
    }

    render () {
        const style = `background-image:url(${this.attributes.image})`;
        const element = (
            <div className="post-card">
                <div className="post-card-image">
                    <div
                        className={['image', this.attributes.opened ? '' : 'blur']}
                        style={style}
                    ></div>
                    {this.attributes.opened
                        ? (
                            ''
                        )
                        : (
                            <LockMessage text={this.attributes.level} dark={false} />
                        )}
                </div>
                <div className="post-card-body">
                    <div className="post-card-title">{this.attributes.title}</div>
                    <div className="post-card-meta">
                        <div>
                            <span className="date">
                                <TimeAgoComponent date={this.attributes.published}/>
                            </span>
                        </div>
                        <CountersComponent likes={this.attributes.likes} views={this.attributes.views} />
                    </div>
                    <div className="post-card-desc">{this.attributes.description}</div>
                    <Button text="Открыть материал" />
                </div>
            </div>
        );

        return element;
    }
}

export default PostCard;
