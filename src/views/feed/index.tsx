import app from 'irbis';
import Button from 'ui-library/button';
import Component from 'irbis/component';
import ErrorPage from '../errorpage';
import PostCard from 'ui-library/post-card';
import Route from 'irbis-router/route';
import Skeleton from 'ui-library/skeleton';
import { PostEntity } from '../../api/types';
import { postsFeedInfo } from '../../api';
import './style.scss';

class FeedView extends Component<{
    route: Route
}, {
    posts?: PostEntity[],
    loading: boolean,
    errorFirstLoading?: boolean
}> {
    defaultProps () {
        return { route: null };
    }

    constructor () {
        super();
        this.state.posts = null;
        this.state.loading = false;
    }

    render () {
        // if (this.attributes.errorFirstLoading) {
        //     return <ErrorPage desc="Нет соединения с интернетом" />;
        // }

        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }

        return (
            <div className="feed-page">
                <h2 className="text-center">
                    Лента
                </h2>

                <div className="feed-page__buttons">
                    <Button
                        text="Мои подписки"
                        onClick={
                            () => {
                                app.$router.go(app.$router.createUrl('profile'));
                            }
                        }
                    />

                    <Button
                        text="Поиск авторов"
                        onClick={
                            () => {
                                app.$router.go(app.$router.createUrl('creators.search'));
                            }
                        }
                    />
                </div>

                {
                    this.state.loading
                        ? <div className="post-container">
                            <Skeleton width={600} />

                            <Skeleton width={600} />

                            <Skeleton width={600} />
                        </div>
                        : this.state.posts
                            ? <div className="post-container">
                                {this.attributes.posts.map(
                                    (post) => (<PostCard
                                        creatorId={post.creatorId}
                                        description={post.description}
                                        id={post.id}
                                        image={post.image}
                                        key={post.id}
                                        levelId={post.levelId}
                                        likes={post.likes}
                                        opened
                                        published={post.published}
                                        title={post.title}
                                        views={post.views}
                                    />)
                                )}
                            </div>
                            : <div className="feed-page__no-creators">
                                <img
                                    router-go={app.$router.createUrl('creators.search')}
                                    src="/imgs/find_creators_message.svg"
                                />
                            </div>

                }

            </div>
        );
    }

    async created () {
        this.state.loading = true;
        try {
            this.attributes.posts = await postsFeedInfo();
        } catch {
            this.attributes.errorFirstLoading = true;
        }
        this.state.loading = false;
    }
}

export default FeedView;
