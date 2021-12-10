import app from 'irbis';
import Component from 'irbis/component';
import ConfirmComponent from 'ui-library/confirm';
import user from '../storage/user';

class LogoutView extends Component<never> {
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
