
import api from '../../../api';
import Component from '../../../components/basecomponent';
import Button from '../../../components/button';
import InputField from '../../../components/input-field';
import Skeleton from '../../../components/skeleton';
import TimeAgoComponent from '../../../components/time-ago';
import app from '../../../core/app';
import user from '../../../storage/user';

class ProfileEditSecure extends Component {
    constructor () {
        super();
        this.attributes.error = null;
        this.attributes.loading = false;
        this.attributes.passwordChanged = false;

        const passwordInput = new InputField({
            placeholder: 'Новый пароль',
            type: 'password',
            validation: [
                (value) => {
                    return value.length >= 6 ? null : 'Введите минимум 6 символов';
                },
                (value) => {
                    return this.form[0].getValue() !== value ? null : 'Старый и новый пароль должны различаться';
                }
            ]
        });

        this.form = [
            new InputField({
                placeholder: 'Старый пароль',
                type: 'password',
                validation: [
                    (v) => v !== '' ? null : 'Поле не должно быть пустым'
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

    async changePassword () {
        if (this.attributes.loading) {
            return;
        }

        this.attributes.error = null;

        if (this.form.map(f => f.validate().length).reduce((a, b) => a + b, 0)) { return; }

        this.attributes.loading = true;
        const res = await api.changePassword({
            oldPassword: this.form[0].getValue(),
            newPassword: this.form[1].getValue()
        });

        this.attributes.error = res.error;
        if (res.status === 403) {
            this.attributes.error = 'Не правильный старый пароль';
        }

        this.attributes.loading = false;
        this.attributes.passwordChanged = !this.attributes.error;

        this.attributes.payments = null;
    }

    render () {
        if (!user.user) return <div></div>;

        if (this.attributes.passwordChanged) {
            return <div>
                Пароль изменен
            </div>;
        }

        return <div className="profile-edit--little-width">

            <p className="profile-edit__subtitle">
                Смена пароля
            </p>

            {this.form.map((c) => c.renderReactive())}
            <div className="error">{this.attributes.error}</div>

            <Button
                text="Сменить пароль"
                color="primary"
                loading={this.attributes.loading}

                onClick={(e) => {
                    this.changePassword(e);
                }}
            />

            <br />
            <br />
            <p className="profile-edit__subtitle">
                Транзакции
            </p>
            {
                this.attributes.payments
                    ? <table>
                        <thead>
                            <tr>
                                <th>
                                    Дата
                                </th>
                                <th>
                                    Сумма
                                </th>
                                <th>
                                    Автор
                                </th>
                            </tr>
                        </thead>
                        {
                            this.attributes.payments.map(payment => (
                                <tr key={payment.id}>
                                    <td>
                                        <TimeAgoComponent date={payment.date} />
                                    </td>
                                    <td>
                                        {payment.amount} ₽
                                    </td>
                                    <td>
                                        <Button
                                            text={`Открыть автора ${payment.creatorId}`}
                                            onClick={
                                                () => {
                                                    app.$router.go(app.$router.createUrl('creator', payment.creatorId));
                                                }
                                            }
                                        />
                                    </td>
                                </tr>
                            ))
                        }

                    </table>
                    : <Skeleton />
            }

        </div>;
    }

    async created () {
        this.attributes.payments = await api.payments();
    }
}

export default ProfileEditSecure;
