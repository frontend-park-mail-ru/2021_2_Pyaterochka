import api from '../../../api';
import Component from '../../../components/basecomponent';
import Button from '../../../components/button';
import InputField from '../../../components/input-field';
import SelectComponent from '../../../components/select';
import Spinner from '../../../components/spinner';
import user from '../../../storage/user';
import ImageUploader from '../../../components/image-uploader';
import LevelCard from '../../../components/level-card';
import app from '../../../core/app';
import Skeleton from '../../../components/skeleton';

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

        await this.loadCreator();
    }

    async loadCreator () {
        this.attributes.loading = true;

        this.attributes.creator = await api.creatorInfo(user.user.id);

        this.attributes.loading = false;

        this.attributes.levels = await api.levelsInfo(user.user.id);
    }

    async uploadAvatar (file) {
        this.attributes.loadingAvatar = true;
        await api.uploadCreatorAvatar(file, user.user.id);

        await this.loadCreator();
        this.attributes.loadingAvatar = false;
    }

    async uploadCover (file) {
        this.attributes.loadingCover = true;
        await api.uploadCreatorCover(file, user.user.id);

        await this.loadCreator();
        this.attributes.loadingCover = false;
    }

    render () {
        if (this.attributes.loading) {
            return <Spinner />;
        }

        if (!this.attributes.creator) {
            return <div className="profile-edit--little-width">
                <p className="profile-edit__subtitle">
                    Создание учетной записи автора
                </p>

                <InputField placeholder="Описание креатора" onChange={(e) => {
                    this.attributes.creatorDesc = e.target.value;
                }} />
                <SelectComponent
                    placeholder="Категория"
                    inital='Выберите категорию'
                    onChange={value => {
                        this.attributes.creatorCategory = value;
                    }}
                    options={this.categories}
                />
                <br />

                {this.attributes.creatorError}

                <Button text="Стать автором" color="primary" onClick={
                    () => { this.createCreator(); }
                } />
            </div>;
        }
        return (
            <div>
                <p className="profile-edit__subtitle">
                    Оформление профиля
                </p>
                <div className="edit-creator__images">
                    <ImageUploader
                        image={this.attributes.creator.avatar}
                        loading={this.attributes.loadingAvatar}
                        imageName="аватар"
                        onChange={(image) => { this.uploadAvatar(image); }}
                    />
                    <ImageUploader
                        image={this.attributes.creator.cover}
                        loading={this.attributes.loadingCover}
                        isCircle={false}
                        imageName="обложку"
                        onChange={(image) => { this.uploadCover(image); }}
                    />
                </div>

                <p className="profile-edit__subtitle">
                    Уровни подписки
                </p>

                <div className="profile-edit__levels-container">
                    {
                        this.attributes.levels
                            ? this.attributes.levels.map(level => (
                                <LevelCard
                                    key={level.id}
                                    id={level.id}
                                    name={level.name}
                                    benefits={level.benefits}
                                    cover={level.cover}
                                    price={level.price}
                                    color={level.color}
                                />
                            ))
                            : <Skeleton width={260} height={420} />

                    }

                    <img
                        src="/imgs/addLevel.svg"
                        height='420px'
                        router-go={app.$router.createUrl('creator.level.create')}
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
