import app from 'irbis';
import Component from 'irbis/component';
import ConfirmComponent from 'ui-library/confirm';
import EditLevelComponent, { EditLevelExportType } from 'ui-library/edit-level';
import LoadingView from '../../loading-view';
import user from '../../../storage/user';
import * as api from '../../../api';

import Route from 'irbis-router/route';
import { LevelEntity } from '../../../api/types';
import './style.scss';

class CreatorAddLevel extends Component<{
    route: Route
}, {
    loading: false | string,
    deleteWarning: boolean,
    level: LevelEntity,
    error: string | false;
}> {
    level?;
    levelId?: string | number;

    defaultProps () {
        return {
            route: null
        };
    }

    constructor () {
        super();
        this.level = null;
        this.state.loading = false;
        this.state.deleteWarning = false;
    }

    async delete (level?) {
        if (level) {
            this.state.level = level;
        }

        if (!this.state.deleteWarning) {
            this.state.deleteWarning = true;
            return;
        }

        this.state.loading = 'Удаление уровня';

        await api.levelDelete({
            levelId: this.levelId,
            creatorId: user.user.id
        });

        app.$router.go(app.$router.createUrl('profile.edit', 'creator_settings'));
    }

    async save ({
        name, price, benefits
    }, coverFile) {
        this.state.loading = this.levelId ? 'Редактирование уровня' : 'Создание уровня';
        this.level = {
            name,
            price,
            benefits
        };

        const res = await (this.levelId ? api.levelUpdate : api.levelCreate)(
            {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                levelId: this.levelId,
                name,
                price: Number(price),
                benefits,
                creatorId: user.user.id
            }
        );

        if (res.status > 299) {
            this.state.loading = false;

            this.state.error = res?.data?.error || 'Произошла ошибка';
            setTimeout(() => {
                this.state.error = '';
            }, 3000);
            return;
        }

        if (!this.levelId) {
            this.levelId = res.data.id;
        }

        if (coverFile) {
            this.state.loading = 'Загрузка обложки';
            await api.uploadLevelCover(coverFile, user.user.id, this.levelId);
        }

        app.$router.go(app.$router.createUrl('profile.edit', 'creator_settings'));
    }

    render () {
        if (!user.user) return <div />;
        if (this.state.loading) {
            return (<LoadingView>
                {this.state.loading}
            </LoadingView>);
        }
        if (this.state.deleteWarning) {
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
                        this.state.deleteWarning = false;
                    }
                }
                positiveButton="Отмена"
                title="Удаление уровня подписки"
            />);
        }

        if (this.state.error) {
            return (<h1 className="profile-edit__title text-center">
                {this.state.error}
            </h1>);
        }

        return (<div className="profile-edit">
            <EditLevelComponent
                level={this.level || undefined}
                onDelete={
                    this.levelId
                        ? (level: EditLevelExportType) => {
                            this.delete(level);
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
            this.state.loading = 'Загрузка уровня';
            this.levelId = parseInt(data);
            this.level = (
                await api.levelsInfo(user.user.id)
            ).find(level => level.id === this.levelId);

            this.level.price = Number(this.level.price.split(' ')[0]);
            this.state.loading = '';
        }
    }
}

export default CreatorAddLevel;
