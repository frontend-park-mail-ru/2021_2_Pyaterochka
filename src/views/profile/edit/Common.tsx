import Component from 'irbis/component';
import consts from '../../../consts';
import EditNickname from './includes/edit-nickname';
import ImageUploader from 'ui-library/image-uploader';
import SwitchContainer from 'ui-library/switch-container';
import user from '../../../storage/user';
import * as api from '../../../api';

class ProfileEditCommon extends Component<never, {
    loadingImage: boolean
}> {
    constructor () {
        super();
        this.state.loadingImage = false;
    }

    async uploadImage (file:File) {
        this.state.loadingImage = true;
        await api.uploadAvatar(file);

        await user.update();
        this.state.loadingImage = false;
    }

    render () {
        if (!user.user) return <div />;
        return (<div>
            <p className="profile-edit__subtitle">
                {consts.profileDesign}
            </p>

            <ImageUploader
                image={user.user.avatar}
                imageName="аватар"
                loading={this.state.loadingImage}
                onChange={(image) => { this.uploadImage(image); }}
            />

            <div className="profile-edit--little-width">

                <SwitchContainer
                    isOn={user.theme === 'dark'}
                    onChange={
                        () => {
                            if (user.theme === 'dark') {
                                user.theme = 'default';
                            } else {
                                user.theme = 'dark';
                            }

                            user.onUpdate();
                        }
                    }
                    title="Тёмная тема" />
            </div>

            <br />

            <div className="profile-edit--little-width">
                <EditNickname nickname={user.user.username} />
            </div>

        </div>);
    }
}

export default ProfileEditCommon;
