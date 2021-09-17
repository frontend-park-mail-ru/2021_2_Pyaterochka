import Component from './basecomponent.js'
import Button from './button.js'

class PostCard extends Component {
    timeDiff (date) {
        const diff = (new Date()).getTime() - date
        console.log(diff)
        if (diff <= 1000 * 60 * 5) {
            return 'менее 5 минут назад'
        }
        if (diff < 1000 * 60 * 60) {
            return Math.round(diff / (1000 * 60)) + ' минут назад'
        }

        if (diff < 1000 * 60 * 60 * 24) {
            return Math.round(diff / (1000 * 60 * 60)) + ' часов назад'
        }

        if (diff < 1000 * 60 * 60 * 24 * 30) {
            return Math.round(diff / (1000 * 60 * 60 * 24)) + ' дней назад'
        }
        if (date < 1000 * 60 * 60 * 24 * 30 * 12) {
            return Math.round(diff / (1000 * 60 * 60 * 24 * 30)) + ' месяцев назад'
        }

        return Math.round(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + ' месяцев назад'
    }

    simplifyNum (num) {
        if (num < 1e3) return num
        if (num < 1e6) return Math.round(num / 1e3) + 'k'
        if (num < 1e9) return Math.round(num / 1e6) + 'm'
        return Math.round(num / 1e9) + 'b'
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
        super()
        this.attributes.title = title
        this.attributes.published = published
        this.attributes.likes = likes
        this.attributes.views = views
        this.attributes.description = description
        this.attributes.id = id
        this.attributes.level = level
        this.attributes.opened = opened
        this.attributes.image = image
    }

    render () {
        const element = document.createElement('div')
        element.className = 'post-card'

        element.innerHTML = `
            <div class="post-card-image">
                <div class="image ${this.attributes.opened ? '' : 'blur'}" style="background-image:url(${this.attributes.image})"></div>
                ${this.attributes.opened
        ? ''
        : `
                    <div class="look">
                        <div class="icon">
                        </div>
                        <span> ${this.attributes.level}</span>
                    </div>
                `}
                
            </div>
            <div class="post-card-body">
                <div class="post-card-title">
                    ${this.attributes.title}
                </div>
                <div class="post-card-meta">
                    <div>
                        <span class="date">
                        ${this.timeDiff(this.attributes.published)}
                        </span>
                    </div>
                    <div>
                        <span class="visits">
                            <img src="/imgs/icons/view_outline_28.svg">
                            ${this.simplifyNum(this.attributes.views)}
                        </span>
                        <span class="likes">
                            <img src="/imgs/icons/like_outline_28.svg">
                            ${this.simplifyNum(this.attributes.likes)}
                        </span>
                    </div>
                </div>
                <div class="post-card-desc">
                    ${this.attributes.description}
                </div>
            </div>
        `

        const btn = new Button({ text: 'Открыть материал' })
        element.querySelector('.post-card-body').appendChild(btn.render())

        return element
    }
}

export default PostCard

const styles = `
.post-card {
    display:flex;
    padding:10px;
    box-shadow: 0px 2px 10px 0px #00000033;
    max-width: 100%;
    width: 600px;
    justify-content:center;
    align-items: stretch;
}


.post-card-title {
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
}
.post-card-image {
    min-width: 220px;
    position:relative;
    overflow:hidden;
    border-radius:5px;
}
.post-card-image .image {
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-size:cover;
    background-position:center;
}
.post-card-image .image.blur{
    filter: blur(20px);
}

.post-card-body {
    padding-left: 10px;
}
.post-card-meta{
    display: flex;
    justify-content:space-between;
    padding-bottom:10px;
    position:relative;
}
.post-card-meta::after {
    content: "";
    position:absolute;
    bottom:5px;
    width:100px;
    height:2px;
    border-radius:2px;
    background:#ACABAB;
}

.post-card-meta .date{
    font-size: 14px;
    font-weight: 300;
    color: #909090;
}
.post-card-meta .visits, .post-card-meta .likes {
    font-size: 14px;
    font-weight: 300;
}
.post-card-meta .visits img, .post-card-meta .likes img {
    width: 18px;
    height: 18px;
    margin-bottom:-3px;
    margin-left:5px;
    margin-right: -3px;
}

.post-card-desc {
    max-height:110px;
    overflow:hidden;
    position:relative;
    font-size: 14px;
    font-weight:300;
}
.post-card-desc::after {
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: linear-gradient(0deg, rgb(255, 255, 255),rgba(255,255,255, 0) 50% );
}

@media (max-width: 600px) {
    .post-card {
        flex-wrap:wrap;
    }
    .post-card-image {
        width:100%;
        height: 200px;
    }

    .post-card-body {
        padding: 10px 0;
    }
}

.look{
    width: 100%;
text-align: center;
color: #fff;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
font-size: 20px;
font-weight: 500;
}
.look .icon {
    width:80px;
    height: 80px;
    border-radius: 100%;
    margin-bottom: 10px;
    box-shadow: 0px 2px 10px 0px #FFFFFF66;
    background:#fff;
}
.look .icon::after{
    content: '';
    width:56px;
    height:56px;
    display:block;
    background-color: var(--color-primary);
    mask-image: url(/imgs/icons/lock_outline_28.svg);
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
    margin: 12px; 
}
`
const styleElement = document.createElement('style')
styleElement.innerHTML = styles
document.body.appendChild(styleElement)
