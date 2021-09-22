import Component from './basecomponent.js';

class Comment extends Component {
    timeDiff(date) {
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
        if (date < 1000 * 60 * 60 * 24 * 30 * 12) {
            return Math.round(diff / (1000 * 60 * 60 * 24 * 30)) + ' месяцев назад';
        }

        return Math.round(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + ' месяцев назад';
    }

    constructor({
        user = null,
        published = new Date(),
        body = ''

    }) {
        super();
        this.attributes.user = user;
        this.attributes.published = published;
        this.attributes.body = body;
    }

    render() {
        return <div>
            <div class="comment">
                <div class="comment__user-avatar">
                    <img src={this.attributes.user.avatar} alt="Аватар комментатора" />
                </div>

                <div class="comment__info">
                    <span class="comment__info__username">{this.attributes.user.username}</span>
                    <span class="comment__info__published">{this.timeDiff(this.attributes.published)}</span>
                </div>

                <div class="comment__body">{this.attributes.body}</div>
            </div>
        </div>
    }
}
export default Comment;

const styles = `
.comment {
    position: relative;
    margin-top: 50px;
    padding: 15px 20px;
    max-width: 791px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}

.comment__user-avatar img {
    position: absolute;
    top: -2em;
    left: 20px;
    width: 70px;
    height: 70px;
    border-radius: 100%;
    object-fit: cover;
}

.comment__info {
   margin-left: 90px;
   margin-bottom: 10px;
}

.comment__info__username {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
}

.comment__info__username::after {
    content: '\\007C';

    padding-left: 7px;
    padding-right: 3px;

    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;

    color: #acabab;
}

.comment__info__published {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
}

.comment__body {
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
