import Component from '../components/basecomponent.js'
import Button from '../components/button.js'
import CreatorCard from '../components/creator-card.js'
import InputField from '../components/input-field.js'
import LevelCard from '../components/level-card.js'
import LockMessage from '../components/lock-message.js'
import Navbar from '../components/navbar.js'
import PostCard from '../components/post-card.js'
import Step from '../components/steps.js'

class IndexView extends Component {
    render () {
        const element = document.createElement('div')
        element.className = 'container'
        element.innerHTML = `
            <h1 class="text-center">Страницы</h1>
            <div>
                <a router-go="/creator"> Страница автора </a>
            </div>
            <h1 class="text-center">Компоненты</h1>
            <style>
            .container {
                width:1240px;
                max-width:100%;
                margin:auto;
                margin-top:50px;
            }
            </style>
        `

        const components = [
            new Navbar(),
            new Navbar({ user: { username: 'Person', avatar: 'https://thispersondoesnotexist.com/image' } }),
            new CreatorCard(
                {
                    name: 'IU7-memes',
                    description: 'создает мемы из закулисий цирка',
                    avatar: 'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                }
            ),
            new CreatorCard(
                {
                    name: 'IU7-memes',
                    description: 'создает мемы из закулисий цирка',
                    shadow: true,
                    avatar: 'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                }
            ),
            new LockMessage(
                {
                    text: 'Стань патроном, чтобы продолжить наслаждаться работами автора'
                },
                new Button({ text: 'Стать патроном', color: 'primary' })
            ),
            new PostCard({
                title: 'Новый выпуск игрового ролика о невероятных машинах нашего времени',
                published: new Date(new Date() - 60 * 1000 * 5),
                views: 10000,
                likes: 5000,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
                level: 'Профессионал',
                image: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
            }),
            new PostCard({
                title: 'Новый выпуск игрового ролика о невероятных машинах нашего времени',
                published: new Date(new Date() - 60 * 1000 * 60 * 5),
                views: 10000,
                likes: 5000,
                opened: false,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
                level: 'Профессионал',
                image: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
            }),

            new LevelCard({
                name: 'Профессионал',
                parentName: 'Геймер',
                cover: 'https://wallpaperscave.ru/images/original/18/01-10/abstract-colors-8119.jpg',
                benefits: [
                    'Доступ к реализации алгоритмов', 'Безлимитное мыло из Анапы'
                ],
                price: '10 $'
            }),
            new LevelCard({
                name: 'Геймер',
                cover: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg',
                benefits: [
                    'Доступ к реализации алгоритмов', 'Безлимитное мыло из Анапы'
                ],
                price: '10 $',
                color: 'accent'
            }),

            new LevelCard({
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
            }),

            new Step({
                number: '1',
                name: 'Настройте свою страницу и уровни подписки',
                description: '<a href="#" class="step-content__description_link">Зарегистрируйтесь</a> и настройте вашу страницу на Patreon. Продумайте уровни подписки, от самого дешевого до привилегированного. Каждый уровень предлагает особые условия и преимущества вашим фанатам. Подумайте, что вы реально сможете давать регулярно и чему будут рады ваши фанаты. Не усложняйте!'
            }),

            new Step({
                number: '2',
                name: 'Расскажите своим подписчикам, что вы теперь есть на Patreon',
                description: 'Сделайте посты во всех ваших основных соц.сетях, чтобы оповестить всех ваших подписчиков. Patreon - это место, где рождаются особые отношения между вами и вашими самыми активными фанатами - теми, кто хочет чего-то большего, чем просто следить за вами в социальных сетях.'
            }),

            new InputField({ placeholder: 'Placeholder', validation: [(v) => v === '' ? null : 'Поле не должно быть пустым'] }),
            ...['default', 'primary', 'success', 'grey', 'warning', 'accent'].map((color) => new Button({ text: 'Button ' + color, color: color })),
            ...['default', 'primary', 'success', 'grey', 'warning', 'accent'].map((color) => new Button({ text: 'Button ' + color, color: color, rounded: true }))
        ]

        components.forEach((component) => {
            const table = document.createElement('table')
            table.innerHTML += `<tr><th>Component name</th><td>${component.constructor.name}</td></tr>`
            Object.keys(component.attributes).forEach(key => {
                table.innerHTML += `<tr><td>${key}</td><td>${component.attributes[key]}</td></tr>`
            })
            element.appendChild(table)
            element.appendChild(component.renderReactive())
            element.appendChild(document.createElement('br'))
            element.appendChild(document.createElement('br'))
            element.appendChild(document.createElement('br'))
        })
        return element
    }
}

export default IndexView
