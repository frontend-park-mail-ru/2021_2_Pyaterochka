import api from '../api/index.js';
import Component from '../components/basecomponent.js';
import Button from '../components/button.jsx';
import InputField from '../components/input-field.jsx';
import { router } from '../index.js';
import user from '../storage/user.js';

class SignupView extends Component {
    constructor () {
        super();
        const passwordInput = new InputField({
            placeholder: 'Пароль',
            type: 'password',
            validation: [
                (value) => {
                    return value.length > 6 ? null : 'Введите минимум 6 символов';
                },
                (value) => {
                    return value.toLowerCase() !== value
                        ? null
                        : 'Пароль должен сдержать хоть одну заглавную букву';
                }
            ]
        });

        this.form = [
            new InputField({
                placeholder: 'Имя',
                validation: [
                    (value) => {
                        return value !== '' ? null : 'Поле не должно быть пустым';
                    },
                    (value) => {
                        return length < 255 ? null : 'Имя слишком длинное';
                    }
                ]
            }),
            new InputField({
                placeholder: 'Эл. почта',
                type: 'email',
                validation: [
                    (email) => {
                        const re =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        const isValid = re.test(String(email).toLowerCase());

                        return isValid ? null : 'Email не валиден';
                    }
                ]
            }),
            passwordInput,
            new InputField({
                placeholder: 'Подтвердите пароль',
                type: 'password',
                validation: [
                    (value) => {
                        return value !== '' ? null : 'Поле не должно быть пустым';
                    },
                    (value) => {
                        return passwordInput.getValue() === value
                            ? null
                            : 'Пароли не совпадают';
                    }
                ]
            })
        ];
    }

    async submit () {
        const errors = Math.max(...this.form.map((e) => e.validate().length));
        if (errors) return;

        await api.register({
            username: this.form[0].getValue(),
            email: this.form[1].getValue(),
            password: this.form[2].getValue()
        });
    }

    render () {
        return (
            <div className="auth-block">
                <h1> Регистрация </h1>
                <div className="auth-card shadow">
                    {this.form.map((c) => c.renderReactive())}
                    <Button
                        text="Зарегистрироваться"
                        color="primary"
                        rounded={true}
                        onclick={() => {
                            this.submit();
                        }}
                    />
                </div>
                <span className="auth-card__tooltip">
                    Уже есть аккаунт? <a href="#" router-go="/signin">Войти</a>
                </span>
            </div>
        );
    }

    created () {
        if (user.user) return router.go('/');
    }
}

export default SignupView;
