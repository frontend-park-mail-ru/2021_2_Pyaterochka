import Component from '../../components/basecomponent';
import CreatorCard from '../../components/creator-card';
import Comment from '../../components/comment';
import './view.scss';
import InputField from '../../components/input-field';
import Button from '../../components/button';
import Like from '../../components/like';
import PostHeaderComponent from '../../components/post-header';
import api from '../../api';
import ErrorPage from '../errorpage';
import LoadingView from '../loading-view';
import user from '../../storage/user';
import app from '../../core/app';

class PostView extends Component {
    constructor () {
        super();
        this.attributes.post = null;
        this.attributes.author = [];
        this.attributes.otherPosts = [];
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
        if (this.attributes.loading) { return <LoadingView />; }

        if (!this.attributes.loading && !this.attributes.post) { return <ErrorPage err={404} desc="Запись не найдена" />; }
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
                                clickable={true}
                                id={this.attributes.creator.id}
                                name={this.attributes.creator.name}
                                avatar={this.attributes.creator.avatar}
                                description={this.attributes.creator.description}
                                shadow={true}
                                noHoverShadow={true}
                            />

                            <hr />

                            <PostHeaderComponent
                                id={this.attributes.post.id}
                                creatorId={this.attributes.post.creatorId}
                                title={this.attributes.post.title}
                                published={this.attributes.post.published}
                                views={this.attributes.post.views}
                            />
                            {
                                this.attributes.post.body.map((text, i) => <p key={i} className="post__text">{text.text}</p>)
                            }

                            <div className="post__actions">
                                <Like count={this.attributes.post.likes} user={true} liked={this.attributes.post.liked} onClick={() => {
                                    this.like();
                                }}/>

                                {
                                    user.user && String(this.userId) === String(user.user.id)
                                        ? <Button text="Редактировать" color="primary" onClick={
                                            () => {
                                                app.$router.go(app.$router.createUrl('post.edit', this.postId));
                                            }
                                        } />
                                        : <></>
                                }
                            </div>

                        </div>

                        <div className="comments-container">
                            <div className="add-comment">
                                <div className="add-comment__title">
                                    Оставить комментарий
                                </div>
                                <InputField
                                    placeholder="Текст комментария"
                                    validation={[
                                        // (v) => !v ? 'Поле не должно быть пустым' : null
                                    ]}
                                />

                                <div className="add-comment__actions">
                                    <Button color="primary" text="Отправить" />
                                    <span className="add-comment__actions_warn"> Пожалуйста,  уважайте участников сообщества</span>
                                </div>
                            </div>

                            {
                                this.attributes.comments.map((comment) =>
                                    <Comment
                                        key={comment.id}
                                        user={comment.user}
                                        published={comment.published}
                                        body={comment.body}
                                    />)
                            }
                        </div>

                    </div>
                    <div className="other-posts">
                        <p className="other-posts__title">
                            Также у автора
                        </p>
                        <hr />
                        {
                            this.attributes.otherPosts.map((post) =>
                                <PostHeaderComponent
                                    key={post.id}
                                    id={post.id}
                                    creatorId={post.creatorId}
                                    size="20px"
                                    title={post.title}
                                    published={post.published}
                                    views={post.views}
                                    likes={post.likes}
                                />
                            )
                        }
                    </div>

                </div>

            </div>
        );
    }

    async created () {
        [this.userId, this.postId] = this.data.split('/');

        this.attributes.loading = true;

        [
            this.attributes.creator,
            this.attributes.post
        ] =
            await Promise.all([
                api.creatorInfo(this.userId),
                api.postInfo(this.userId, this.postId)
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
    }
}

export default PostView;
