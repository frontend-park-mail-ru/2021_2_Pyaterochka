import Component from 'irbis/component';
import ValidationError from 'ui-library/validation-error';
import InputField from 'ui-library/input-field';
import Button from 'ui-library/button';

import api from '../../../../api';

class EditPassword extends Component {
    constructor () {
        super();

        this.state.oldPassword = '';
        this.state.newPassword = '';
        this.state.repeatPassword = '';

        this.state.loading = false;
        this.state.passwordChanged = false;
        this.state.error = null;

        this.oldPasswordValidation = [
            (v) => v !== '' ? null : 'Поле не должно быть пустым'
        ];

        this.newPasswordValidation = [
            (value) => {
                return value.length >= 6 ? null : 'Введите минимум 6 символов';
            },
            (value) => {
                return this.state.oldPassword !== value ? null : 'Старый и новый пароль должны различаться';
            }
        ];

        this.repeatPasswordValidation = [
            (value) => {
                return value !== '' ? null : 'Поле не должно быть пустым';
            },
            (value) => {
                return this.state.newPassword === value
                    ? null
                    : 'Пароли не совпадают';
            }
        ];
    }

    checkValidation (field, rules) {
        return rules
            .map(validate => validate(field))
            .reduce((acc, v) => acc || v, false);
    }

    async changePassword () {
        if (this.state.loading) {
            return;
        }

        this.state.error = null;

        if (
            this.checkValidation(this.state.oldPassword, this.oldPasswordValidation) ||
            this.checkValidation(this.state.newPassword, this.newPasswordValidation) ||
            this.checkValidation(this.state.repeatPassword, this.repeatPasswordValidation)
        ) {
            this.state.error = 'Проверьте правильность заполнения полей';
            return;
        }

        this.state.loading = true;
        const res = await api.changePassword({
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        });

        this.state.error = res.error;
        if (res.status === 403) {
            this.state.error = 'Не правильный старый пароль';
        }

        this.state.loading = false;
        this.state.passwordChanged = !this.state.error;
    }

    render () {
        if (this.state.passwordChanged) {
            return (<div>
                Пароль изменен
            </div>);
        }
        return (<div>
            <InputField
                placeholder='Старый пароль'
                type='password'
                validation={this.oldPasswordValidation}
                onInput={(e) => {
                    this.state.oldPassword = e.target.value;
                }}
                validateAlways={!!this.state.error}
            />

            <InputField
                placeholder='Новый пароль'
                type='password'
                validation={this.newPasswordValidation}
                onInput={(e) => {
                    this.state.newPassword = e.target.value;
                }}
                validateAlways={!!this.state.error}
            />

            <InputField
                placeholder='Подтвердите пароль'
                type='password'
                validation={this.repeatPasswordValidation}
                onInput={(e) => {
                    this.state.repeatPassword = e.target.value;
                }}
                validateAlways={!!this.state.error}
            />

            <Button
                color="primary"
                loading={this.state.loading}
                onClick={(e) => {
                    this.changePassword(e);
                }}
                text="Сменить пароль"
            />

            {this.state.error ? <ValidationError value={this.state.error} /> : null}
        </div>);
    }
}

export default EditPassword;
