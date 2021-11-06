import api from '../../../api';
import Component from '../../../components/basecomponent';
import EditLevelComponent from '../../../components/edit-level';
import app from '../../../core/app';
import user from '../../../storage/user';
import LoadingView from '../../loading-view';
import ConfirmComponent from '../../../components/confirm';

import './style.scss';

class CreatorAddLevel extends Component {
    constructor () {
        super();
        this.attributes.level = null;
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
        this.attributes.loading = 'Создание уровня';
        this.attributes.level = {
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
        if (!user.user) return <div></div>;
        if (this.attributes.loading) {
            return <LoadingView>
                {this.attributes.loading}
            </LoadingView>;
        }
        if (this.attributes.deleteWarning) {
            return <ConfirmComponent
                title="Удаление уровня подписки"
                description="Данное действие не возможно будет отменить. Вы потеряете поддержку своих подписчиков на данном уровне."
                dangerButton="Удалить"
                positiveButton="Отмена"
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
            />;
        }

        if (this.attributes.error) {
            return <h1 className="profile-edit__title text-center">
                {this.attributes.error}
            </h1>;
        }

        return <div className="profile-edit">
            <EditLevelComponent
                level={this.attributes.level}
                title={this.levelId ? 'Редактирование уровня подписки' : 'Создание уровня подписки'}
                onSave={
                    (level, coverFile) => { this.save(level, coverFile); }
                }
                onDelete={
                    this.levelId
                        ? (level, coverFile) => {
                            this.delete(level, coverFile);
                        }
                        : null
                }
            />
        </div>;
    }

    async created () {
        if (!user.user) {
            app.$router.go(app.$router.createUrl('signin'));
            return;
        }
        if (this.data) {
            this.attributes.loading = 'Загрузка уровня';
            this.levelId = parseInt(this.data);
            this.attributes.level = (
                await api.levelsInfo(user.user.id)
            ).find(level => level.id === this.levelId);

            this.attributes.level.price = Number(this.attributes.level.price.split(' ')[0]);
            this.attributes.loading = '';
        }
    }
}

export default CreatorAddLevel;
