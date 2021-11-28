
import api from '../../../api';
import Component from 'irbis/component';
import Button from 'ui-library/button';
import Skeleton from 'ui-library/skeleton';
import TimeAgoComponent from 'ui-library/time-ago';
import consts from '../../../consts';
import app from 'irbis';
import user from '../../../storage/user';
import EditPassword from './includes/edit-password';

class ProfileEditSecure extends Component {
    constructor () {
        super();
        this.state.payments = null;
    }

    render () {
        if (!user.user) return <div />;
        return (<div className="profile-edit--little-width">

            <p className="profile-edit__subtitle">
                {consts.changePassword}
            </p>

            <EditPassword />

            <br />

            <br />

            <p className="profile-edit__subtitle">
                {consts.transactions}
            </p>

            {
                this.attributes.payments
                    ? <table>
                        <thead>
                            <tr>
                                <th>
                                    {consts.date}
                                </th>

                                <th>
                                    {consts.sum}
                                </th>

                                <th>
                                    {consts.creator}
                                </th>
                            </tr>
                        </thead>

                        {
                            this.attributes.payments.map(payment => (
                                <tr key={payment.id}>
                                    <td>
                                        <TimeAgoComponent date={payment.date} />
                                    </td>

                                    <td>
                                        {payment.amount}

                                        {' '}

                                        {consts.rubble}
                                    </td>

                                    <td>
                                        <Button
                                            onClick={
                                                () => {
                                                    app.$router.go(app.$router.createUrl('creator', payment.creatorId));
                                                }
                                            }
                                            text={`Открыть автора ${payment.creatorId}`}
                                        />
                                    </td>
                                </tr>
                            ))
                        }

                    </table>
                    : <Skeleton />
            }

        </div>);
    }

    async created () {
        this.attributes.payments = await api.payments();
    }
}

export default ProfileEditSecure;
