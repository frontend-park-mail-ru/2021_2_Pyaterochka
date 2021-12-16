import app from 'irbis';
import Button from 'ui-library/button';
import Component from 'irbis/component';
import CountersComponent from 'ui-library/counters';
import CreatorCard from 'ui-library/creator-card';
import ErrorPage from '../errorpage';
import SelectComponent from 'ui-library/select';
import Skeleton from 'ui-library/skeleton';
import StatisticsCard from './includes/StatisticsCard';
import TimeAgoComponent from 'ui-library/time-ago';
import user from '../../storage/user';
import { LevelEntity, PostEntity } from '../../api/types';
import * as api from '../../api';
import './style.scss';

class CreatorPanel extends Component<never, {
    creator?: {
        name: string,
        avatar: string,
        description: string,
    },
    posts?: PostEntity[],
    errorFirstLoading?: boolean,
    levels?: LevelEntity[],
    levelsNames: {
        [key: string]: string
    },
    statistics?: {
        remuneration: string,
        views: number,
        postsCount: number,
        subscribers: number
    },
    duration: string
}> {
    categories: string[];

    constructor () {
        super();

        this.categories = [
            '10 дней',
            'Месяц',
            'Полгода',
            'Год'
        ];

        this.state.duration = this.categories[0];
    }

    render () {
        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }

        if (!this.state.posts) {
            return <Skeleton />;
        }
        return (<div className="creator-panel">
            <div className="creator-panel__topper">
                <div>
                    <CreatorCard
                        id={user.user.id}
                        name={this.state.creator.name}
                        avatar={this.state.creator.avatar}
                        description={this.state.creator.description}
                        shadow
                        clickable
                        noHoverShadow
                    />

                    <Button
                        color="default"
                        onClick={
                            () => {
                                app.$router.go(app.$router.createUrl('profile.edit', 'creator_settings'));
                            }
                        }
                        text="Настройки автора"
                    />

                </div>

                {
                    this.state.statistics
                        ? <div className="creator-panel__statistics">
                            <div className="creator-panel__statistics_select">
                                <SelectComponent
                                    inital={this.state.duration}
                                    options={this.categories}
                                    placeholder="Статистика за"
                                    onChange={
                                        value => {
                                            this.state.duration = value;
                                            this.setDuration();
                                        }
                                    }
                                />
                            </div>

                            <StatisticsCard
                                counter={this.state.statistics.postsCount ? this.state.statistics.postsCount : '-'}
                                title="Кол-во постов"
                            />

                            <StatisticsCard
                                counter={this.state.statistics.views ? this.state.statistics.views : '-'}
                                title="Просмотры"
                            />

                            <StatisticsCard
                                counter={this.state.statistics.remuneration ? this.state.statistics.remuneration : '-'}
                                title="Доход"
                            />

                            <StatisticsCard
                                counter={this.state.statistics.subscribers ? this.state.statistics.subscribers : '-'}
                                title="Подписчики"
                            />
                        </div>
                        : <Skeleton
                            width={600}
                            height={400}
                        />
                }

            </div>

            <div className="creator-panel__add-post">
                <Button
                    color="success"
                    onClick={
                        () => {
                            app.$router.go(app.$router.createUrl('post.create'));
                        }
                    }
                    text="Добавить пост"
                />
            </div>

            <div className="table-container">
                <table className="table__posts-info">
                    <thead>
                        <tr>
                            <th>
                                Дата публикации
                            </th>

                            <th>
                                Название
                            </th>

                            <th>
                                Уровень
                            </th>

                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.posts.map(post => (
                                <tr key={post.id}>
                                    <td>
                                        <TimeAgoComponent date={post.published} />
                                    </td>

                                    <td
                                    >
                                        <a router-go={app.$router.createUrl('post.view', `${user.user.id}/${post.id}`)}
                                        >
                                            {post.title}
                                        </a>

                                    </td>

                                    <td>
                                        {post.levelId ? this.state.levelsNames[post.levelId] : ''}
                                    </td>

                                    <td className="creator-panel__posts__last-cell">
                                        <CountersComponent
                                            likes={post.likes}
                                            views={post.views}
                                        />

                                        <Button
                                            onClick={
                                                () => {
                                                    app.$router.go(app.$router.createUrl('post.edit', post.id));
                                                }
                                            }
                                            text="Редактировать"
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>);
    }

    async setDuration () {
        let days: string;
        if (this.state.duration === '10 дней') {
            days = '10';
        }
        if (this.state.duration === 'Месяц') {
            days = '30';
        }
        if (this.state.duration === 'Полгода') {
            days = '180';
        }
        if (this.state.duration === 'Год') {
            days = '365';
        }

        this.state.statistics = {
            views: await api.viewsCount(user.user.id, days),
            remuneration: await api.incomeCount(user.user.id, days),
            postsCount: await api.postsCount(user.user.id),
            subscribers: await api.subscribersCount(user.user.id)
        };
    }

    async created () {
        if (!user.user) {
            app.$router.go(app.$router.createUrl('signin'));
            return;
        }

        try {
            this.state.creator = await api.creatorInfo(user.user.id);
            this.state.levels = await api.levelsInfo(user.user.id);

            this.state.levelsNames = { 0: 'Доступен всем' };
            this.state.levels.forEach((level) => {
                this.state.levelsNames[level.id] = level.name;
            });
            this.state.posts = await api.postsInfo(user.user.id);

            await this.setDuration();
        } catch (e) {
            this.state.errorFirstLoading = true;
        }
    }
}

export default CreatorPanel;
