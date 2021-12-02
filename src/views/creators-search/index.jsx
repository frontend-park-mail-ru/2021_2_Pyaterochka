import api from '../../api/index';
import Component from 'irbis/component';
import CreatorCard from 'ui-library/creator-card';
import InputField from 'ui-library/input-field';
import SelectComponent from 'ui-library/select';
import ErrorPage from '../errorpage';

import './style.scss';

const all = 'Любая категория';

class CreatorsSearch extends Component {
    constructor () {
        super();

        this.state.searchQuery = '';
        this.state.searchCategory = all;
        this.state.creators = [];
        this.state.popularCreators = [];

        this.state.categories = [all];
    }

    render () {
        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }

        return (
            <div>
                <h1 className="text-center">
                    Поиск авторов:
                </h1>

                <div className='search__fields-container'>
                    <InputField
                        placeholder="Поле поиска"
                        onInput={
                            (e) => {
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
                                return (<CreatorCard
                                    key={creator.id}
                                    id={creator.id}
                                    name={creator.name}
                                    avatar={creator.avatar}
                                    description={creator.description}
                                />);
                            })}
                        </div>
                        : <h2 className="text-center">
                            Ничего не найдено
                        </h2>
                    : <div>
                        <h2 className="text-center">
                            Популярные авторы:
                        </h2>

                        <div className="creators-container">
                            {this.state.popularCreators.map((creator) => {
                                return (<CreatorCard
                                    key={creator.id}
                                    id={creator.id}
                                    name={creator.name}
                                    avatar={creator.avatar}
                                    description={creator.description}
                                />);
                            })}
                        </div>
                    </div>}

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

        this.state.popularCreators = await api.creators();
    }
}

export default CreatorsSearch;
