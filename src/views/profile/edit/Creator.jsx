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
import consts from '../../../consts';

class ProfileEditCreator extends Component {
    constructor () {
        super();
        this.attributes.loading = false;
        this.attributes.loadingAvatar = false;
        this.attributes.loadingCover = false;

        this.attributes.creator = null;
        this.attributes.levels = null;

        this.attributes.creatorDesc = '';
        this.attributes.creatorCategory = '';
        this.attributes.creatorError = '';

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
        if (!this.attributes.creatorCategory || !this.attributes.creatorDesc) {
            this.attributes.creatorError = 'Заполните все поля';
            return;
        }
        this.attributes.creatorError = '';

        this.attributes.loading = true;

        await api.creatorCreate({
            category: this.attributes.creatorCategory,
            description: this.attributes.creatorDesc
        });

        await user.update();
        await this.loadCreator();
    }

    async loadCreator (loading = true) {
        this.attributes.loading = loading;

        this.attributes.creator = await api.creatorInfo(user.user.id);

        this.attributes.loading = false;

        this.attributes.levels = await api.levelsInfo(user.user.id);
    }

    async uploadAvatar (file) {
        this.attributes.loadingAvatar = true;
        await api.uploadCreatorAvatar(file, user.user.id);

        await this.loadCreator(false);
        this.attributes.loadingAvatar = false;
    }

    async uploadCover (file) {
        this.attributes.loadingCover = true;
        await api.uploadCreatorCover(file, user.user.id);

        await this.loadCreator(false);
        this.attributes.loadingCover = false;
    }

    render () {
        if (this.attributes.loading) {
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
                        height='420px'
                        router-go={app.$router.createUrl('creator.level.create')}
                        src="/imgs/addLevel.svg"
                    />

                </div>
            </div>);
        }

        if (!this.attributes.creator) {
            return (<div className="profile-edit--little-width">
                <p className="profile-edit__subtitle">
                    {consts.createCreatorPage}
                </p>

                <InputField
                    onChange={(e) => {
                        this.attributes.creatorDesc = e.target.value;
                    }}
                    placeholder="Описание креатора"
                />

                <SelectComponent
                    inital='Выберите категорию'
                    onChange={value => {
                        this.attributes.creatorCategory = value;
                    }}
                    options={this.categories}
                    placeholder="Категория"
                />

                <br />

                {this.attributes.creatorError}

                <Button
                    color="primary"
                    onClick={
                        () => { this.createCreator(); }
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
                        image={this.attributes.creator.avatar}
                        imageName="аватар"
                        loading={this.attributes.loadingAvatar}
                        onChange={(image) => { this.uploadAvatar(image); }}
                    />

                    <ImageUploader
                        image={this.attributes.creator.cover}
                        imageName="обложку"
                        isCircle={false}
                        loading={this.attributes.loadingCover}
                        onChange={(image) => { this.uploadCover(image); }}
                    />
                </div>

                <p className="profile-edit__subtitle">
                    {consts.levelsOfSubscriptions}
                </p>

                <div className="profile-edit__levels-container">
                    {
                        this.attributes.levels
                            ? this.attributes.levels.map(level => (
                                <LevelCard
                                    benefits={level.benefits}
                                    btnText='Редактировать уровень'
                                    color={level.color}
                                    cover={level.cover}
                                    id={level.id}
                                    key={level.id}
                                    name={level.name}
                                    onClick={() => { app.$router.go(app.$router.createUrl('creator.level.edit', level.id)); }}
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
        this.loadCreator();
    }
}

export default ProfileEditCreator;
