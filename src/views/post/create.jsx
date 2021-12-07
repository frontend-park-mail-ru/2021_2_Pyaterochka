import api from '../../api';
import Component from 'irbis/component';
import EditorComponent from 'ui-library/editor';
import app from 'irbis';
import user from '../../storage/user';
import ErrorPage from '../errorpage';
import LoadingView from '../loading-view';

class CreatePostView extends Component {
    constructor () {
        super();
        this.attributes.loading = false;
        this.attributes.levels = [];
    }

    render () {
        // if (this.attributes.errorFirstLoading) {
        //     return <ErrorPage desc="Нет соединения с интернетом" />;
        // }

        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }

        if (this.attributes.loading) {
            return (
                <LoadingView>
                    {this.attributes.loading}
                </LoadingView>
            );
        }

        return (<div>
            <h1 className="text-center">
                Создать новую запись
            </h1>

            <EditorComponent
                isDraft
                levels={this.attributes.levels.map(({ name, id }) => {
                    return {
                        title: name,
                        id
                    };
                })}
                onSave={(post) => { this.savePost(post); }}
            />
        </div>);
    }

    async savePost ({
        title,
        description,
        levelId
    }) {
        if (!title) {
            return;
        }

        this.attributes.loading = 'Сохранение черновика';

        const data = await api.createPost({
            userId: user.user.id,
            title,
            description,
            levelId,
            body: []
        });

        app.$router.go(app.$router.createUrl('post.edit', `${data.id}`));
    }

    async created () {
        try {
            this.attributes.loading = 'Загрузка уровней';
            this.attributes.levels = await api.levelsInfo(user.user.id);
            this.attributes.loading = false;
        } catch {
            this.attributes.errorFirstLoading = true;
        }
    }
}

export default CreatePostView;
