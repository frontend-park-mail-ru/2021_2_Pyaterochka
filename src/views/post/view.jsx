import Component from 'irbis/component';
import CreatorCard from 'ui-library/creator-card';
import Comment from 'ui-library/comment';
import Skeleton from 'ui-library/skeleton';
import './view.scss';
import InputField from 'ui-library/input-field';
import Button from 'ui-library/button';
import Like from 'ui-library/like';
import PostHeaderComponent from 'ui-library/post-header';
import api from '../../api';
import ErrorPage from '../errorpage';
import LoadingView from '../loading-view';
import user from '../../storage/user';
import app from 'irbis';
import consts from '../../consts';
import AudioPlayer from 'ui-library/audio-player';
import VideoPlayer from 'ui-library/video-player';

class PostView extends Component {
    defaultProps () {
        return {
            route: ''
        };
    }

    constructor () {
        super();
        this.attributes.post = null;
        this.attributes.author = [];
        this.attributes.otherPosts = null;
        this.attributes.comments = [];

        this.attributes.loading = true;
    }

    async like () {
        await api.likePost(
            {
                postId: this.postId,
                creatorId: this.userId,
                like: !this.attributes.post.liked
            }
        );

        if (this.attributes.post.liked) {
            this.attributes.post.likes--;
            this.attributes.post.liked = false;
        } else {
            this.attributes.post.likes++;
            this.attributes.post.liked = true;
        }
    }

    render () {
        if (this.attributes.errorFirstLoading) {
            return <ErrorPage desc="Ошибка загрузки" />;
        }

        if (this.attributes.loading) { return <LoadingView />; }

        if (!this.attributes.loading && !this.attributes.post) {
            return (<ErrorPage
                desc="Запись не найдена"
                err={404}
            />);
        }
        return (
            <div className="post-page">
                <div
                    className="post-cover"
                    style={`background-image:url('${this.attributes.post.image}'`}
                />

                <div className="post-page__container">
                    <div className="post-page__container_left">

                        <div className="post">
                            <CreatorCard
                                avatar={this.attributes.creator.avatar}
                                clickable
                                description={this.attributes.creator.description}
                                id={this.attributes.creator.id}
                                name={this.attributes.creator.name}
                                noHoverShadow
                                shadow
                            />

                            <hr />

                            <PostHeaderComponent
                                creatorId={this.attributes.creator.id}
                                id={this.attributes.post.id}
                                published={this.attributes.post.published}
                                title={this.attributes.post.title}
                                views={this.attributes.post.views}
                            />

                            {
                                this.attributes.post.body.map(({ id, type, value }) => {
                                    if (type === 'text') {
                                        return (<p
                                            className="post__text"
                                            key={id}
                                        >
                                            {value}
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
                                    count={this.attributes.post.likes}
                                    liked={this.attributes.post.liked}
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
                            <div className="add-comment">
                                <div className="add-comment__title">
                                    {consts.leaveComment}
                                </div>

                                <InputField
                                    placeholder="Текст комментария"
                                    validation={[
                                        // (v) => !v ? 'Поле не должно быть пустым' : null
                                    ]}
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

                            {
                                this.attributes.comments.map((comment) =>
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
                            this.attributes.otherPosts
                                ? this.attributes.otherPosts.map((post) =>
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

        this.attributes.loading = true;

        try {
            [
                this.attributes.creator,
                this.attributes.post
            ] =
                await Promise.all([
                    api.creatorInfo(this.userId),
                    api.postInfo(this.userId, this.postId, true)
                ]);

            this.attributes.loading = false;

            this.attributes.otherPosts = (await api.postsInfo(this.userId)).filter(p => String(p.id) !== String(this.postId));

            this.attributes.comments = [];

            for (let i = 0; i < 50; ++i) {
                this.attributes.comments.push(
                    {
                        id: i,
                        user: {
                            username: 'IU7-memes',
                            avatar: 'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                        },
                        body: 'Ортодоксальный предикат порождает и индуцирует интеллигибельность. Абстрактно говоря, необычайная апперцепция осмысляет и рефлектирует экспрессионизм. Параллелизм генетивен. Актуализация, как ни странно, индуцирует и закрепляет за собой патристику. Безусловный предикат заполняет метафоризм. Апокатастас, обходя, отделяет парадокс. Космизм подчеркивает и подчеркивает здравый смысл. Откровенно говоря из ряда вон выходящая атомистика не всем ясна. Обскурантизм, траснсформируя, преобразует апперцепцию.',
                        published: new Date(new Date() - Math.round(60 * 1000 * 60 * 5 * Math.random()))
                    }
                );
            }

            this.attributes.comments = this.attributes.comments.sort((b, a) => a.published - b.published);
        } catch (e) {
            console.error(e);
            this.attributes.errorFirstLoading = true;
        }
    }
}

export default PostView;
