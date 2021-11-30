import api from '../../api/index';
import Component from 'irbis/component';
import app from 'irbis';
import PostCard from 'ui-library/post-card';
import Skeleton from 'ui-library/skeleton';
import ErrorPage from '../errorpage';

import './style.scss';

class CreatorView extends Component {
    defaultProps () {
        return { route: null };
    }

    constructor () {
        super();
        this.attributes.posts = null;
        this.state.loading = false;
    }

    render () {
        if (this.attributes.errorFirstLoading) {
            return <ErrorPage desc="Ошибка загрузки" />;
        }

        return (
            <div className="feed-page">

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
                                        level={post.levelId ? this.levelsNameMap.get(post.levelId) : ''}
                                        levelId={post.levelId}
                                        likes={post.likes}
                                        opened={this.isOwner() || !post.levelId || this.attributes.canUseLevels.includes(post.levelId)}
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
            this.attributes.posts = await api.postsFeedInfo();
        } catch {
            this.attributes.errorFirstLoading = true;
        }
        this.state.loading = false;
    }
}

export default CreatorView;
