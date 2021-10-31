import api from '../../../api';
import Component from '../../../components/basecomponent';
import Button from '../../../components/button';
import InputField from '../../../components/input-field';
import Spinner from '../../../components/spinner';
import user from '../../../storage/user';

class ProfileEditCreator extends Component {
    constructor () {
        super();
        this.attributes.loading = false;
        this.attributes.creator = null;

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
    }

    render () {
        return (
            <div>
                {
                    this.attributes.loading
                        ? <Spinner />
                        : !this.attributes.creator
                            ? <div className="profile-edit--little-width">
                                <p className="profile-edit__subtitle">
                                    Создание учетной записи автора
                                </p>

                                <InputField placeholder="Описание креатора" onChange={(e) => {
                                    this.attributes.creatorDesc = e.target.value;
                                }} />
                                <div>
                                    Категория автора:
                                    <select onChange={(e) => {
                                        this.attributes.creatorCategory = e.target.value;
                                    }}>
                                        <option disabled selected> Выберите категорию </option>
                                        {
                                            this.categories.map((category, i) => (
                                                <option key={i}> {category} </option>
                                            ))
                                        }
                                    </select>

                                </div>
                                <br />

                                {this.attributes.creatorError}

                                <Button text="Стать автором" color="primary" onClick={
                                    () => { this.createCreator(); }
                                } />
                            </div>
                            : <>
                                Вы уже стали креатором!

                                <br />

                                Скоро здесь будет больше настроек
                            </>

                }
            </div>
        );
    }

    async created () {
        this.loadCreator();
    }
}

export default ProfileEditCreator;
