
import Component from '../../../components/basecomponent';
import Button from '../../../components/button';
import InputField from '../../../components/input-field';
import user from '../../../storage/user';

class ProfileEditSecure extends Component {
    constructor () {
        super();
        this.attributes.error = null;

        const passwordInput = new InputField({
            placeholder: 'Новый пароль',
            type: 'password',
            validation: [
                (value) => {
                    return value.length >= 6 ? null : 'Введите минимум 6 символов';
                }
            ]
        });

        this.form = [
            new InputField({
                placeholder: 'Старый пароль',
                type: 'password',
                validation: []
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

    render () {
        if (!user.user) return <div></div>;
        return <div className="profile-edit--little-width">

            <p className="profile-edit__subtitle">
                Смена пароля
            </p>

            {this.form.map((c) => c.renderReactive())}
            <div className="error">{this.attributes.error}</div>

            <Button
                text="Сменить пароль"
                color="primary"
                onClick={(e) => {
                    // this.submit(e);
                }}
            />

        </div>;
    }
}

export default ProfileEditSecure;
