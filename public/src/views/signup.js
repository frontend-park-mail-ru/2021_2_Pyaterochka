import Component from '../components/basecomponent.js'
import Button from '../components/button.js'
import InputField from '../components/input-field.js'

class SignupView extends Component {
    render () {
        const element = document.createElement('div')
        element.className = 'auth-block'
        element.innerHTML = `
            <h1> Регистрация </h1>
            <div class="auth-card shadow">
               
            </div>
            <style> 
                .auth-block {
                   margin:auto;
                   width:400px;
                   text-align:center; 
                }
                .auth-card {
                    padding:20px;
                }               

            </style>
        `
        const passwordInput = new InputField({
            placeholder: 'Пароль',
            type: 'password',
            validation: [
                (value) => {
                    return value.length > 6 ? null : 'Введите минимум 6 символов'
                },
                (value) => {
                    return value.toLowerCase() !== value ? null : 'Пароль должен сдержать хоть одну заглавную букву'
                }
            ]
        })

        const form = [
            new InputField({
                placeholder: 'Имя',
                validation: [
                    (value) => {
                        return value !== '' ? null : 'Поле не должно быть пустым'
                    },
                    (value) => {
                        return length < 255 ? null : 'Имя слишком длинное'
                    }
                ]
            }),
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
            passwordInput,
            new InputField({
                placeholder: 'Подтвердите пароль',
                type: 'password',
                validation: [
                    (value) => {
                        return value !== '' ? null : 'Поле не должно быть пустым'
                    },
                    (value) => {
                        return passwordInput.getValue() === value ? null : 'Пароли не совпадают'
                    }
                ]
            })
        ]

        form.forEach((field) => {
            element.querySelector('.auth-card').appendChild(field.render())
        })

        const btn = new Button({
            text: 'Зарегистрироваться',
            color: 'primary',
            rounded: true,
            onclick: () => {
                const errors = Math.max(...form.map((e) => e.validate().length))
                if (errors) return
                alert('Валидация прошла')
            }
        })
        element.querySelector('.auth-card').appendChild(btn.render())

        return element
    }
}

export default SignupView
