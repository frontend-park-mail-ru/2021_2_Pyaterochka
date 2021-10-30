import Component from '../../components/basecomponent';
import CreatorCard from '../../components/creator-card';
import Comment from '../../components/comment';
import './view.scss';
import InputField from '../../components/input-field';
import Button from '../../components/button';
import Like from '../../components/like';
import PostHeaderComponent from '../../components/post-header';

class PostView extends Component {
    constructor () {
        super();
        this.attributes.post = null;
        this.attributes.author = [];
        this.attributes.otherPosts = [];
    }

    render () {
        return (
            <div className="post-page">
                <div
                    className="post-cover"
                    style={`background-image:url(${this.attributes.post.image}`}
                ></div>

                <div className="post-page__container">
                    <div className="post-page__container__left">

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
                                title={this.attributes.post.title}
                                published={this.attributes.post.published}
                                views={this.attributes.post.views}
                            />
                            {
                                this.attributes.post.body.map((text, i) => <p key={i} className="post__text">{text}</p>)
                            }

                            <div className="post__actions">
                                <Like count={this.attributes.post.likes} user={true} />
                                <Button text="Редактировать" color="grey" />
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
                                    <span className="add-comment__actions__warn"> Пожалуйста,  уважайте участников сообщества</span>
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
                            this.attributes.otherPosts.map((post, i) =>
                                <PostHeaderComponent
                                    key={i}
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
        this.attributes.creator = {
            id: 0,
            name: 'IU7-memes',
            description: 'создает мемы из закулисий цирка',
            avatar: 'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album',
            cover: 'https://sun9-32.userapi.com/impf/adHV39RxzhK4WR5F5jATKuoEAOJ1bJrbpl_mqg/cbYQA5UNtlg.jpg?size=795x200&quality=95&crop=0,0,1590,400&sign=2ffcff16ba49a336f42b603af92122d4&type=cover_group'
        };

        this.attributes.post = {
            title: 'Новый выпуск игрового ролика о невероятных машинах нашего времени',
            published: new Date(new Date() - 60 * 1000 * 60 * 5),
            views: 10000,
            likes: 5000,
            opened: true,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
            level: 'Профессионал',
            image: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg',
            body: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget euismod vulputate in varius odio lorem porttitor. Fermentum nisl vel purus tempor. Interdum eu mattis ipsum egestas enim, maecenas. At ultricies enim amet sed id eget proin. Viverra urna fermentum vitae laoreet et, venenatis ac. Condimentum sed sed odio faucibus. Sollicitudin nunc, posuere rhoncus nullam diam aenean dictum ornare feugiat.',
                'Sit feugiat quis hac sit tincidunt dictum. Pharetra nibh sagittis, pharetra odio platea hac congue. Commodo elit lorem et scelerisque volutpat, malesuada. Nunc et mauris, netus lectus dictum purus, a tincidunt. Duis non sed ut nisi. Fermentum ut consequat sed urna magnis mauris non nunc. A phasellus venenatis, dignissim magna fringilla at natoque arcu. Tempus, laoreet aliquet natoque sit. Tristique congue sed consequat, nam. Amet in fames odio nibh pharetra sit sagittis, auctor pharetra. Lacus viverra vel, dolor convallis leo suspendisse vestibulum amet sed. Integer eu sed eu, sem vivamus mi netus metus. Amet tempor, facilisis tempus laoreet neque consequat, tincidunt. Cursus nec vel dignissim donec maecenas ut sagittis, elementum quam.'
            ]
        };

        this.attributes.otherPosts = [
            {
                title: 'Новый выпуск игрового ролика о невероятных машинах нашего времени',
                published: new Date(new Date() - 60 * 1000 * 60 * 5),
                views: 10000,
                likes: 5000,
                opened: true,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
                level: 'Профессионал',
                image: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
            },
            {
                title: 'Новый выпуск игрового ролика о невероятных машинах нашего времени',
                published: new Date(new Date() - 60 * 1000 * 60 * 5),
                views: 10000,
                likes: 5000,
                opened: false,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
                level: 'Профессионал',
                image: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
            }
        ];

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
