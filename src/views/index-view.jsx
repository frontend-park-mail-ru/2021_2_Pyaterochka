import Component from 'irbis/component';
import user from '../storage/user';
import FeedView from './feed';
import MainPageView from './main-page';

class IndexView extends Component {
    render () {
        if (!user.user) return <MainPageView />;

        return <FeedView />;
    }
}

export default IndexView;
