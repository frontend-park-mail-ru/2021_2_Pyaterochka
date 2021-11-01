import api from '../../api/index';
import Component from '../../components/basecomponent';
import Button from '../../components/button';
import CreatorCard from '../../components/creator-card';
import LevelCard from '../../components/level-card';
import LockMessage from '../../components/lock-message';
import PostCard from '../../components/post-card';
import Skeleton from '../../components/skeleton';
import app from '../../core/app';
import ErrorPage from '../errorpage';

import './style.scss';

class CreatorView extends Component {
    constructor () {
        super();
        this.attributes.creator = null;
        this.attributes.levels = null;
        this.attributes.posts = null;
        this.attributes.notFound = false;
    }

    render () {
        if (this.attributes.notFound) {
            return <ErrorPage err={404} desc="Страница автора не найдена" />;
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
                                <Skeleton type="circle" height={200} />
                                <Skeleton type="text" height={40} />
                            </div>
                        </>
                    )
                    : (
                        <div className="creator-page">
                            <div
                                className="creator-cover"
                                style={`background-image:url('${this.attributes.creator.cover}'`}
                            ></div>

                            <CreatorCard
                                id={this.attributes.creator.id}
                                name={this.attributes.creator.name}
                                avatar={this.attributes.creator.avatar}
                                description={this.attributes.creator.description}
                                shadow={true}
                                clickable={false}
                            />
                        </div>
                    )}
                {
                    !this.attributes.levels
                        ? <div className="level-card-container">
                            {[1, 2, 3].map((v) => (
                                <Skeleton key={v} width={260} height={260} />
                            ))}
                        </div>
                        : <div className="level-card-container">
                            {this.attributes.levels.map((level) =>
                                <LevelCard
                                    key={level.id}
                                    name={level.name}
                                    benefits={level.benefits}
                                    cover={level.cover}
                                    price={level.price}
                                    color={level.color}
                                    onClick={
                                        () => {
                                            app.$router.go(
                                                app.$router.createUrl(
                                                    'payment', `${this.attributes.creator.id}/${level.id}`
                                                )
                                            );
                                        }
                                    }
                                />
                            )}
                        </div>

                }

                {
                    !this.attributes.posts
                        ? <>
                            <div className="post-container">
                                <Skeleton width={600} />
                                <Skeleton width={600} />
                                <Skeleton width={600} />
                            </div>
                        </>
                        : <>
                            <div className="post-container">
                                {this.attributes.posts.map(
                                    (post) => <PostCard
                                        key={post.id}
                                        title={post.title}
                                        published={post.published}
                                        likes={post.likes}
                                        views={post.views}
                                        description={post.description}
                                        image={post.image}
                                        creatorId = {post.creatorId}
                                        id={post.id}
                                    />
                                )}
                            </div>
                            <LockMessage text="Стань патроном, чтобы продолжить наслаждаться работами автора">
                                <Button text="Стать патроном" color="primary" />
                            </LockMessage>
                        </>
                }

            </div>
        );
    }

    async created () {
        this.attributes.creator = null;

        this.attributes.creator = await api.creatorInfo(this.data);

        if (!this.attributes.creator) {
            this.attributes.notFound = true;
            return;
        }
        this.attributes.levels = await api.levelsInfo(this.data);

        this.attributes.posts = await api.postsInfo(this.data);

        if (!this.attributes.posts) {
            this.attributes.notFound = true;
        }
    }
}

export default CreatorView;
