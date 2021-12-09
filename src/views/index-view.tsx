import Component from 'irbis/component';
import user from '../storage/user';
import FeedView from './feed';
import MainPageView from './main-page';

class IndexView extends Component<never> {
    render () {
        if (!user.user || !navigator.onLine) return <MainPageView />;

        return <FeedView />;
    }
}

export default IndexView;
