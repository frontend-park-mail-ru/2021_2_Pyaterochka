import Component from '../basecomponent';
import Button from '../button';
import LockMessage from '../lock-message';
import './style.css';

/**
 * Компонент карточки записи
 */
class PostCard extends Component {
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

    simplifyNum (num) {
        if (num < 1e3) return num;
        if (num < 1e6) return Math.round(num / 1e3) + 'k';
        if (num < 1e9) return Math.round(num / 1e6) + 'm';
        return Math.round(num / 1e9) + 'b';
    }

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
                                {this.timeDiff(this.attributes.published)}
                            </span>
                        </div>
                        <div>
                            <span className="visits">
                                <img src="/imgs/icons/view_outline_28.svg" />
                                {this.simplifyNum(this.attributes.views)}
                            </span>
                            <span className="likes">
                                <img src="/imgs/icons/like_outline_28.svg" />
                                {this.simplifyNum(this.attributes.likes)}
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
