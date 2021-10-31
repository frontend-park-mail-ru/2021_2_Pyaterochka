import Component from '../basecomponent';
import './style.scss';

/**
 * Компонент загрузки аватара
 */
class AvatarUploader extends Component {
    constructor ({
        avatar = ''
    }) {
        super();
        this.attributes.avatar = avatar;
    }

    loadFile (e) {
        this.attributes.avatar = URL.createObjectURL(e.target.files[0]);
        this.attributes.avatar.onload = function () {
            URL.revokeObjectURL(this.attributes.avatar);
        };
    };

    render () {
        return (
            <div className="uploader">
                <img className="user-avatar" src={this.attributes.avatar} alt="Аватар пользователя"/>
                <div className="avatar-uploader">
                    <label className="avatar-uploader__label">
                        <input
                            className="avatar-uploader__file-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => { this.loadFile(e); }}
                        />
                        <img src="/imgs/icons/download-picture.svg" alt="Иконка для загрузки аватарки"/>
                        Заменить аватар
                    </label>
                </div>
            </div>
        );
    }
}

export default AvatarUploader;
