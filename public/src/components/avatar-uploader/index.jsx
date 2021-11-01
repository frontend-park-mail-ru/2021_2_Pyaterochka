import Component from '../basecomponent';
import Spinner from '../spinner';
import './style.scss';

/**
 * Компонент загрузки аватара
 */
class AvatarUploader extends Component {
    constructor ({
        // avatar = '',
        user = null,
        loading = false,
        isCircle = true,
        imageName = '',
        onChange = (file) => { }
    }) {
        super();
        // this.attributes.avatar = avatar;
        this.attributes.user = user;
        this.attributes.loading = loading;
        this.attributes.isCircle = isCircle;
        this.attributes.imageName = imageName;
        this.attributes.onChange = onChange;
    }

    loadFile (e) {
        const file = e.target.files[0];

        this.attributes.onChange(file);
    }

    render () {
        return (
            <div className={['uploader', this.attributes.loading ? 'uploader--loading' : '', this.attributes.isCircle ? 'uploader-avatar' : 'uploader-cover']}>
                <img className={this.attributes.isCircle ? 'user-avatar' : 'user-cover'} src={this.attributes.isCircle ? this.attributes.user.avatar : this.attributes.user.cover} alt="Аватар пользователя" />
                {
                    !this.attributes.loading
                        ? <div className={['image-uploader', this.attributes.isCircle ? 'avatar-uploader' : 'cover-uploader']}>
                            <label className="image-uploader__label">
                                <input
                                    className="image-uploader__file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => { this.loadFile(e); }}
                                />
                                <img src="/imgs/icons/download-picture.svg" alt="Иконка для загрузки аватарки" />
                                Заменить {this.attributes.imageName}
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
