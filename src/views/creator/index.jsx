import api from '../../api/index';
import Component from 'irbis/component';
import Button from 'ui-library/button';
import CreatorCard from 'ui-library/creator-card';
import LevelCard from 'ui-library/level-card';
import LockMessage from 'ui-library/lock-message';
import PostCard from 'ui-library/post-card';
import Skeleton from 'ui-library/skeleton';
import app from 'irbis';
import user from '../../storage/user';
import ErrorPage from '../errorpage';

import './style.scss';

class CreatorView extends Component {
    defaultProps () {
        return { route: null };
    }

    constructor () {
        super();
        this.attributes.creator = null;
        this.attributes.levels = null;
        this.attributes.level = null;
        this.attributes.posts = null;
        this.attributes.notFound = false;

        this.attributes.canUseLevels = [];
    }

    render () {
        if (this.attributes.errorFirstLoading) {
            return <ErrorPage desc="Ошибка загрузки" />;
        }

        if (this.attributes.notFound) {
            return (<ErrorPage
                desc="Страница автора не найдена"
                err={404}
            />);
        }

        return (
            <div className="creator-page">

                {!this.attributes.creator
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

                                <Skeleton
                                    height={40}
                                    type="text"
                                />
                            </div>
                        </>
                    )
                    : (
                        <div className="creator-page">
                            <div
                                className="creator-cover"
                                style={`background-image:url('${this.attributes.creator.cover}'`}
                            />

                            <CreatorCard
                                avatar={this.attributes.creator.avatar}
                                clickable={false}
                                description={this.attributes.creator.description}
                                id={this.attributes.creator.id}
                                name={this.attributes.creator.name}
                                shadow
                            />
                        </div>
                    )}

                {
                    user.user && this.attributes.creator && user.user.id === this.attributes.creator.id
                        ? <div className="creator-page__creator-toolbox">
                            <Button
                                color="primary"
                                onClick={
                                    () => { app.$router.go(app.$router.createUrl('post.create')); }
                                }
                                text="Добавить пост"
                            />

                            <Button
                                color="primary"
                                onClick={
                                    () => { app.$router.go(app.$router.createUrl('profile.edit', 'creator_settings')); }
                                }
                                text="Перейти к настройкам автора"
                            />
                        </div>

                        : !this.attributes.levels
                            ? <div className="level-card-container">
                                {[1, 2, 3].map((v) => (
                                    <Skeleton
                                        height={260}
                                        key={v}
                                        width={260}
                                    />
                                ))}
                            </div>
                            : !this.attributes.level
                                ? <div className="level-card-container">
                                    {this.attributes.levels.map((level) =>
                                        (<LevelCard
                                            key={level.id}
                                            name={level.name}
                                            benefits={level.benefits}
                                            cover={level.cover}
                                            price={level.price}
                                            color={level.color}
                                            parentName={level.parentName}
                                            onClick={
                                                () => {
                                                    app.$router.go(
                                                        app.$router.createUrl(
                                                            'payment', `${this.attributes.creator.id}/${level.id}`
                                                        )
                                                    );
                                                }
                                            }
                                        />)
                                    )}
                                </div>
                                : <div className="level-card-container">
                                    <LevelCard
                                        benefits={this.attributes.level.benefits}
                                        btnText="Отписаться"
                                        color={this.attributes.level.color}
                                        cover={this.attributes.level.cover}
                                        key={this.attributes.level.id}
                                        name={this.attributes.level.name}
                                        onClick={
                                            () => {
                                                app.$router.go(
                                                    app.$router.createUrl(
                                                        'payment', `${this.attributes.creator.id}/${this.attributes.level.id}/unsubscribe`
                                                    )
                                                );
                                            }

                                        }
                                        price={this.attributes.level.price}
                                    />
                                </div>
                }

                {
                    !this.attributes.posts
                        ? <div className="post-container">
                            <Skeleton width={600} />

                            <Skeleton width={600} />

                            <Skeleton width={600} />
                        </div>
                        : <>
                            <div className="post-container">
                                {this.attributes.posts.map(
                                    (post) => (<PostCard
                                        creatorId={post.creatorId}
                                        description={post.description}
                                        id={post.id}
                                        image={post.image}
                                        key={post.id}
                                        level={post.levelId ? this.levelsNameMap.get(post.levelId) : ''}
                                        levelId={post.levelId}
                                        likes={post.likes}
                                        opened={!post.levelId || this.attributes.canUseLevels.includes(post.levelId)}
                                        published={post.published}
                                        title={post.title}
                                        views={post.views}
                                    />)
                                )}
                            </div>

                            {
                                !this.attributes.level && this.attributes.levels.length &&
                                    !(user.user && this.attributes.creator && user.user.id === this.attributes.creator.id)
                                    ? <LockMessage text="Стань патроном, чтобы продолжить наслаждаться работами автора">
                                        <Button
                                            color="primary"
                                            onClick={
                                                () => {
                                                    const level = this.attributes.levels.at(-1);
                                                    app.$router.go(
                                                        app.$router.createUrl(
                                                            'payment', `${this.attributes.creator.id}/${level.id}`
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

    async propsChanged () {
        const creatorId = this.props.route.data;
        try {
            this.attributes.creator = null;

            this.attributes.creator = await api.creatorInfo(creatorId);

            if (!this.attributes.creator) {
                this.attributes.notFound = true;
                return;
            }
            const levels = await api.levelsInfo(creatorId);

            const levelId = this.attributes.creator.levelId;

            this.levelsNameMap =
                levels.reduce(
                    (map, { id, name }) => map.set(id, name), new Map()
                );

            if (levelId) {
                const levelI = levels
                    .findIndex(level => level.id === levelId);

                this.attributes.level = levels[levelI];

                this.attributes.canUseLevels =
                    levels
                        .slice(0, levelI + 1)
                        .map(({ id }) => id);
            }

            this.attributes.levels = levels;
            this.attributes.posts = await api.postsInfo(creatorId);

            if (!this.attributes.posts) {
                this.attributes.notFound = true;
            }
        } catch {
            this.attributes.errorFirstLoading = true;
        }
    }
}

export default CreatorView;
