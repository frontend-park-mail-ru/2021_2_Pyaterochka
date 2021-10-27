import Component from '../basecomponent';
import './style.css';

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
        const newAvatar = document.getElementById('user-avatar');
        newAvatar.src = URL.createObjectURL(e.target.files[0]);
        newAvatar.onload = function () {
            URL.revokeObjectURL(newAvatar.src); // free memory
        };
    };

    render () {
        return (
            <div className="avatar-uploader">
                <img id="user-avatar" src={this.attributes.avatar} alt="Аватар пользователя"/>
                <button className="avatar-uploader__button">
                    <label className="avatar-uploader__text">
                        <input
                            id="avatar-uploader__file-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => { this.loadFile(e); }}
                        />
                        <img src="../../../imgs/icons/download-picture.svg" alt=""/>
                        Заменить аватар
                    </label>
                </button>
            </div>
        );
    }
}

export default AvatarUploader;
