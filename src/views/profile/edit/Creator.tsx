import api from '../../../api';
import Component from 'irbis/component';
import Button from 'ui-library/button';
import InputField from 'ui-library/input-field';
import SelectComponent from 'ui-library/select';
import user from '../../../storage/user';
import ImageUploader from 'ui-library/image-uploader';
import LevelCard from 'ui-library/level-card';
import app from 'irbis';
import Skeleton from 'ui-library/skeleton';
import ValidationError from 'ui-library/validation-error';
import consts from '../../../consts';
import { CreatorEntity, LevelWithParentEntity } from '../../../api/types';

class ProfileEditCreator extends Component<never, {
    loading: boolean,
    loadingAvatar: boolean,
    loadingCover: boolean,
    creator: CreatorEntity,
    levels: LevelWithParentEntity[],
    //
    creatorDesc: string,
    creatorCategory: string,
    creatorError?: string
}> {
    categories: string[];

    constructor () {
        super();
        this.state.loading = false;
        this.state.loadingAvatar = false;
        this.state.loadingCover = false;

        this.state.creator = null;
        this.state.levels = null;

        this.state.creatorDesc = '';
        this.state.creatorCategory = '';
        this.state.creatorError = null;

        this.categories = [
            'Подкасты',
            'Музыканты',
            'Художники',
            'Писатели и журналисты',
            'Видеоблогер',
            'Образование',
            'Программирование',
            'Другое'
        ];
    }

    async createCreator () {
        if (!this.state.creatorCategory || !this.state.creatorDesc) {
            this.state.creatorError = 'Заполните все поля';
            return;
        }

        this.state.loading = true;

        await api.creatorCreate({
            category: this.state.creatorCategory,
            description: this.state.creatorDesc
        });

        await user.update();
        await this.loadCreator();
    }

    async loadCreator (loading = true) {
        this.state.loading = loading;

        this.state.creator = await api.creatorInfo(user.user.id);

        this.state.loading = false;

        this.state.levels = await api.levelsInfo(user.user.id);
    }

    async uploadAvatar (file:File) {
        this.state.loadingAvatar = true;
        await api.uploadCreatorAvatar(file, user.user.id);

        await this.loadCreator(false);
        this.state.loadingAvatar = false;
    }

    async uploadCover (file:File) {
        this.state.loadingCover = true;
        await api.uploadCreatorCover(file, user.user.id);

        await this.loadCreator(false);
        this.state.loadingCover = false;
    }

    render () {
        if (this.state.loading) {
            return (<div>
                <p className="profile-edit__subtitle">
                    {consts.profileDesign}
                </p>

                <div className="edit-creator__images">
                    <Skeleton
                        height={217}
                        type="circle"
                        width={217}
                    />

                    <Skeleton
                        height={233}
                        width={900}
                    />
                </div>

                <p className="profile-edit__subtitle">
                    {consts.levelsOfSubscriptions}
                </p>

                <div className="profile-edit__levels-container">
                    <Skeleton
                        height={420}
                        width={260}
                    />

                    <img
                        height="420px"
                        router-go={app.$router.createUrl('creator.level.create')}
                        src="/imgs/addLevel.svg"
                    />

                </div>
            </div>);
        }

        if (!this.state.creator) {
            return (<div className="profile-edit--little-width">
                <p className="profile-edit__subtitle">
                    {consts.createCreatorPage}
                </p>

                <InputField
                    onChange={(e) => {
                        this.state.creatorDesc = e.target.value;
                    }}
                    placeholder="Описание креатора"
                />

                <SelectComponent
                    inital="Выберите категорию"
                    onChange={value => {
                        this.state.creatorCategory = value;
                    }}
                    options={this.categories}
                    placeholder="Категория"
                />

                { /* <br /> */}

                <div className="input-validation">
                    {
                        this.state.creatorError
                            ? <ValidationError
                                value={this.state.creatorError}
                                key={null}
                            />
                            : null
                    }
                </div>

                <Button
                    color="primary"
                    onClick={
                        () => {
                            this.createCreator();
                        }
                    }
                    text="Стать автором"
                />
            </div>);
        }
        return (
            <div>
                <p className="profile-edit__subtitle">
                    {consts.profileDesign}
                </p>

                <div className="edit-creator__images">
                    <ImageUploader
                        image={this.state.creator.avatar}
                        imageName="аватар"
                        loading={this.state.loadingAvatar}
                        onChange={(image) => {
                            this.uploadAvatar(image);
                        }}
                    />

                    <ImageUploader
                        image={this.state.creator.cover}
                        imageName="обложку"
                        isCircle={false}
                        loading={this.state.loadingCover}
                        onChange={(image) => {
                            this.uploadCover(image);
                        }}
                    />
                </div>

                <p className="profile-edit__subtitle">
                    {consts.levelsOfSubscriptions}
                </p>

                <div className="profile-edit__levels-container">
                    {
                        this.state.levels
                            ? this.state.levels.map(level => (
                                <LevelCard
                                    benefits={level.benefits}
                                    btnText="Редактировать уровень"
                                    color={level.color}
                                    cover={level.cover}
                                    id={level.id}
                                    key={level.id}
                                    name={level.name}
                                    onClick={() => {
                                        app.$router.go(app.$router.createUrl('creator.level.edit', level.id));
                                    }}
                                    parentName={level.parentName}
                                    price={level.price}
                                />
                            ))
                            : <Skeleton
                                width={260}
                                height={420}
                            />

                    }

                    <img
                        style="width: 260px;height: 420px;"
                        router-go={app.$router.createUrl('creator.level.create')}
                        src="/imgs/addLevel.svg"
                    />

                </div>
            </div>
        );
    }

    async created () {
        await this.loadCreator();
    }
}

export default ProfileEditCreator;
