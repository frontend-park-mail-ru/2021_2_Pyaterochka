import api from '../../api/index';
import Component from '../../components/basecomponent';
import CreatorCard from '../../components/creator-card';
import InputField from '../../components/input-field';
import SelectComponent from '../../components/select';

import './style.scss';
const all = 'Любая категория';

class ProfileView extends Component {
    constructor () {
        super();

        this.attributes.searchQuery = '';
        this.attributes.searchCategory = all;
        this.attributes.creators = [];

        this.attributes.categories = [all];
    }

    render () {
        return (
            <div>
                <h1 className="text-center">
                    Поиск авторов:
                </h1>

                <div className='search__fields-container'>
                    <InputField
                        placeholder="Поле поиска"
                        onInput={
                            (e, value) => {
                                this.attributes.searchQuery = e.target.value;
                                this.onUpdate();
                            }
                        }
                        value={this.attributes.searchQuery} />

                    <SelectComponent
                        onChange={
                            (value) => {
                                this.attributes.searchCategory = value;
                                this.loadCreators();
                            }
                        }
                        value={this.attributes.searchQuery}
                        options={this.attributes.categories} />
                </div>

                {this.attributes.searchQuery
                    ? this.attributes.creators.length
                        ? <div className="creators-container">
                            {this.attributes.creators.map((creator) => {
                                return (new CreatorCard(creator)).renderReactive();
                            })}
                        </div>
                        : <h2 className="text-center">
                            Ничего не найдено
                        </h2>
                    : <h2 className="text-center">
                        Сначала введите поисковый запрос
                    </h2>}

            </div>
        );
    }

    onUpdate () {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }

        this.timerId = setTimeout(() => {
            this.timerId = null;
            this.loadCreators();
        }, 300);
    }

    async loadCreators () {
        this.attributes.creators = await api.creatorsSearch({
            query: this.attributes.searchQuery,
            category: this.attributes.searchCategory === all ? '' : this.attributes.searchCategory
        });
        // const p = new URLSearchParams({
        //     query: this.attributes.searchQuery,
        //     category: this.attributes.searchCategory
        // });
        // location.hash = p.toString();
    }

    async created () {
        // try {
        //     console.log(location.hash.substr(1))
        //     const urlSearchParams = new URLSearchParams(location.hash.substr(1));

        //     console.log(urlSearchParams)

        //     const query = urlSearchParams.get('query');
        //     const category = urlSearchParams.get('category');

        //     if (query && category) {

        //         this.attributes.searchQuery = query;
        //         this.attributes.searchCategory = category;
        //         return;
        //     }
        //     throw '';
        // } catch {
        //     location.hash = '';
        // }

        const info = await api.info();
        this.attributes.categories = [all, ...info.category];
    }
}

export default ProfileView;
