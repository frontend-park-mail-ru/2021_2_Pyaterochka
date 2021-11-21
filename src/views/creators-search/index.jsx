import api from '../../api/index';
import Component from '../../components/basecomponent';
import CreatorCard from '../../components/creator-card';

import './style.scss';

class ProfileView extends Component {
    constructor () {
        super();
        this.attributes.creators = [];
    }

    render () {
        return (
            <div>
                <h1 className="text-center">
                    Авторы:
                </h1>

                <div className="creators-container">
                    {this.attributes.creators.map((creator) => {
                        return (new CreatorCard(creator)).renderReactive();
                    })}
                </div>

            </div>
        );
    }

    async created () {
        this.attributes.creators = await api.creators();
    }
}

export default ProfileView;
