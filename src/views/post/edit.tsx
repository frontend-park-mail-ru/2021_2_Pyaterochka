import app from 'irbis';
import Component from 'irbis/component';
import ConfirmComponent from 'ui-library/confirm';
import EditorComponent, { PostExportType } from 'ui-library/editor';
import ErrorPage from '../errorpage';
import LoadingView from '../loading-view';
import Route from '../../../modules/irbis-router/route';
import user from '../../storage/user';
import { LevelEntity, PostEntity } from '../../api/types';
import * as api from '../../api';

class CreatePostView extends Component<{
    route: Route
}, {
    loading: false | string,
    deleteWarning: boolean,
    levels: LevelEntity[],
    post?: PostEntity,
    errorFirstLoading?: boolean
}> {
    post?: {
        levelId?,
        title?,
        body?,
        image?,
        description?,
    };

    postId: number;

    defaultProps () {
        return {
            route: null
        };
    }

    constructor () {
        super();
        this.state.loading = 'Загрузка записи';
        this.state.deleteWarning = false;
        this.state.levels = [];
        this.state.post = null;
    }

    render () {
        // if (this.state.errorFirstLoading) {
        //     return <ErrorPage desc="Нет соединения с интернетом" />;
        // }

        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }

        if (this.state.deleteWarning) {
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
                        this.state.deleteWarning = false;
                    }
                }
                positiveButton="Отмена"
                title="Удаление записи"
            />);
        }

        if (this.state.loading) {
            return (<LoadingView>
                {this.state.loading}
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
                levels={this.state.levels.map(({
                    name,
                    id
                }) => {
                    return {
                        title: name,
                        id: Number(id)
                    };
                })}
                onDelete={(post) => {
                    this.deletePost(post);
                }}
                onLoadCover={async (file) => await this.loadCover(file)}
                onLoadImage={async (file) => await this.loadImage(file)}
                onLoadFile={async (file, type) => await this.loadFile(file, type)}
                onSave={(post) => {
                    this.savePost(post);
                }}
                title={this.post.title}
            />
        </div>);
    }

    async loadCover (file: File) {
        await api.uploadPostCover(file, user.user.id, this.postId);
        const post = await api.postInfo(user.user.id, this.postId);
        this.post.image = post.image;
        return post.image;
    }

    async loadImage (file: File) {
        const res = await api.uploadPostImage(file, user.user.id, this.postId);

        return await res.json();
    }

    async loadFile (file: File, type: string) {
        const res = await api.uploadPostAttach(file, type, user.user.id, this.postId);

        return await res.json();
    }

    async savePost ({
        title,
        description,
        body,
        levelId
    }: PostExportType) {
        this.state.loading = 'Обновление записи';

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

    async deletePost (post?: PostExportType) {
        if (post) {
            this.post = post;
        }
        if (!this.state.deleteWarning) {
            this.state.deleteWarning = true;
            return;
        }

        this.state.loading = 'Удаление записи';

        await api.removePost({
            postId: this.postId,
            creatorId: user.user.id
        });

        app.$router.go(app.$router.createUrl('creator.panel'));
    }

    async propsChanged () {
        try {
            this.postId = parseInt(this.props.route.data);

            this.state.loading = 'Загрузка записи';

            this.post = await api.postInfo(user.user.id, this.postId);

            this.state.loading = 'Загрузка уровней';

            this.state.levels = await api.levelsInfo(user.user.id);

            this.state.loading = false;
        } catch (e) {
            this.state.errorFirstLoading = true;
        }
    }
}

export default CreatePostView;
