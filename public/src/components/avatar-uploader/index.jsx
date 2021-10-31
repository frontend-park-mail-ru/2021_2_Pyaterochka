import Component from '../basecomponent';
import Spinner from '../spinner';
import './style.scss';

/**
 * Компонент загрузки аватара
 */
class AvatarUploader extends Component {
    constructor ({
        avatar = '',
        loading = false,
        onChange = (file) => { }
    }) {
        super();
        this.attributes.avatar = avatar;
        this.attributes.loading = loading;
        this.attributes.onChange = onChange;
    }

    loadFile (e) {
        const file = e.target.files[0];

        this.attributes.onChange(file);
    }

    render () {
        return (
            <div className={['uploader', this.attributes.loading ? 'uploader--loading' : '']}>
                <img className="user-avatar" src={this.attributes.avatar} alt="Аватар пользователя" />
                {
                    !this.attributes.loading
                        ? <div className="avatar-uploader">

                            <label className="avatar-uploader__label">
                                <input
                                    className="avatar-uploader__file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => { this.loadFile(e); }}
                                />
                                <img src="/imgs/icons/download-picture.svg" alt="Иконка для загрузки аватарки" />
                                Заменить аватар
                            </label>
                        </div>
                        : <div className="uploader__loading">
                            <Spinner color="#fff" />
                        </div>
                }

            </div>
        );
    }
}

export default AvatarUploader;
