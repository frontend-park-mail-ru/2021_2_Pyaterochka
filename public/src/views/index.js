import Component from '../components/basecomponent.js'
import Button from '../components/button.js'
import CreatorCard from '../components/creator-card.js'
import Footer from '../components/footer.js'
import InputField from '../components/input-field.js'
import LevelCard from '../components/level-card.js'
import LockMessage from '../components/lock-message.js'
import Navbar from '../components/navbar.js'
import PostCard from '../components/post-card.js'
import ProfileCard from '../components/profile-card.js'
import Skeleton from '../components/skeleton.js'
import Spinner from '../components/spinner.js'
import Step from '../components/step.js'
import Comment from '../components/comment.js'

class IndexView extends Component {
    constructor () {
        super()
        this.attributes.cps = [
            {
                name: 'Шапка',
                data: [
                    {
                        name: 'Не авторизирован',
                        component: new Navbar()
                    },
                    {
                        name: 'Авторизирован',
                        component: new Navbar({ user: { username: 'Person', avatar: 'https://thispersondoesnotexist.com/image' } })
                    }
                ]
            },
            {
                name: 'Подвал',
                data: [
                    {
                        name: '',
                        component: new Footer()
                    }
                ]
            },
            {
                name: 'Карточка профиля',
                data: [
                    {
                        name: 'Без слота',
                        component: new ProfileCard({
                            username: 'HenSI.Pro2929',
                            supportCount: 15,
                            avatar: 'https://thispersondoesnotexist.com/image'
                        })
                    },
                    {
                        name: 'Со слотом',
                        component: new ProfileCard({
                            username: 'HenSI.Pro2929',
                            supportCount: 15,
                            avatar: 'https://thispersondoesnotexist.com/image'
                        }, new Button({ text: 'Редактировать профиль', color: 'primary' }))
                    }
                ]
            },
            {
                name: 'Скелетон',
                data: [
                    {
                        name: 'Прямоугольник',
                        component: new Skeleton()
                    },
                    {
                        name: 'Текст',
                        component: new Skeleton({ type: 'text' })
                    },
                    {
                        name: 'Круг',
                        component: new Skeleton({ type: 'circle', height: 100 })
                    }
                ]
            },
            {
                name: 'Спинер',
                data: [
                    {
                        name: '',
                        component: new Spinner()
                    }
                ]
            },
            {
                name: 'Карточка автора',
                data: [

                    {
                        name: 'Без тени',
                        component: new CreatorCard(
                            {
                                name: 'IU7-memes',
                                description: 'создает мемы из закулисий цирка',
                                avatar: 'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                            }
                        )
                    },
                    {
                        name: 'С тенью',
                        component: new CreatorCard(
                            {
                                name: 'IU7-memes',
                                description: 'создает мемы из закулисий цирка',
                                shadow: true,
                                avatar: 'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                            }
                        )
                    }
                ]
            },
            {
                name: 'Сообщение с замочком',
                data: [
                    {
                        name: 'Без слота',
                        component: new LockMessage(
                            {
                                text: 'Профи'
                            }
                        )
                    },
                    {
                        name: 'Со слотом',
                        component: new LockMessage(
                            {
                                text: 'Стань патроном, чтобы продолжить наслаждаться работами автора'
                            },
                            new Button({ text: 'Стать патроном', color: 'primary' })
                        )
                    }

                ]
            },

            {
                name: 'Карточка записи',
                data: [
                    {
                        name: 'Доступная',
                        component: new PostCard({
                            title: 'Новый выпуск игрового ролика о невероятных машинах нашего времени',
                            published: new Date(new Date() - 60 * 1000 * 5),
                            views: 10000,
                            likes: 5000,
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
                            level: 'Профессионал',
                            image: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
                        })
                    },
                    {
                        name: 'Закрытая',
                        component: new PostCard({
                            title: 'Новый выпуск игрового ролика о невероятных машинах нашего времени',
                            published: new Date(new Date() - 60 * 1000 * 60 * 5),
                            views: 10000,
                            likes: 5000,
                            opened: false,
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
                            level: 'Профессионал',
                            image: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
                        })
                    }
                ]
            },

            {
                name: 'Комментарий',
                data: [
                    {
                        name: '',
                        component: new Comment({
                            user: { username: 'Person', avatar: 'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album' },
                            published: new Date(new Date() - 60 * 1000 * 5),
                            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti quod iure necessitatibus doloribus magni assumenda quasi, a maiores repellendus et, quidem sit vitae totam fugiat ut voluptas libero dolor perspiciatis.'
                        })
                    }
                ]
            },

            {
                name: 'Шаг',
                data: [
                    {
                        name: 'Шаг 1',
                        component:
                            new Step({
                                number: 1,
                                name: 'Настройте свою страницу и уровни подписки',
                                description: '<a router-go="/signup" class="step-content__description_link">Зарегистрируйтесь</a> и настройте вашу страницу на Patreon. Продумайте уровни подписки, от самого дешевого до привилегированного. Каждый уровень предлагает особые условия и преимущества вашим фанатам. Подумайте, что вы реально сможете давать регулярно и чему будут рады ваши фанаты. Не усложняйте!'
                            })
                    },
                    {
                        name: 'Шаг 2',
                        component:
                            new Step({
                                number: 2,
                                name: 'Расскажите своим подписчикам, что вы теперь есть на Patreon',
                                description: 'Сделайте посты во всех ваших основных соц.сетях, чтобы оповестить всех ваших подписчиков. Patreon - это место, где рождаются особые отношения между вами и вашими самыми активными фанатами - теми, кто хочет чего-то большего, чем просто следить за вами в социальных сетях.'
                            })
                    },
                    {
                        name: 'Шаг 3',
                        component:
                            new Step({
                                number: 3,
                                name: 'Будьте активны и прислушивайтесь к вашим подписчикам',
                                description: 'Регулярно делитесь обновлениями на Patreon, предоставляйте преимущества. Цель - чтобы подписчики были с вами долго и их число стабильно росло. Также поддерживайте импульс, периодически напоминая в социальных сетях о вашем Boosty, чтобы привлечь больше поклонников к подписке.'
                            })
                    }
                ]
            },

            {
                name: 'Карточка уровня подписки',
                data: [
                    {
                        name: 'С родителем',
                        component: new LevelCard({
                            name: 'Профессионал',
                            parentName: 'Геймер',
                            cover: 'https://wallpaperscave.ru/images/original/18/01-10/abstract-colors-8119.jpg',
                            benefits: [
                                'Доступ к реализации алгоритмов', 'Безлимитное мыло из Анапы'
                            ],
                            price: '10 $'
                        })
                    },
                    {
                        name: 'Без родителя',
                        component: new LevelCard({
                            name: 'Геймер',
                            cover: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg',
                            benefits: [
                                'Доступ к реализации алгоритмов', 'Безлимитное мыло из Анапы'
                            ],
                            price: '10 $',
                            color: 'accent'
                        })
                    },
                    {
                        name: 'Без обложки и много преимуществ',
                        component: new LevelCard({
                            name: 'Без обложки и много преимуществ',
                            cover: null,
                            benefits: [
                                'Доступ к реализации алгоритмов',
                                'Безлимитное мыло из Анапы',
                                'Безлимитное мыло из Анапы',
                                'Безлимитное мыло из Анапы',
                                'Безлимитное мыло из Анапы'
                            ],
                            price: '10 ₽',
                            color: 'success'
                        })
                    }
                ]
            },
            {
                name: 'Поле ввода',
                data: [
                    {
                        name: '',
                        component: new InputField({ placeholder: 'Placeholder', validation: [(v) => v === '' ? null : 'Поле не должно быть пустым'] })
                    }
                ]
            },
            {
                name: 'Кнопка',
                data: [
                    ...['default', 'primary', 'success', 'grey', 'warning', 'accent']
                        .map((color) =>
                            ({
                                name: color,
                                component: new Button({ text: 'Button ' + color, color: color })
                            })),
                    ...['default', 'primary', 'success', 'grey', 'warning', 'accent']
                        .map((color) =>
                            ({
                                name: color + ' rounded',
                                component: new Button({ text: 'Button ' + color, color: color, rounded: true })
                            }))

                ]
            }
        ]

        this.attributes.cps.forEach((c) => { c.active = 0 })
    }

    render () {
        const element = document.createElement('div')
        element.className = 'container'
        element.innerHTML = `
            <h1 class="text-center">Страницы</h1>
            <div>
                <a router-go="/creator"> Страница автора </a>
                <a router-go="/profile"> Профиль </a>
                <a router-go="/404"> Страница ошибки </a>
            </div>
            <h1 class="text-center">Компоненты</h1>
            <div class="components-map"> </div>

            <style>
            .container {
                width:1000px;
                max-width:100%;
                margin:auto;
                margin-top:50px;
            }
            .component-wrapper__variants{
                display:flex;
                justify-content: left;
                flex-wrap:wrap;
            }
            .component-wrapper__variants > .btn, 
            .components-map > .btn{
                width:auto;
                margin: 0 10px 0 0;
            },
            .component-wrapper {
                margin-bottom: 60px;
            }
            .component-wrapper__component {
                padding:20px;
                border: solid 2px #000;
            }
            .components-map {
                background: #fff;
                position: sticky;
                top: 0;
                z-index: 1000;
                overflow: auto;
                display: block;
                white-space: nowrap;
                width: 100%;
            }
            .components-map > .btn {
                display: inline;
            }
            </style>
        `

        this.attributes.cps.forEach((info, ii) => {
            const component = info.data[info.active].component
            const componentWrapper = document.createElement('div')
            componentWrapper.className = 'component-wrapper'
            componentWrapper.innerHTML = `
                <h2>${info.name}</h2>
                ${info.data.length > 1 ? 'Варианты компонента:' : ''}
                <div class='component-wrapper__variants'>
                </div>
                <div class='component-wrapper__component'>
                
                </div>
                Описание атрибутов:
                <div class='component-wrapper__table'>
                
                </div>
            `
            if (info.data.length > 1) {
                info.data.forEach((c, i) => {
                    componentWrapper.querySelector('.component-wrapper__variants').appendChild(new Button({
                        text: c.name,
                        onclick: () => {
                            this.attributes.cps[ii].active = i
                            this.attributes.cps = this.attributes.cps
                        },
                        color: info.active === i ? 'primary' : 'default'
                    }).renderReactive())
                })
            }

            const table = document.createElement('table')
            table.innerHTML += `<tr><th>Component name</th><td>${component.constructor.name}</td></tr>`
            Object.keys(component.attributes).forEach(key => {
                table.innerHTML += `<tr><td>${key}</td><td>${component.attributes[key]}</td></tr>`
            })
            table.innerHTML += `<tr><td>SLOT</td><td>${component.slot}</td></tr>`

            componentWrapper.querySelector('.component-wrapper__table').appendChild(table)
            componentWrapper.querySelector('.component-wrapper__component').appendChild(component.renderReactive())
            element.appendChild(componentWrapper)

            element.querySelector('.components-map').appendChild(
                new Button({
                    text: info.name,
                    onclick: () => {
                        window.scrollTo(0, componentWrapper.offsetTop - 100)
                    }
                }).renderReactive()
            )
        })
        return element
    }
}

export default IndexView
