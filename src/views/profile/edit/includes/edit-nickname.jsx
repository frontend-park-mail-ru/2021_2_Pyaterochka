import Component from 'irbis/component';
import app from 'irbis';
import ValidationError from 'ui-library/validation-error';
import InputField from 'ui-library/input-field';
import Button from 'ui-library/button';

import api from '../../../../api';
import user from '../../../../storage/user';

class EditNickname extends Component {
    defaultProps () {
        return {
            nickname: ''
        };
    }

    constructor ({
        nickname
    }) {
        super();

        this.state.newNickname = nickname;

        this.state.loading = false;
        this.state.error = null;
        this.state.nicknameChanged = false;

        this.nicknameValidation = [
            (value) => {
                return value.length >= 2 ? null : 'Введите минимум 2 символа';
            }
        ];
    }

    checkValidation (field, rules) {
        return rules
            .map(validate => validate(field))
            .reduce((acc, v) => acc || v, false);
    }

    async changeNickname () {
        if (this.state.loading) {
            return;
        }

        this.state.error = null;

        if (
            this.checkValidation(this.state.newNickname, this.nicknameValidation)
        ) {
            this.state.error = 'Проверьте правильность заполнения полей';
            return;
        }

        this.state.loading = true;
        const res = await api.changeNickname({
            oldNickname: this.props.nickname,
            newNickname: this.state.newNickname
        });

        this.state.error = res.error;
        if (res.status === 409) {
            this.state.error = 'Данные никнейм уже занят';
        }

        this.state.loading = false;
        this.state.nicknameChanged = !this.state.error;
        if (this.state.nicknameChanged) {
            await user.update();
            setTimeout(() => {
                app.$notification.push('', 5000, {
                    message: 'Пароль изменен'
                });
            }, 500);
        }
    }

    render () {
        return (<div>
            <InputField
                placeholder='Никнейм'
                validation={this.nicknameValidation}
                onInput={(e) => {
                    this.state.newNickname = e.target.value;
                }}
                value={this.state.newNickname}
                validateAlways={!!this.state.error}
            />

            {this.props.nickname !== this.state.newNickname
                ? <Button
                    color="primary"
                    loading={this.state.loading}
                    onClick={(e) => {
                        this.changeNickname(e);
                    }}
                    text="Сменить никнейм"
                />
                : ''}

            {this.state.error ? <ValidationError value={this.state.error} /> : null}
        </div>);
    }
}

export default EditNickname;
