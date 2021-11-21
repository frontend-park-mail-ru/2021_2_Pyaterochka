import Component from '../components/basecomponent';
import app from '../core/app';
import user from '../storage/user';

class CreatorPanel extends Component {
    render () {
        return '';
    }

    created () {
        if (!user.user) {
            app.$router.go(app.$router.createUrl('signin'));
            return;
        }
        app.$router.go(app.$router.createUrl('creator', user.user.id));
    }
}

export default CreatorPanel;
