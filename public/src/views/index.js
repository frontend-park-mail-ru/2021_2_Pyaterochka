import Component from '../components/basecomponent.js'
import Button from '../components/button.js'
import InputField from '../components/input-field.js'
import LevelCard from '../components/level-card.js'
import Navbar from '../components/navbar.js'

class IndexView extends Component {
    render() {
        const element = document.createElement('div')
        element.className = 'container'
        element.innerHTML = `
            <h1 class="text-center">Компоненты</h1>
            <style>
            .container {
                width:600px;
                max-width:100%;
                margin:auto;
                margin-top:50px;
            }
            </style>
        `

        const components = [
            new Navbar(),
            new Navbar({ user: { username: "Person", avatar: "https://thispersondoesnotexist.com/image" } }),

            new LevelCard({
                name: "Профессионал",
                parentName: "Геймер",
                cover: "https://wallpaperscave.ru/images/original/18/01-10/abstract-colors-8119.jpg",
                benefits: [
                    "Доступ к реализации алгоритмов", "Безлимитное мыло из Анапы"
                ],
                price: "10 $"
            }),
            new LevelCard({
                name: "Геймер",
                cover: "https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg",
                benefits: [
                    "Доступ к реализации алгоритмов", "Безлимитное мыло из Анапы"
                ],
                price: "10 $",
                color:"accent"
            }),

            new LevelCard({
                name: "Без обложки и много преимуществ",
                cover: null,
                benefits: [
                    "Доступ к реализации алгоритмов",
                    "Безлимитное мыло из Анапы",
                    "Безлимитное мыло из Анапы",
                    "Безлимитное мыло из Анапы",
                    "Безлимитное мыло из Анапы",
                ],
                price: "10 $",
                color:"success"
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
            element.appendChild(component.render())
            element.appendChild(document.createElement("p"))

        })
        return element
    }
}

export default IndexView
