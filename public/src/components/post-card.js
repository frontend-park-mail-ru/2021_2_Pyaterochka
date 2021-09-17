import Component from "./basecomponent.js";
import Button from "./button.js";

class PostCard extends Component
{
    timeDiff(date) {
        const diff = (new Date()).getTime() - date;
        console.log(diff)
        if (diff <= 1000 * 60 * 5) {
            return "менее 5 минут назад"
        }
        if (diff < 1000 * 60 * 60) {
            return Math.round(diff / (1000 * 60)) + " минут назад"
        }

        if (diff < 1000 * 60 * 60 * 24) {
            return Math.round(diff / (1000 * 60 * 60)) + " часов назад"
        }

        if (diff < 1000 * 60 * 60 * 24 * 30) {
            return Math.round(diff / (1000 * 60 * 60 * 24)) + " дней назад"
        }
        if (date < 1000 * 60 * 60 * 24 * 30 * 12) {
            return Math.round(diff / (1000 * 60 * 60 * 24 * 30)) + " месяцев назад"
        }

        return Math.round(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + " месяцев назад"
    }
    constructor({
        title = "",
        published= new Date(),
        likes = 0,
        views = 0,
        description = '',
        id = null,
        level = "",
        opened = true,
        image = "",
    }){
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

    render() {
        const element = document.createElement("div")
        element.className = "post-card"

        element.innerHTML = `
            <div class="post-card-image">
                <div class="image blur" style="background-image:url(${this.attributes.image})"></div>
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
                            ${this.attributes.views}
                        </span>
                        <span class="likes">
                            ${this.attributes.likes}
                        </span>
                    </div>
                </div>
                <div class="post-card-desc">
                    ${this.attributes.description}
                </div>
            </div>
        `;

        const btn = new Button({text:"Открыть материал"})
        element.querySelector(".post-card-body").appendChild(btn.render());

        return element
    }
}

export default PostCard

const styles = `
.post-card {
    display:flex;
    flex-wrap:wrap;
    padding:10px;
    box-shadow: 0px 2px 10px 0px #00000033;
    max-width: 100%;
    width: 600px;
    justify-content:center;
    align-items: center; 
}


.post-card-title {
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;

}
.post-card-image {
    width: 220px;
    height: 220px;
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

}
.post-card-image .image.blur{
    filter: blur(20px);
}

.post-card-body {
    max-width:350px;
    padding: 0 10px;
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
.post-card-desc {
    max-height:110px;
    overflow:hidden;
    position:relative
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
`
const styleElement = document.createElement('style')
styleElement.innerHTML = styles
document.body.appendChild(styleElement)
