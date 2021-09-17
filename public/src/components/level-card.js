import Component from './basecomponent.js'
import Button from './button.js'

class LevelCard extends Component {
    constructor ({
        id = null,
        name = '',
        parentName = null,
        benefits = [],
        cover = '',
        price = '0 $',
        color = 'primary'
    }) {
        super()
        this.attributes.id = id
        this.attributes.name = name
        this.attributes.parentName = parentName
        this.attributes.benefits = benefits
        this.attributes.cover = cover
        this.attributes.price = price
        this.attributes.color = color
    }

    render () {
        const element = document.createElement('div')
        element.className = 'level-card'

        element.innerHTML = `
            <div>
            <div class="level-card__header" 
                style="
                    background-color:var(--color-${this.attributes.color});
                    background-image:url(${this.attributes.cover})
                ">
                <div class="level-card__header__name">
                    ${this.attributes.name}
                </div>
                <div class="level-card__header__type">
                    уровень
                </div>
            </div>
            <div class="level-card__body">
                ${this.attributes.parentName
        ? `
                    <div class="level-card__body__parent-level">
                        Все из уровня <b>${this.attributes.parentName}</b>, а также:
                    </div>
                `
        : ''}
                ${this.attributes.benefits.map(b => {
        return `
                    <div class="level-card__body__benefit">
                        ${b}
                    </div>
                    `
    }).join('')
}
               
            </div>
            </div>

            <div class="level-card__action">
                <div class="level-card__action__price">
                    <div class="per_month">
                        в месяц
                    </div>
                    <div class="price" style="color:var(--color-${this.attributes.color})"> 
                        ${this.attributes.price}
                    </div>
                </div>


            </div>
        `
        const btn = new Button({ text: 'Выбрать уровень', color: this.attributes.color })
        element.querySelector('.level-card__action').appendChild(btn.render())
        return element
    }
}
export default LevelCard

const styles = `
.level-card {
    width: 260px;
    height: 420px;
    border-radius:5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 2px 4px 0px #00000033;
}
.level-card__header {
    background-color:var(--color-primary);
    height:120px;
    background-size:cover;
    color:#fff;
    display:flex;
    flex-direction: column;
    justify-content: end;
    padding:5px 10px;
    position:relative;
}
.level-card__header::after {
    content: '';
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.64) 100%);
    z-index: 0;
}

.level-card__header__name {
    font-size:24px;
    font-weight:500;
    z-index: 1;
}
.level-card__header__type {
    font-size:16px;
    z-index: 1;
}
.level-card__body {
    padding:15px;
    font-weight: 300;
    font-size:18px;
    line-height:28px;
    max-height: 200px;
    overflow-y: auto;
}

.level-card__body__benefit {
    
}


.level-card__body__benefit::before {
    content: '';
    width: 12px;
    height: 12px;
    display:inline-block;
    border-radius:100%;
    background: var(--color-warning);
    margin-right:5px;
}
.level-card__action__price {
    text-align:right;
    padding-right:10px;
    margin-bottom:10px;
}

.level-card__action__price .per_month {
    font-size:14px;
    color: #4C4C4C;
}

.level-card__action__price .price {
    font-size:22px;
    color:var(--color-primary);
    font-weight:900;
}
`
const styleElement = document.createElement('style')
styleElement.innerHTML = styles
document.body.appendChild(styleElement)
