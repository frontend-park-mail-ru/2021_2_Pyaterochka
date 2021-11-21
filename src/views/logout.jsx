import Component from '../components/basecomponent';
import ConfirmComponent from '../components/confirm';
import app from '../core/app';
import user from '../storage/user';

class LogoutView extends Component {
    render () {
        return (<ConfirmComponent
            dangerButton="Да"
            onDanger={() => {
                user.logout();
            }}
            onPositive={
                () => {
                    history.back();
                }
            }
            positiveButton="Нет"
            title="Вы действительно хотите выйти?"
        />);
    }

    created () {
        if (!user.user) {
            app.$router.go(app.$router.createUrl('signin'));
        }
    }
}

export default LogoutView;
