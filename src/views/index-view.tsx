import Component from 'irbis/component';
import FeedView from './feed';
import MainPageView from './main-page';
import user from '../storage/user';

class IndexView extends Component<never> {
    render () {
        if (!user.user || !navigator.onLine) return <MainPageView />;

        return <FeedView />;
    }
}

export default IndexView;
