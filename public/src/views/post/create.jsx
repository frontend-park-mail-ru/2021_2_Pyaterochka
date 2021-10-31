import api from '../../api';
import Component from '../../components/basecomponent';
import EditorComponent from '../../components/editor';
import app from '../../core/app';
import user from '../../storage/user';
import LoadingView from '../loading-view';

class CreatePostView extends Component {
    constructor () {
        super();
        this.attributes.loading = false;
    }

    render () {
        return <div>
            {this.attributes.loading
                ? <LoadingView>
                    Сохранение записи
                </LoadingView>
                : <>
                    <h1 className="text-center">Создать новую запись</h1>
                    <EditorComponent isDraft={true} onSave={(post) => { this.savePost(post); }}/>
                </>
            }
        </div>;
    }

    async savePost ({
        title,
        description,
        body
    }) {
        console.log(title, description, body);

        this.attributes.loading = true;

        const data = await api.createPost({
            userId: user.user.id,
            title,
            description,
            body
        });

        app.$router.go(app.$router.createUrl('post.view', `${user.user.id}/${data.id}`));
    }
}

export default CreatePostView;
