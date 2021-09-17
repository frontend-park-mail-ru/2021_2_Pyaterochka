import Component from '../components/basecomponent.js'
import InputField from '../components/input-field.js'

class SigninView extends Component {
    render () {
        const element = document.createElement('div')
        element.className = 'auth-block'
        element.innerHTML = `
            <h1> Войти </h1>
            <div class="auth-card shadow">
               
            </div>
            <style> 
                .auth-block {
                   margin:auto;
                   width:400px;
                   text-align:center; 
                }
                .auth-card {
                    border-radius:10px;
                    padding:20px;
                }               

            </style>
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
                        return value.length > 6 ? null : 'Пароль должен быть больше 6 символов'
                    },
                    (value) => {
                        return value.toLowerCase() !== value ? null : 'Пароль должен сдержать хоть одну заглавную букву'
                    }
                ]
            })
        ]

        form.forEach((field) => {
            element.querySelector('.auth-card').appendChild(field.render())
        })

        return element
    }
}

export default SigninView
