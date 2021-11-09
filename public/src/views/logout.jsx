import Component from '../components/basecomponent';
import ConfirmComponent from '../components/confirm';
import app from '../core/app';
import user from '../storage/user';

class LogoutView extends Component {
    render () {
        return <ConfirmComponent
            title="Вы действительно хотите выйти?"
            dangerButton="Да"
            positiveButton="Нет"
            onDanger={() => {
                user.logout();
            }}
            onPositive={
                () => {
                    history.back();
                }
            }
        />;
    }

    created () {
        if (!user.user) {
            app.$router.go(app.$router.createUrl('signin'));
        }
    }
}

export default LogoutView;
