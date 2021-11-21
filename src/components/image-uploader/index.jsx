import Component from '../basecomponent';
import Spinner from '../spinner';
import './style.scss';

/**
 * Компонент загрузки аватара
 */
class ImageUploader extends Component {
    constructor ({
        image = '',
        loading = false,
        isCircle = true,
        imageName = 'изображение',
        onChange = (file) => { }
    }) {
        super();
        this.attributes.image = image;
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
            <div
                className={
                    [
                        'uploader',
                        this.attributes.loading ? 'uploader-loading' : '',
                        this.attributes.isCircle ? 'uploader-avatar' : 'uploader-cover',
                        this.attributes.image ? '' : 'uploader--no-image'
                    ]
                }
                style={
                    `
                        background-image: url("${this.attributes.image}");
                    `
                }
            >
                {
                    !this.attributes.loading
                        ? <div
                            className={[
                                'image-uploader', this.attributes.isCircle ? 'avatar-uploader' : 'cover-uploader'
                            ]}
                        >
                            <label className="image-uploader__label">
                                <input
                                    accept="image/png, image/jpeg"
                                    className="image-uploader__file-upload"
                                    onChange={(e) => { this.loadFile(e); }}
                                    type="file"
                                />

                                <img
                                    alt="Иконка для загрузки аватарки"
                                    src="/imgs/icons/download-picture.svg"
                                />

                                Заменить
                                {' '}

                                {this.attributes.imageName}
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

export default ImageUploader;
