import app from 'irbis';
import Button from 'ui-library/button';
import Component from 'irbis/component';
import consts from '../consts';
import ErrorPage from './errorpage';
import InputField from 'ui-library/input-field';
import user from '../storage/user';
import * as api from '../api/index';

class SignupView extends Component<never, {
    error: string | false,
    loading?: boolean
}> {
    form: InputField[];

    constructor () {
        super();
        this.state.error = null;

        this.form = [
            new InputField(),
            new InputField(),
            new InputField(),
            new InputField()
        ];

        this.form[0].setProps({
            placeholder: 'Никнейм',
            validation: [
                (value) => {
                    return value !== '' ? null : 'Поле не должно быть пустым';
                },
                (value) => {
                    return value.length < 255 ? null : 'Никнейм слишком длинный';
                }
            ]
        });

        this.form[1].setProps({
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
        });
        this.form[2].setProps({
            placeholder: 'Пароль',
            type: 'password',
            validation: [
                (value) => {
                    return value.length >= 6 ? null : 'Введите минимум 6 символов';
                }
            ]
        });
        this.form[3].setProps({
            placeholder: 'Подтвердите пароль',
            type: 'password',
            validation: [
                (value) => {
                    return value !== '' ? null : 'Поле не должно быть пустым';
                },
                (value) => {
                    return this.form[2].getValue() === value
                        ? null
                        : 'Пароли не совпадают';
                }
            ]
        });

        this.form.forEach((f) => f.renderReactive());
    }

    async submit (e) {
        e.preventDefault();

        const errors = Math.max(...this.form.map((e) => e.validate().length));
        if (errors) return;

        this.state.error = null;
        this.state.loading = true;
        let res;

        try {
            res = await api.register({
                username: this.form[0].getValue(),
                email: this.form[1].getValue(),
                password: this.form[2].getValue()
            });
        } catch {
            this.state.loading = false;
            this.state.error = 'Ошибка сети';
            return;
        }
        this.state.loading = false;

        if (res.error) {
            if (res.data.error === 'user already exist') {
                this.state.error = 'Пользователь с данной почтой уже существует.';
                return;
            }
            if (res.data.error === 'nickname already exist') {
                this.state.error = 'Пользователь с данным никнеймом уже существует.';
                return;
            }
            this.state.error = res.data.error;
            return;
        }
        this.state.loading = true;

        await api.login({
            email: this.form[1].getValue(),
            password: this.form[2].getValue()
        });

        user.update();
        this.state.loading = false;
    }

    render () {
        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }

        return (
            <div className="auth-block">
                <h1>
                    {consts.signup.title}
                </h1>

                <form
                    className="auth-card shadow"
                    onSubmit={(e) => {
                        this.submit(e);
                    }}
                >
                    {this.form.map((c) => c.vdom)}

                    {
                        this.state.error
                            ? <div className="error">
                                {this.state.error}
                            </div>
                            : ''
                    }

                    <Button
                        color="primary"
                        loading={this.state.loading}
                        onClick={(e) => {
                            this.submit(e);
                        }}
                        rounded
                        text="Зарегистрироваться"
                    />
                </form>

                <span className="auth-card__tooltip">

                    {consts.signup.alreadyRegistered}

                    <a
                        href="#"
                        router-go={app.$router.createUrl('signin')}
                    >
                        {consts.signup.signin}
                    </a>
                </span>
            </div>
        );
    }

    created () {
        if (user.user) return app.$router.go(app.$router.createUrl('profile'));
    }
}

export default SignupView;
