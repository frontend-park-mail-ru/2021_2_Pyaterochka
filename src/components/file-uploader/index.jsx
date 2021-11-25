import Component from '../basecomponent';
import Spinner from '../spinner';
// import './style.scss';

/**
 * Компонент загрузки файла
 */
class FileUploader extends Component {
    constructor ({
        loading = false,
        accept = '*',
        onChange = (file) => { }
    }) {
        super();
        this.attributes.loading = loading;
        this.attributes.accept = accept;
        this.attributes.onChange = onChange;
    }

    loadFile (e) {
        const file = e.target.files[0];

        this.attributes.onChange(file);
    }

    render () {
        return (
            <div>
                {
                    !this.attributes.loading
                        ? <div>
                            <input
                                accept={this.attributes.accept}
                                onChange={(e) => { this.loadFile(e); }}
                                type="file"
                            />
                        </div>
                        : <div>
                            <Spinner />
                        </div>
                }

            </div>
        );
    }
}

export default FileUploader;
