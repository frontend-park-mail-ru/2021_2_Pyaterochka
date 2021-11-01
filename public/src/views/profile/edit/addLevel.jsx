import api from '../../../api';
import Component from '../../../components/basecomponent';
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import app from '../../../core/app';
import user from '../../../storage/user';

import './style.scss';

class CreatorAddLevel extends Component {
    constructor () {
        super();

        this.attributes.loading = false;
    }

    async addTest () {
        this.attributes.loading = true;

        await api.levelCreate(
            {
                name: 'Тестовый уровень',
                price: 15,
                creatorId: user.user.id,
                benefits: [
                    'тест1',
                    'тест2',
                    'тест3'
                ]
            }
        );
        app.$router.go(app.$router.createUrl('profile.edit', 'creator_settings'));
    }

    render () {
        if (!user.user) return <div></div>;
        if (this.attributes.loading) return <Spinner />;

        return <div className="profile-edit">
            <h1 className="profile-edit__title">
                Создание уровня подписки
            </h1>
            <p className="profile-edit__subtitle">
                <b> Данная страница в разработке</b>
            </p>

            <Button text="Добавить тестовый уровень" color="primary" onClick={
                () => { this.addTest(); }
            } />

        </div>;
    }
}

export default CreatorAddLevel;
