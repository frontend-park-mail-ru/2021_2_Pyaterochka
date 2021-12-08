import Component from 'irbis/component';
import IconComponent from '../icon';
import Spinner from '../spinner';
import './style.scss';

/**
 * Компонент загрузки файла
 */
class FileUploader extends Component {
    defaultProps () {
        return {
            loading: false,
            accept: '*',
            name: 'файл',
            comment: '',
            onChange: () => { }
        };
    }

    loadFile (e) {
        const file = e.target.files[0];

        this.attributes.onChange(file);
    }

    render () {
        return (
            <div className="file-uploader file-uploader--horizontal">
                {
                    !this.attributes.loading

                        ? <>
                            <label className="file-uploader__action">
                                <input
                                    className="file-uploader__input"
                                    accept={this.attributes.accept}
                                    onChange={(e) => { this.loadFile(e); }}
                                    type="file"
                                />

                                <IconComponent
                                    url="/imgs/icons/attach_outline_28.svg"
                                    color="var(--color-text-light)"
                                    colorHover="var(--color-text)"
                                    size={35}
                                />

                                <div className="file-uploader__action-text">
                                    Загрузить
                                    {' '}

                                    {this.attributes.name}

                                </div>

                            </label>

                            {this.attributes.comment
                                ? <div className="file-uploader__comment">
                                    {this.attributes.comment}
                                </div>
                                : null}
                        </>
                        : <div className="file-uploader__spinner">
                            <Spinner color="#fff" />
                        </div>
                }

            </div>
        );
    }
}

export default FileUploader;
