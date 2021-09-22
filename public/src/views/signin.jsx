import api from '../api/index.js';
import Component from '../components/basecomponent.js';
import Button from '../components/button.jsx';
import InputField from '../components/input-field.jsx';
import { router } from '../index.js';
import user from '../storage/user.js';

class SigninView extends Component {
    constructor () {
        super();
        this.form = [
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
            new InputField({
                placeholder: 'Пароль',
                type: 'password',
                validation: [
                    (value) => {
                        return value.length ? null : 'Поле не должно быть пустым';
                    }
                ]
            })
        ];
    }

    async submit () {
        const errors = Math.max(...this.form.map((e) => e.validate().length));
        if (errors) return;
        await api.login({
            email: this.form[0].getValue(),
            password: this.form[1].getValue()
        });

        user.update();
        router.go('/');
    }

    render () {
        return (
            <div className="auth-block">
                <h1> Войти </h1>
                <div className="auth-card shadow">
                    {this.form.map((c) => c.renderReactive())}
                    <Button
                        text="Войти"
                        color="primary"
                        rounded={true}
                        onclick={() => {
                            this.submit();
                        }}
                    />
                </div>
                <span className="auth-card__tooltip">
                    Впервые на Patreon?
                    <a href="#" router-go="/signup">
                        Зарегистрируйтесь
                    </a>
                </span>
            </div>
        );
    }
}

export default SigninView;
