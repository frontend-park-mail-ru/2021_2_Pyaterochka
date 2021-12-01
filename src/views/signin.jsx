import api from '../api/index';
import Component from 'irbis/component';
import Button from 'ui-library/button';
import InputField from 'ui-library/input-field';
import consts from '../consts';
import app from 'irbis';
import user from '../storage/user';
import ErrorPage from './errorpage';

class SigninView extends Component {
    constructor () {
        super();
        this.attributes.loading = false;
        this.attributes.error = false;

        this.state.email = '';
        this.state.password = '';
    }

    async submit (e) {
        e.preventDefault();

        const error = this.state.password === '' || this.state.email === '';
        if (error) {
            return (this.attributes.error = 'Введите логин и пароль');
        }
        this.attributes.error = '';
        this.attributes.loading = true;
        const res = await api.login({
            email: this.state.email,
            password: this.state.password
        });
        if (res.error) {
            this.attributes.loading = false;
            this.attributes.error = 'Неправильный логин и/или пароль';
            return;
        }
        user.update();
        this.attributes.loading = false;
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
                        onInput={(e) => { this.state.email = e.target.value; }}
                    />

                    <InputField
                        placeholder="Пароль"
                        type="password"
                        value={this.state.password}
                        onInput={(e) => { this.state.password = e.target.value; }}
                    />

                    <div className="error">
                        {this.attributes.error}
                    </div>

                    <Button
                        color="primary"
                        loading={this.attributes.loading}
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
