import Component from 'irbis/component';
import IconComponent from '../icon';
import Spinner from '../spinner';
import './style.scss';

/**
 * Компонент загрузки файла
 */
class FileUploader extends Component<{
    loading?: boolean,
    accept?: string,
    name?: string,
    comment?: string,
    onChange: (file:File) => unknown
}> {
    defaultProps () {
        return {
            loading: false,
            accept: '*',
            name: 'файл',
            comment: '',
            onChange: () => { }
        };
    }

    loadFile (e:Event) {
        if (!(e.target instanceof HTMLInputElement)) return;
        const file = e.target.files[0];

        this.props.onChange(file);
    }

    render () {
        return (
            <div className="file-uploader file-uploader--horizontal">
                {
                    !this.props.loading
                        ? <>
                            <label className="file-uploader__action">
                                <input
                                    className="file-uploader__input"
                                    accept={this.props.accept}
                                    onChange={(e:Event) => { this.loadFile(e); }}
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

                                    {this.props.name}

                                </div>

                            </label>

                            {this.props.comment
                                ? <div className="file-uploader__comment">
                                    {this.props.comment}
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
