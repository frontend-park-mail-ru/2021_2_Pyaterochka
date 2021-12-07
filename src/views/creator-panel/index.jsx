import Component from 'irbis/component';
import app from 'irbis';
import user from '../../storage/user';
import api from '../../api';
import CountersComponent from 'ui-library/counters';
import TimeAgoComponent from 'ui-library/time-ago';
import Button from 'ui-library/button';
import Skeleton from 'ui-library/skeleton';
import CreatorCard from 'ui-library/creator-card';

import './style.scss';
import ErrorPage from '../errorpage';

class CreatorPanel extends Component {
    render () {
        // if (this.attributes.errorFirstLoading) {
        //     return <ErrorPage desc="Нет соединения с интернетом" />;
        // }

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
                            () => { app.$router.go(app.$router.createUrl('profile.edit', 'creator_settings')); }
                        }
                        text="Настройки автора"
                    />

                </div>

                <div>
                    <div className="creator-panel__statistics shadow">
                        Здесь будет статистика
                    </div>
                </div>
            </div>

            <div className="creator-panel__add-post">
                <Button
                    color="success"
                    onClick={
                        () => { app.$router.go(app.$router.createUrl('post.create')); }
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
        } catch (e) {
            this.state.errorFirstLoading = true;
        }
    }
}

export default CreatorPanel;
