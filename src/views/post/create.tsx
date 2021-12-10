import api from '../../api';
import app from 'irbis';
import Component from 'irbis/component';
import EditorComponent, { PostExportType } from 'ui-library/editor';
import ErrorPage from '../errorpage';
import LoadingView from '../loading-view';
import user from '../../storage/user';
import { LevelEntity } from '../../api/types';

class CreatePostView extends Component<never, {
    loading: false | string,
    levels: LevelEntity[],
    errorFirstLoading: boolean
}> {
    constructor () {
        super();
        this.state.loading = false;
        this.state.levels = [];
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
                <LoadingView>
                    {this.state.loading}
                </LoadingView>
            );
        }

        return (<div>
            <h1 className="text-center">
                Создать новую запись
            </h1>

            <EditorComponent
                isDraft
                levels={this.state.levels.map(({ name, id }) => {
                    return {
                        title: name,
                        id: Number(id)
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
    }: PostExportType) {
        if (!title) {
            return;
        }

        this.state.loading = 'Сохранение черновика';

        const data = await api.createPost({
            userId: user.user.id,
            title,
            description,
            levelId
        });

        app.$router.go(app.$router.createUrl('post.edit', `${data.id}`));
    }

    async created () {
        try {
            this.state.loading = 'Загрузка уровней';
            this.state.levels = await api.levelsInfo(user.user.id);
            this.state.loading = false;
        } catch {
            this.state.errorFirstLoading = true;
        }
    }
}

export default CreatePostView;
