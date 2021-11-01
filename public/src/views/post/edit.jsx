import api from '../../api';
import Component from '../../components/basecomponent';
import EditorComponent from '../../components/editor';
import app from '../../core/app';
import user from '../../storage/user';
import LoadingView from '../loading-view';

class CreatePostView extends Component {
    constructor () {
        super();
        this.attributes.loading = 'Загрузка записи';
        this.attributes.post = null;
    }

    render () {
        return <div>
            {this.attributes.loading
                ? <LoadingView>
                    {this.attributes.loading}
                </LoadingView>
                : <>
                    <h1 className="text-center">Редактирование записи</h1>
                    <EditorComponent
                        title={this.post.title}
                        description={this.post.description}
                        body={Object.assign(this.post.body)}

                        isDraft={false}
                        onSave={(post) => { this.savePost(post); }}
                    />
                </>
            }
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
