import api from '../../api';
import Component from 'irbis/component';
import EditorComponent from 'ui-library/editor';
import app from 'irbis';
import user from '../../storage/user';
import LoadingView from '../loading-view';
import ConfirmComponent from 'ui-library/confirm';
import ErrorPage from '../errorpage';

class CreatePostView extends Component {
    defaultProps () {
        return {
            route: null
        };
    }

    constructor () {
        super();
        this.attributes.loading = 'Загрузка записи';
        this.attributes.deleteWarning = false;
        this.attributes.levels = [];
        this.attributes.post = null;
    }

    render () {
        if (this.attributes.errorFirstLoading) {
            return <ErrorPage desc="Ошибка загрузки" />;
        }

        if (this.attributes.deleteWarning) {
            return (<ConfirmComponent
                dangerButton="Удалить"
                description="Данное действие не возможно будет отменить"
                onDanger={
                    () => {
                        this.deletePost();
                    }
                }
                onPositive={
                    () => {
                        this.attributes.deleteWarning = false;
                    }
                }
                positiveButton="Отмена"
                title="Удаление записи"
            />);
        }

        if (this.attributes.loading) {
            return (<LoadingView>
                {this.attributes.loading}
            </LoadingView>);
        }
        return (<div>
            <h1 className="text-center">
                Редактирование записи
            </h1>

            <EditorComponent
                activeLevel={this.post.levelId}
                body={Object.assign(this.post.body)}
                cover={this.post.image}
                description={this.post.description}
                isDraft={false}
                levels={this.attributes.levels.map(({ name, id }) => {
                    return {
                        title: name,
                        id
                    };
                })}
                onDelete={(post) => { this.deletePost(post); }}
                onLoadCover={async (file) => await this.loadCover(file)}
                onLoadImage={async (file) => await this.loadImage(file)}
                onLoadFile={async (file, type) => await this.loadFile(file, type)}
                onSave={(post) => { this.savePost(post); }}
                title={this.post.title}
            />
        </div>);
    }

    async loadCover (file) {
        await api.uploadPostCover(file, user.user.id, this.postId);
        const post = await api.postInfo(user.user.id, this.postId);
        this.post.image = post.image;
        return post.image;
    }

    async loadImage (file) {
        const res = await api.uploadPostImage(file, user.user.id, this.postId);

        const data = await res.json();
        return data;
    }

    async loadFile (file, type) {
        const res = await api.uploadPostAttach(file, type, user.user.id, this.postId);

        const data = await res.json();
        return data;
    }

    async savePost ({
        title,
        description,
        body,
        levelId
    }) {
        this.attributes.loading = 'Обновление записи';

        await api.updatePost({
            postId: this.postId,
            userId: user.user.id,
            title,
            description,
            attaches: body,
            levelId
        });

        app.$router.go(app.$router.createUrl('post.view', `${user.user.id}/${this.postId}`));
    }

    async deletePost (post) {
        if (post) {
            this.post = post;
        }
        if (!this.attributes.deleteWarning) {
            this.attributes.deleteWarning = true;
            return;
        }

        this.attributes.loading = 'Удаление записи';

        await api.removePost({
            postId: this.postId,
            creatorId: user.user.id
        });

        app.$router.go(app.$router.createUrl('creator', `${user.user.id}`));
    }

    async propsChanged () {
        try {
            this.postId = parseInt(this.props.route.data);

            this.attributes.loading = 'Загрузка записи';

            const post = await api.postInfo(user.user.id, this.postId);

            this.post = post;

            this.attributes.loading = 'Загрузка уровней';

            this.attributes.levels = await api.levelsInfo(user.user.id);

            this.attributes.loading = false;
        } catch (e) {
            this.attributes.errorFirstLoading = true;
        }
    }
}

export default CreatePostView;
