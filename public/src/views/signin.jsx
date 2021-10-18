import api from '../api/index';
import Component from '../components/basecomponent';
import Button from '../components/button';
import InputField from '../components/input-field';
import { router } from '../index';
import user from '../storage/user';

class SigninView extends Component {
    constructor () {
        super();
        this.attributes.loading = false;
        this.attributes.error = false;

        this.form = [
            new InputField({
                placeholder: 'Эл. почта',
                type: 'email',
                validation: []
            }),
            new InputField({
                placeholder: 'Пароль',
                type: 'password',
                validation: []
            })
        ];
    }

    async submit () {
        const error = this.form.reduce(
            (status, form) => status || form.getValue() === '',
            false
        );
        if (error) return (this.attributes.error = 'Введите логин и пароль');
        this.attributes.error = '';
        this.attributes.loading = true;
        const res = await api.login({
            email: this.form[0].getValue(),
            password: this.form[1].getValue()
        });
        if (res.error) {
            this.attributes.loading = false;
            this.attributes.error = 'Неправильный логин и/или пароль';
        }
        user.update();
        this.attributes.loading = false;
    }

    render () {
        return (
            <div className="auth-block">
                <h1> Войти </h1>
                <form
                    className="auth-card shadow"
                    onSubmit={() => {
                        this.submit();
                    }}
                >
                    {this.form.map((c) => c.render())}
                    {this.attributes.error
                        ? (
                            <div className="error">{this.attributes.error}</div>
                        )
                        : (
                            ''
                        )}

                    <Button
                        text="Войти"
                        color="primary"
                        rounded={true}
                        loading={this.attributes.loading}
                        onclick={() => {
                            this.submit();
                        }}
                    />
                </form>
                <span className="auth-card__tooltip">
                    Впервые на Patreon?{' '}
                    <a href="#" router-go="/signup">
                        Зарегистрируйтесь
                    </a>
                </span>
            </div>
        );
    }

    created () {
        if (user.user) return router.go('/');

        this.form = [
            new InputField({
                placeholder: 'Эл. почта',
                type: 'email',
                validation: []
            }),
            new InputField({
                placeholder: 'Пароль',
                type: 'password',
                validation: []
            })
        ];
    }
}

export default SigninView;
