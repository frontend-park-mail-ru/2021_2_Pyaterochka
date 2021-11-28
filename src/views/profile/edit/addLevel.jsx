import api from '../../../api';
import Component from 'irbis/component';
import EditLevelComponent from 'ui-library/edit-level';
import app from 'irbis';
import user from '../../../storage/user';
import LoadingView from '../../loading-view';
import ConfirmComponent from 'ui-library/confirm';

import './style.scss';

class CreatorAddLevel extends Component {
    defaultProps () {
        return {
            route: null
        };
    }

    constructor () {
        super();
        this.level = null;
        this.attributes.loading = false;
        this.attributes.deleteWarning = false;
    }

    async delete (level) {
        if (level) {
            this.attributes.level = level;
        }

        if (!this.attributes.deleteWarning) {
            this.attributes.deleteWarning = true;
            return;
        }

        this.attributes.loading = 'Удаление уровня';

        await api.levelDelete({
            levelId: this.levelId,
            creatorId: user.user.id
        });

        app.$router.go(app.$router.createUrl('profile.edit', 'creator_settings'));
    }

    async save ({
        name, price, benefits
    }, coverFile) {
        this.attributes.loading = this.levelId ? 'Редактирование уровня' : 'Создание уровня';
        this.level = {
            name,
            price,
            benefits
        };

        const res = await (this.levelId ? api.levelUpdate : api.levelCreate)(
            {
                levelId: this.levelId,
                name,
                price: Number(price),
                benefits,
                creatorId: user.user.id
            }
        );

        if (res.status > 299) {
            this.attributes.loading = false;
            this.attributes.error = res?.data?.error || 'Произошла ошибка';
            setTimeout(() => {
                this.attributes.error = '';
            }, 3000);
            return;
        }

        if (!this.levelId) {
            this.levelId = res.data.id;
        }

        if (coverFile) {
            this.attributes.loading = 'Загрузка обложки';
            await api.uploadLevelCover(coverFile, user.user.id, this.levelId);
        }

        app.$router.go(app.$router.createUrl('profile.edit', 'creator_settings'));
    }

    render () {
        if (!user.user) return <div />;
        if (this.attributes.loading) {
            return (<LoadingView>
                {this.attributes.loading}
            </LoadingView>);
        }
        if (this.attributes.deleteWarning) {
            return (<ConfirmComponent
                dangerButton="Удалить"
                description={`
                    Данное действие не возможно будет отменить.
                    Вы потеряете поддержку своих подписчиков на данном уровне.
                    Все посты данного уровня подписки станут доступными для всех.
                    `}
                onDanger={
                    () => {
                        this.delete();
                    }
                }
                onPositive={
                    () => {
                        this.attributes.deleteWarning = false;
                    }
                }
                positiveButton="Отмена"
                title="Удаление уровня подписки"
            />);
        }

        if (this.attributes.error) {
            return (<h1 className="profile-edit__title text-center">
                {this.attributes.error}
            </h1>);
        }

        return (<div className="profile-edit">
            <EditLevelComponent
                level={this.level || undefined}
                onDelete={
                    this.levelId
                        ? (level, coverFile) => {
                            this.delete(level, coverFile);
                        }
                        : null
                }
                onSave={
                    (level, coverFile) => { this.save(level, coverFile); }
                }
                title={this.levelId ? 'Редактирование уровня подписки' : 'Создание уровня подписки'}
            />
        </div>);
    }

    created () {
        if (!user.user) {
            app.$router.go(app.$router.createUrl('signin'));
        }
    }

    async propsChanged () {
        const data = this.props.route.data;
        if (data) {
            this.attributes.loading = 'Загрузка уровня';
            this.levelId = parseInt(data);
            this.level = (
                await api.levelsInfo(user.user.id)
            ).find(level => level.id === this.levelId);

            this.level.price = Number(this.level.price.split(' ')[0]);
            this.attributes.loading = '';
        }
    }
}

export default CreatorAddLevel;
