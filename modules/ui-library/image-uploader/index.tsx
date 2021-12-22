import Component from 'irbis/component';
import Spinner from '../spinner';
import './style.scss';

/**
 * Компонент загрузки аватара
 */
class ImageUploader extends Component<{
    image?: string,
    loading?: boolean,
    isCircle?: boolean,
    imageName?: string,
    onChange: (file: File) => unknown
}> {
    defaultProps () {
        return {
            image: '',
            loading: false,
            isCircle: true,
            imageName: 'изображение',
            onChange: () => {
            }
        };
    }

    loadFile (e: Event) {
        if (!(e.target instanceof HTMLInputElement)) return;
        const file = e.target.files[0];

        this.props.onChange(file);
    }

    render () {
        return (
            <div
                className={
                    [
                        'uploader',
                        this.props.loading ? 'uploader-loading' : '',
                        this.props.isCircle ? 'uploader-avatar' : 'uploader-cover',
                        this.props.image ? '' : 'uploader--no-image'
                    ]
                }
                style={
                    `
                        background-image: url("${this.props.image}");
                    `
                }
            >
                {
                    !this.props.loading
                        ? <div
                            className={[
                                'image-uploader', this.props.isCircle ? 'avatar-uploader' : 'cover-uploader'
                            ]}
                        >
                            <label className="image-uploader__label">
                                <input
                                    accept="image/png, image/jpeg"
                                    className="image-uploader__file-upload"
                                    onChange={(e) => {
                                        this.loadFile(e);
                                    }}
                                    type="file"
                                />

                                <img
                                    alt="Иконка для загрузки аватарки"
                                    src="/imgs/icons/download-picture.svg"
                                />

                                Заменить
                                {' '}

                                {this.props.imageName}
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
