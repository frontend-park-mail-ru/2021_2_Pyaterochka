import Component from '../basecomponent';
import Button from '../button';
import LockMessage from '../lock-message';
import TimeAgoComponent from '../time-ago';
import SimplifyNumComponent from '../simplify-num';
import './style.css';

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
                        <div>
                            <span className="visits">
                                <img src="/imgs/icons/view_outline_28.svg" />
                                <SimplifyNumComponent num={this.attributes.views}/>
                            </span>
                            <span className="likes">
                                <img src="/imgs/icons/like_outline_28.svg" />
                                <SimplifyNumComponent num={this.attributes.likes}/>
                            </span>
                        </div>
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
