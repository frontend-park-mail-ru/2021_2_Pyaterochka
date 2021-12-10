import api from '../../api/index';
import app from 'irbis';
import Button from 'ui-library/button';
import Component from 'irbis/component';
import CreatorCard from 'ui-library/creator-card';
import ErrorPage from '../errorpage';
import LevelCard from 'ui-library/level-card';
import LockMessage from 'ui-library/lock-message';
import PostCard from 'ui-library/post-card';
import Skeleton from 'ui-library/skeleton';
import user from '../../storage/user';

import Route from 'irbis-router/route';
import './style.scss';

class CreatorView extends Component<{
    route?: Route
}, {
    creator,
    levels,
    level,
    posts,
    notFound,
    canUseLevels,
    isCopied,
    errorFirstLoading
}> {
    levelsNameMap?;

    defaultProps () {
        return { route: null };
    }

    constructor () {
        super();
        this.state.creator = null;
        this.state.levels = null;
        this.state.level = null;
        this.state.posts = null;
        this.state.notFound = false;

        this.state.canUseLevels = [];
    }

    render () {
        // if (this.state.errorFirstLoading) {
        //     return <ErrorPage desc="Нет соединения с интернетом" />;
        // }

        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }

        if (this.state.notFound) {
            return (<ErrorPage
                desc="Страница автора не найдена"
                err={404}
            />);
        }

        return (
            <div className="creator-page">

                {!this.state.creator
                    ? (
                        <>
                            <div className="creator-cover">
                                <Skeleton height={256} />
                            </div>

                            <div className="creator-card">
                                <Skeleton
                                    height={200}
                                    type="circle"
                                />

                                <br />

                                <Skeleton
                                    height={40}
                                    type="text"
                                />

                                <br />
                            </div>
                        </>
                    )
                    : (
                        <div className="creator-page">
                            <div
                                className="creator-cover"
                                style={`background-image:url('${this.state.creator.cover}'`}
                            />

                            <CreatorCard
                                avatar={this.state.creator.avatar}
                                clickable={false}
                                description={this.state.creator.description}
                                id={this.state.creator.id}
                                name={this.state.creator.name}
                                shadow
                            />

                            <div className="text-center">
                                {this.state.isCopied ? 'Ссылка скопирована в буфер обмена' : null}

                            </div>
                        </div>
                    )}

                <div className="creator-page__creator-toolbox">
                    <Button
                        color="default"
                        onClick={
                            () => {
                                const text = document.createElement('input');
                                text.value = location.origin + app.$router.createUrl('creator', this.state.creator.id);
                                document.body.appendChild(text);
                                text.select();
                                document.execCommand('copy');
                                text.remove();
                                this.state.isCopied = true;
                                setTimeout(() => {
                                    this.state.isCopied = false;
                                }, 3000);
                            }
                        }
                        text="Поделиться аккаунтом"
                    />
                </div>

                {
                    this.isOwner()
                        ? <div className="creator-page__creator-toolbox">
                            <Button
                                color="default"
                                onClick={
                                    () => {
                                        app.$router.go(app.$router.createUrl('post.create'));
                                    }
                                }
                                text="Добавить пост"
                            />

                            <Button
                                color="default"
                                onClick={
                                    () => {
                                        app.$router.go(app.$router.createUrl('creator.panel'));
                                    }
                                }
                                text="Панель автора"
                            />
                        </div>
                        : !this.state.levels
                            ? <div className="level-card-container">
                                {[1, 2, 3].map((v) => (
                                    <Skeleton
                                        height={260}
                                        key={v}
                                        width={260}
                                    />
                                ))}
                            </div>
                            : <div className="level-card-container">
                                {this.state.levels.map((level) =>
                                    (<LevelCard
                                        key={level.id}
                                        name={level.name}
                                        benefits={level.benefits}
                                        cover={level.cover}
                                        price={level.price}
                                        color={level.color}
                                        parentName={level.parentName}
                                        btnText={
                                            level.id === this.state.creator.levelId
                                                ? 'Отписаться'
                                                : 'Выбрать уровень'
                                        }
                                        onClick={
                                            () => {
                                                app.$router.go(
                                                    app.$router.createUrl(
                                                        'payment', `${this.state.creator.id}/${level.id}`
                                                    )
                                                );
                                            }
                                        }
                                    />)
                                )}
                            </div>
                }

                {
                    !this.state.posts
                        ? <div className="post-container">
                            <Skeleton width={600} />

                            <Skeleton width={600} />

                            <Skeleton width={600} />
                        </div>
                        : <>
                            <div className="post-container">
                                {this.state.posts.map(
                                    (post) => (<PostCard
                                        creatorId={post.creatorId}
                                        description={post.description}
                                        id={post.id}
                                        image={post.image}
                                        key={post.id}
                                        level={post.levelId ? this.levelsNameMap.get(post.levelId) : ''}
                                        levelId={post.levelId}
                                        likes={post.likes}
                                        opened={this.isOwner() || !post.levelId || this.state.canUseLevels.includes(post.levelId)}
                                        published={post.published}
                                        title={post.title}
                                        views={post.views}
                                    />)
                                )}
                            </div>

                            {
                                !this.state.level && this.state.levels.length &&
                                !(user.user && this.state.creator && user.user.id === this.state.creator.id)
                                    ? <LockMessage text="Стань патроном, чтобы продолжить наслаждаться работами автора">
                                        <Button
                                            color="primary"
                                            onClick={
                                                () => {
                                                    const level = this.state.levels.at(-1);
                                                    app.$router.go(
                                                        app.$router.createUrl(
                                                            'payment', `${this.state.creator.id}/${level.id}`
                                                        )
                                                    );
                                                }
                                            }
                                            text="Стать патроном"
                                        />
                                    </LockMessage>
                                    : ''
                            }

                        </>
                }

            </div>
        );
    }

    isOwner () {
        return user.user && this.state.creator && user.user.id === this.state.creator.id;
    }

    async propsChanged () {
        const creatorId = this.props.route.data;
        try {
            this.state.creator = null;

            this.state.creator = await api.creatorInfo(creatorId);

            if (!this.state.creator) {
                this.state.notFound = true;
                return;
            }
            const levels = await api.levelsInfo(creatorId);

            const levelId = this.state.creator.levelId;

            this.levelsNameMap =
                levels.reduce(
                    (map, {
                        id,
                        name
                    }) => map.set(id, name), new Map()
                );

            if (levelId) {
                const levelI = levels
                    .findIndex(level => level.id === levelId);

                this.state.level = levels[levelI];

                this.state.canUseLevels =
                    levels
                        .slice(0, levelI + 1)
                        .map(({ id }) => id);
            }

            this.state.levels = levels;
            this.state.posts = await api.postsInfo(creatorId);

            if (!this.state.posts) {
                this.state.notFound = true;
            }
        } catch {
            this.state.errorFirstLoading = true;
        }
    }
}

export default CreatorView;
