import Component from '../components/basecomponent.js'
import Button from '../components/button.js'
import CreatorCard from '../components/creator-card.js'
import LevelCard from '../components/level-card.js'
import LockMessage from '../components/lock-message.js'
import PostCard from '../components/post-card.js'

class CreatorView extends Component {
    constructor () {
        super()
        this.attributes.creator = null
        this.attributes.levels = []
        this.attributes.posts = []
    }

    render () {
        const element = document.createElement('div')

        if (!this.attributes.creator) {
            element.innerHTML = `
            <div class="text-center">
                <div class="spinner"></div>
            </div>
            `
            return element
        }

        element.innerHTML = `
            <div class="creator-cover" style="background-image:url(${this.attributes.creator.cover})">
            </div>

            <div class="creator-card"></div>

            <div class="level-card-container"></div>

            <div class="post-container"></div>
        `

        const creatorCardAttr = Object.assign(this.attributes.creator)
        creatorCardAttr.shadow = true
        const creatorCard = new CreatorCard(creatorCardAttr)
        element.querySelector('.creator-card').replaceWith(creatorCard.renderReactive())

        const levelCardContainer = element.querySelector('.level-card-container')
        this.attributes.levels.map(card => new LevelCard(card)).forEach(card => {
            levelCardContainer.appendChild(card.renderReactive())
        })

        const postCardContainer = element.querySelector('.post-container')
        this.attributes.posts.map(card => new PostCard(card)).forEach(card => {
            postCardContainer.appendChild(card.renderReactive())
        })

        const lockMessage = new LockMessage(
            {
                text: 'Стань патроном, чтобы продолжить наслаждаться работами автора'
            },
            new Button({ text: 'Стать патроном', color: 'primary' })
        )

        element.appendChild(lockMessage.renderReactive())
        return element
    }

    created () {
        this.attributes.creator = null
        setTimeout(() => {
            this.attributes.creator = {
                id: 0,
                name: 'IU7-memes',
                description: 'создает мемы из закулисий цирка',
                avatar: 'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album',
                cover: 'https://sun9-32.userapi.com/impf/adHV39RxzhK4WR5F5jATKuoEAOJ1bJrbpl_mqg/cbYQA5UNtlg.jpg?size=795x200&quality=95&crop=0,0,1590,400&sign=2ffcff16ba49a336f42b603af92122d4&type=cover_group'
            }

            this.attributes.levels = [
                {
                    name: 'Новичок',
                    cover: null,
                    benefits: [
                        'Доступ к реализации алгоритмов',
                        'Безлимитное мыло из Анапы'
                    ],
                    price: '10 ₽',
                    color: 'accent'
                },
                {
                    name: 'Геймер',
                    cover: null,
                    parentName: 'Новичок',
                    benefits: [
                        'Доступ к реализации алгоритмов',
                        'Безлимитное мыло из Анапы'
                    ],
                    price: '10 ₽',
                    color: 'primary'
                },
                {
                    name: 'Профессионал',
                    cover: null,
                    parentName: 'Геймер',
                    benefits: [
                        'Доступ к реализации алгоритмов',
                        'Безлимитное мыло из Анапы'
                    ],
                    price: '10 ₽',
                    color: 'success'
                }
            ]

            this.attributes.posts = [
                {
                    title: 'Новый выпуск игрового ролика о невероятных машинах нашего времени',
                    published: new Date(new Date() - 60 * 1000 * 60 * 5),
                    views: 10000,
                    likes: 5000,
                    opened: true,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
                    level: 'Профессионал',
                    image: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
                },
                {
                    title: 'Новый выпуск игрового ролика о невероятных машинах нашего времени',
                    published: new Date(new Date() - 60 * 1000 * 60 * 5),
                    views: 10000,
                    likes: 5000,
                    opened: false,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
                    level: 'Профессионал',
                    image: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
                }
            ]
        }, 1000)
    }
}

export default CreatorView

const styles = `
.creator-cover + .creator-card {
    margin-top:-120px;
}
.creator-cover {
    height:256px;
    background-size:cover;
    background-position:center;
    position: sticky;
    top: -50px;
    z-index: -1;
}
.level-card-container {
    background:#fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.level-card-container > * {
    margin:20px;
}

.post-container {
    background:#fff;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-bottom: 20px;
}
.post-container > *{
    margin:10px;
}

.lock-message {
    max-width: 500px;
    margin:auto;
}
.creator-card__header, .creator-card__description {
    width:100%;
    background:#fff;
    // box-shadow: -10px 0 40px 5px #fff;
}
.creator-card__header {
    border-radius:20px 20px 0 0;
    padding-top:30px;
    margin-top:-30px;
    z-index:0;
}
.creator-card img {
    z-index:1;
}
`
const styleElement = document.createElement('style')
styleElement.innerHTML = styles
document.body.appendChild(styleElement)
