import api from '../../api';
import Component from '../../components/basecomponent';
import EditorComponent from '../../components/editor';
import app from '../../core/app';
import user from '../../storage/user';
import LoadingView from '../loading-view';
import ConfirmComponent from '../../components/confirm';

class CreatePostView extends Component {
    constructor () {
        super();
        this.attributes.loading = 'Загрузка записи';
        this.attributes.deleteWarning = false;
        this.attributes.post = null;
    }

    render () {
        if (this.attributes.deleteWarning) {
            return <ConfirmComponent
                title="Удаление записи"
                description="Данное действие не возможно будет отменить"
                dangerButton="Удалить"
                positiveButton="Отмена"
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
            />;
        }

        if (this.attributes.loading) {
            return <LoadingView>
                {this.attributes.loading}
            </LoadingView>;
        }
        return <div>
            <h1 className="text-center">Редактирование записи</h1>
            <EditorComponent
                title={this.post.title}
                description={this.post.description}
                body={Object.assign(this.post.body)}

                isDraft={false}
                onSave={(post) => { this.savePost(post); }}
                onDelete={(post) => { this.deletePost(post); }}
            />
        </div>;
    }

    async savePost ({
        title,
        description,
        body
    }) {
        this.attributes.loading = 'Обновление записи';

        await api.updatePost({
            postId: this.postId,
            oldBodyIds: this.oldBodyIds,
            userId: user.user.id,
            title,
            description,
            body
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

    async created () {
        this.postId = parseInt(this.data);

        this.attributes.loading = 'Загрузка записи';

        const post = await api.postInfo(user.user.id, this.postId);

        this.post = post;

        this.oldBodyIds = post.body.map((b) => b.id);

        this.attributes.loading = false;
    }
}

export default CreatePostView;
