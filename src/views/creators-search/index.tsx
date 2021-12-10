import Component from 'irbis/component';
import CreatorCard from 'ui-library/creator-card';
import ErrorPage from '../errorpage';
import InputField from 'ui-library/input-field';
import SelectComponent from 'ui-library/select';
import { CreatorEntity } from '../../api/types';
import * as api from '../../api/index';
import './style.scss';

const all = 'Любая категория';

class CreatorsSearch extends Component<never, {
    searchQuery: string,
    searchCategory: string | typeof all
    creators: CreatorEntity[],
    popularCreators: CreatorEntity[]
    categories: string[]
}> {
    // eslint-disable-next-line no-undef
    timerId: NodeJS.Timeout;

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

                <div className="search__fields-container">
                    <InputField
                        placeholder="Поле поиска"
                        onInput={
                            (e) => {
                                this.state.searchQuery = e.target.value;
                                this.onUpdate();
                            }
                        }
                        value={this.state.searchQuery} />

                    <SelectComponent
                        inital={all}
                        options={this.state.categories}
                        placeholder="Категория"
                        onChange={
                            (value: string) => {
                                this.state.searchCategory = value;
                                this.loadCreators();
                            }
                        }
                    />
                </div>

                {this.state.searchQuery
                    ? this.state.creators.length
                        ? <div className="creators-container">
                            {this.state.creators.map((creator) => {
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
        this.state.creators = await api.creatorsSearch({
            query: this.state.searchQuery,
            category: this.state.searchCategory === all ? '' : this.state.searchCategory
        });
        // const p = new URLSearchParams({
        //     query: this.state.searchQuery,
        //     category: this.state.searchCategory
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

        //         this.state.searchQuery = query;
        //         this.state.searchCategory = category;
        //         return;
        //     }
        //     throw '';
        // } catch {
        //     location.hash = '';
        // }

        const info = await api.info();
        this.state.categories = [all, ...info.category];

        this.state.popularCreators = await api.creators();
    }
}

export default CreatorsSearch;
