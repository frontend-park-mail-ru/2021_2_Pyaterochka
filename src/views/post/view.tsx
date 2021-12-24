import AddCommentForm from './includes/add-comment-form';
import app from 'irbis';
import AudioPlayer from 'ui-library/audio-player';
import Button from 'ui-library/button';
import Comment from 'ui-library/comment';
import Component from 'irbis/component';
import consts from '../../consts';
import CreatorCard from 'ui-library/creator-card';
import ErrorPage from '../errorpage';
import InputField from 'ui-library/input-field';
import Like from 'ui-library/like';
import PostHeaderComponent from 'ui-library/post-header';
import Route from 'irbis-router/route';
import Skeleton from 'ui-library/skeleton';
import user from '../../storage/user';
import VideoPlayer from 'ui-library/video-player';
import { CommentEntity, CreatorEntity, FullPostEntity, PostEntity } from '../../api/types';
import * as api from '../../api';
import './view.scss';

class PostView extends Component<{
    route?: Route
}, {
    post: FullPostEntity,
    creator: CreatorEntity,
    otherPosts: PostEntity[],
    comments: CommentEntity[],
    loading: boolean,
    errorFirstLoading?: boolean
}> {
    postId;
    userId;

    defaultProps () {
        return {
            route: null
        };
    }

    constructor () {
        super();
        this.state.post = null;
        this.state.otherPosts = null;
        this.state.comments = [];

        this.state.loading = true;
    }

    async like () {
        await api.likePost(
            {
                postId: this.postId,
                creatorId: this.userId,
                like: !this.state.post.liked
            }
        );

        if (this.state.post.liked) {
            this.state.post.likes--;
            this.state.post.liked = false;
        } else {
            this.state.post.likes++;
            this.state.post.liked = true;
        }
    }

    render () {
        // if (this.state.errorFirstLoading) {
        //     return <ErrorPage desc="Нет соединения с интернетом" />;
        // }

        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }

        if (this.state.loading) {
            return (
                <div className="post-page">
                    <div
                        className="post-cover"
                    >
                        <Skeleton height={512} />
                    </div>

                    <div className="post-page__container">
                        <div className="post-page__container_left">

                            <div className="post">
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

                                <hr />

                                <Skeleton
                                    type="text"
                                    height={62} />

                                <br />

                                <Skeleton height={300} />

                                <br />

                                <div className="post__actions">
                                    <Like
                                        user={false}
                                    />

                                </div>

                            </div>

                            <div className="comments-container">
                                <div className="add-comment">
                                    <div className="add-comment__title">
                                        {consts.leaveComment}
                                    </div>

                                    <InputField
                                        placeholder="Текст комментария"
                                        disabled
                                    />

                                    <div className="add-comment__actions">
                                        <Button
                                            color="primary"
                                            text="Отправить"
                                        />

                                        <span className="add-comment__actions_warn">
                                            {consts.communityWarning}
                                        </span>
                                    </div>
                                </div>

                                <Skeleton
                                    height={120}
                                    width={792}
                                />
                            </div>

                        </div>

                        <div className="other-posts">
                            {
                                this.state.otherPosts
                                    ? this.state.otherPosts.map((post) =>
                                        (<PostHeaderComponent
                                            creatorId={post.creatorId}
                                            id={post.id}
                                            key={post.id}
                                            likes={post.likes}
                                            published={post.published}
                                            size="20px"
                                            title={post.title}
                                            views={post.views}
                                        />)
                                    )
                                    : <>
                                        <Skeleton height={50} />

                                        <br />

                                        <Skeleton height={50} />

                                        <br />

                                        <Skeleton height={50} />
                                    </>
                            }
                        </div>

                    </div>

                </div>);
        }

        if (!this.state.loading && !this.state.post) {
            return (<ErrorPage
                desc="Запись не найдена"
                err={404}
            />);
        }
        return (
            <div className="post-page">
                <div
                    className="post-cover"
                    style={`background-image:url('${this.state.post.image}'`}
                />

                <div className="post-page__container">
                    <div className="post-page__container_left">

                        <div className="post">
                            <CreatorCard
                                avatar={this.state.creator.avatar}
                                clickable
                                description={this.state.creator.description}
                                id={this.state.creator.id}
                                name={this.state.creator.name}
                                noHoverShadow
                                shadow
                            />

                            <hr />

                            <PostHeaderComponent
                                creatorId={this.state.creator.id}
                                id={this.state.post.id}
                                published={this.state.post.published}
                                title={this.state.post.title}
                                views={this.state.post.views}
                            />

                            {
                                this.state.post.body.map(({
                                    id,
                                    type,
                                    value
                                }) => {
                                    if (type === 'text') {
                                        return (<p
                                            className="post__text"
                                            key={id}
                                        >
                                            {value.split('\n').map((p, i) => {
                                                return (<>
                                                    {i ? <br /> : ''}

                                                    {p}
                                                </>);
                                            })}
                                        </p>);
                                    }
                                    if (type === 'image') {
                                        return (<img
                                            className="post__image"
                                            src={value} />);
                                    }
                                    if (type === 'video') {
                                        return (<div className="post__attach">
                                            <VideoPlayer src={[{ url: value }]} />
                                        </div>);
                                    }
                                    if (type === 'audio') {
                                        return (<div className="post__attach">
                                            <AudioPlayer src={[{ url: value }]} />
                                        </div>);
                                    }
                                    return null;
                                })
                            }

                            <div className="post__actions">
                                <Like
                                    count={this.state.post.likes}
                                    liked={this.state.post.liked}
                                    onClick={() => {
                                        this.like();
                                    }}
                                    user
                                />

                                {
                                    user.user && String(this.userId) === String(user.user.id)
                                        ? <Button
                                            text="Редактировать"
                                            color="primary"
                                            onClick={
                                                () => {
                                                    app.$router.go(app.$router.createUrl('post.edit', this.postId));
                                                }
                                            }
                                        />
                                        : null
                                }
                            </div>

                        </div>

                        <div className="comments-container">
                            <AddCommentForm
                                post={this.state.post}
                                onSend={() => {
                                    this.updateComments();
                                }}
                            />

                            {
                                this.state.comments.map((comment) =>
                                    (<Comment
                                        body={comment.body}
                                        key={comment.id}
                                        published={comment.published}
                                        user={comment.user}
                                    />))
                            }
                        </div>

                    </div>

                    <div className="other-posts">
                        <p className="other-posts__title">
                            {consts.moreFromCreator}
                        </p>

                        <hr />

                        {
                            this.state.otherPosts
                                ? this.state.otherPosts.map((post) =>
                                    (<PostHeaderComponent
                                        creatorId={post.creatorId}
                                        id={post.id}
                                        key={post.id}
                                        likes={post.likes}
                                        published={post.published}
                                        size="20px"
                                        title={post.title}
                                        views={post.views}
                                    />)
                                )
                                : <>
                                    <Skeleton height={50} />

                                    <br />

                                    <Skeleton height={50} />

                                    <br />

                                    <Skeleton height={50} />
                                </>
                        }
                    </div>

                </div>

            </div>
        );
    }

    async propsChanged () {
        [this.userId, this.postId] = this.props.route.data.split('/');

        this.state.loading = true;

        try {
            [
                this.state.creator,
                this.state.post
            ] =
                await Promise.all([
                    api.creatorInfo(this.userId),
                    api.postInfo(this.userId, this.postId, true)
                ]);
            this.state.post.creatorId = this.userId;

            this.state.loading = false;

            this.state.otherPosts = (await api.postsInfo(this.userId)).filter(p => String(p.id) !== String(this.postId));

            this.updateComments();
        } catch (e) {
            console.error(e);
            this.state.errorFirstLoading = true;
        }
    }

    async updateComments () {
        this.state.comments = (await api.postComments(this.userId, this.postId));
    }
}

export default PostView;
