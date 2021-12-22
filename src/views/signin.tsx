import app from 'irbis';
import Button from 'ui-library/button';
import Component from 'irbis/component';
import consts from '../consts';
import ErrorPage from './errorpage';
import InputField from 'ui-library/input-field';
import user from '../storage/user';
import * as api from '../api/index';

class SigninView extends Component<never, {
    email: string,
    password: string,
    loading: boolean,
    error: false | string
}> {
    constructor () {
        super();
        this.state.loading = false;
        this.state.error = false;

        this.state.email = '';
        this.state.password = '';
    }

    async submit (e) {
        e.preventDefault();

        const error = this.state.password === '' || this.state.email === '';
        if (error) {
            return (this.state.error = 'Введите логин и пароль');
        }
        this.state.error = '';
        this.state.loading = true;
        let res;
        try {
            res = await api.login({
                email: this.state.email,
                password: this.state.password
            });
        } catch {
            this.state.loading = false;
            this.state.error = 'Ошибка сети';
            return;
        }

        if (res.error) {
            this.state.loading = false;
            this.state.error = 'Неправильный логин и/или пароль';
            return;
        }
        try {
            await user.update();
        } catch {
            this.state.error = 'Неизвестная ошибка';
            this.state.loading = false;
            return;
        }
        this.state.loading = false;
    }

    render () {
        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }
        return (
            <div className="auth-block">
                <h1>
                    {consts.signin.title}
                </h1>

                <form
                    className="auth-card shadow"
                    onSubmit={(e) => {
                        this.submit(e);
                    }}
                >
                    <InputField
                        placeholder="Эл. почта"
                        type="email"
                        value={this.state.email}
                        onInput={(e) => {
                            this.state.email = e.target.value;
                        }}
                    />

                    <InputField
                        placeholder="Пароль"
                        type="password"
                        value={this.state.password}
                        onInput={(e) => {
                            this.state.password = e.target.value;
                        }}
                    />

                    <div className="error">
                        {this.state.error}
                    </div>

                    <Button
                        color="primary"
                        loading={this.state.loading}
                        onClick={(e) => {
                            this.submit(e);
                        }}
                        rounded
                        text="Войти"
                    />
                </form>

                <span className="auth-card__tooltip">
                    {consts.signin.notRegistered}

                    <a
                        href="#"
                        router-go={app.$router.createUrl('signup')}
                    >
                        {consts.signin.signup}
                    </a>
                </span>
            </div>
        );
    }

    created () {
        if (user.user) {
            return app.$router.go(app.$router.createUrl('profile'));
        }
    }
}

export default SigninView;
