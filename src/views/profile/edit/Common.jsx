import api from '../../../api';
import ImageUploader from '../../../components/image-uploader';
import Component from '../../../components/basecomponent';
import InputField from '../../../components/input-field';
import user from '../../../storage/user';
import consts from '../../../consts';

class ProfileEditCommon extends Component {
    constructor () {
        super();

        this.attributes.loadingImage = false;
    }

    async uploadImage (file) {
        this.attributes.loadingImage = true;
        await api.uploadAvatar(file);

        await user.update();
        this.attributes.loadingImage = false;
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
                loading={this.attributes.loadingImage}
                onChange={(image) => { this.uploadImage(image); }}
            />

            <br />

            <div className="profile-edit--little-width">
                <p className="profile-edit__subtitle">
                    {consts.nickname}
                </p>

                <InputField
                    disabled
                    placeholder="Текущее имя пользователя"
                    value={user.user.username}
                />
            </div>

        </div>);
    }
}

export default ProfileEditCommon;
