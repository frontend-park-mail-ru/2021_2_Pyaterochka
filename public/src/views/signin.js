import api from '../api/index.js'
import Component from '../components/basecomponent.js'
import Button from '../components/button.js'
import InputField from '../components/input-field.js'
import { router } from '../index.js'
import user from '../storage/user.js'

class SigninView extends Component {
    render () {
        const element = document.createElement('div')
        element.className = 'auth-block'
        element.innerHTML = `
            <h1> Войти </h1>
            <div class="auth-card shadow"></div>
            <span class="auth-card__tooltip">
                Впервые на Patreon? <a href="#" router-go='/signup'>Зарегистрируйтесь</a>
            </span>
        `
        const form = [
            new InputField({
                placeholder: 'Эл. почта',
                type: 'email',
                validation: [
                    (email) => {
                        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        const isValid = re.test(String(email).toLowerCase())

                        return isValid ? null : 'Email не валиден'
                    }
                ]
            }),
            new InputField({
                placeholder: 'Пароль',
                type: 'password',
                validation: [
                    (value) => {
                        return value.length ? null : 'Поле не должно быть пустым'
                    }
                ]
            })
        ]

        form.forEach((field) => {
            element.querySelector('.auth-card').appendChild(field.render())
        })

        const btn = new Button({
            text: 'Войти',
            color: 'primary',
            rounded: true,
            onclick: async () => {
                const errors = Math.max(...form.map((e) => e.validate().length))
                if (errors) return
                await api.login({
                    email: form[0].getValue(),
                    password: form[1].getValue()
                })

                user.update()
                router.go('/')
            }
        })
        element.querySelector('.auth-card').appendChild(btn.render())

        return element
    }
}

export default SigninView
