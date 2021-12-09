import { nextTick } from 'irbis/vdom/utils';
import AudioPlayer from '../audio-player';
import Component from 'irbis/component';
import Button from '../button';
import FileUploader from '../file-uploader';
import IconComponent from '../icon';
import ImageUploader from '../image-uploader';
import VideoPlayer from '../video-player';
import './style.scss';

type AttachType = string;

type Attachment = {
    hash?: string,
    value?: string,
    type?: AttachType,
    id?: string,
    loading?: boolean,
    error?: boolean | string
};

type Level = {
    id: number,
    title: string
}

type PostExportType = {
    title: string,
    description: string,
    levelId: number,
    body: Attachment[]
}
type Props = {
    isDraft?: boolean,
    title?: string,
    description?: string,
    comment?: string,
    levels?: Level[],
    activeLevel?: number,
    cover?: string,
    body?: Attachment[],
    onSave?: (post: PostExportType) => unknown,
    onDelete?: (post: PostExportType) => unknown,
    onLoadCover?: (image?: File) => Promise<string>,
    onLoadImage?: (image?: File) => Promise<{
        id: string,
        error?: string
    }>,
    onLoadFile?: (file?: File, type?: AttachType) => Promise<{
        id: string,
        error?: string
    }>
}

/**
 * Компонент карточки создателя
 */
class EditorComponent extends Component<Props, Props & {
    loadingCover: boolean
}> {
    constructor ({
        isDraft = true,
        title = '',
        description = '',
        comment = '',
        levels = [],
        activeLevel = 0,
        cover = null,
        body = [],
        onSave,
        onDelete,
        onLoadCover,
        onLoadImage,
        onLoadFile
    }: Props = {}) {
        super();
        this.state.title = title;
        this.state.description = description;
        this.state.levels = levels;
        this.state.activeLevel = activeLevel;
        this.state.cover = cover;
        this.state.comment = comment;
        this.state.body = body;
        this.state.isDraft = isDraft;

        this.state.onSave = onSave;
        this.state.onDelete = onDelete;
        this.state.onLoadCover = onLoadCover;
        this.state.onLoadImage = onLoadImage;
        this.state.onLoadFile = onLoadFile;

        this.state.body.forEach(b => {
            if (!b.hash) {
                b.hash = this.newHash();
            }
        });

        this.state.loadingCover = false;

        this.checkLast();
    }

    setLevel (id: number) {
        this.state.activeLevel = id;
    }

    fixText (text: string) {
        return text?.replace(/\n/g, '')?.replace(/\r/g, '');
    }

    editTitle (e) {
        this.state.title = this.fixText(e.target.innerText);
    }

    editDescription (e) {
        this.state.description = this.fixText(e.target.innerText);
    }

    findBody (hash) {
        return this.state.body.findIndex(el => el.hash === hash);
    }

    editTextBody (e, hash: string) {
        this.state.body[this.findBody(hash)].value = this.fixText(e.target.textContent) || '';
        this.checkLast();
    }

    convertTo (hash: string, type: AttachType) {
        const element = this.state.body[this.findBody(hash)];

        element.type = type;
        element.value = '';
        element.id = undefined;

        this.update();
        this.checkLast();
    }

    deleteElement (hash: string) {
        const i = this.findBody(hash);
        this.state.body.splice(i, 1);
        this.update();

        this.checkLast();
    }

    addTextBefore (hash: string) {
        const i = this.findBody(hash);
        this.state.body.splice(i, 0, this.newTextBody());
        this.update();
    }

    async loadImage (hash: string, image: File) {
        const element = this.state.body[this.findBody(hash)];
        element.loading = true;
        this.update();

        const res = await this.state.onLoadImage(image);

        element.id = res.id;
        element.value = URL.createObjectURL(image);

        element.loading = false;
        this.update();
    }

    async loadFile (hash: string, file: File, type: AttachType) {
        const element = this.state.body[this.findBody(hash)];
        element.loading = true;
        element.error = false;
        this.update();

        const res = await this.state.onLoadFile(file, type);
        if (res.id) {
            element.id = res.id;
            element.value = URL.createObjectURL(file);
        } else {
            element.error = res.error;
        }

        element.loading = false;
        this.update();
    }

    checkLast () {
        if (
            this.state.body.length === 0 ||
            this.state.body.at(-1).type !== 'text' ||
            this.state.body.at(-1).value !== ''
        ) {
            this.appendBody();
        }
    }

    appendBody () {
        this.state.body.push(this.newTextBody());
    }

    newHash () {
        return String((new Date()).getTime()) + String(Math.random());
    }

    newTextBody (): Attachment {
        return {
            hash: this.newHash(),
            value: '',
            type: 'text'
        };
    }

    keyPress (event, hash = null) {
        // console.log(event, hash)
        if (hash !== null && (event.keyCode === 8 || event.keyCode === 46)) {
            const i = this.findBody(hash);
            if (this.state.body[i].value === '') {
                this.state.body.splice(i, 1);
                this.checkLast();
                event.preventDefault();
                this.updatePartly();
                if (event.keyCode === 8) {
                    this.focusBodyElement(Math.max(0, i - 1), true);
                }
            }
            return;
        }

        if (event.keyCode === 13) {
            if (hash != null) {
                const i = this.findBody(hash);
                this.state.body.splice(i + 1, 0, this.newTextBody());
                this.updatePartly();

                this.focusBodyElement(i + 1);
            }

            event.preventDefault();
            return;
        }

        if (event.keyCode !== 32) {
            this.update();
        }
    }

    async focusBodyElement (i, atEnd = false) {
        await nextTick();
        if (!(this.vdom.dom instanceof Element)) return;

        const element = this.vdom.dom.querySelectorAll('.editor__body-element')[i];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element.focus();
        if (atEnd) {
            const range = document.createRange();
            range.selectNodeContents(element);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    save () {
        this.state.onSave({
            title: this.state.title,
            description: this.state.description,
            levelId: this.state.activeLevel,
            body: Object.assign(this.state.body.filter(b => b.value))
        });
    }

    delete () {
        this.state.onDelete({
            title: this.state.title,
            description: this.state.description,
            levelId: this.state.activeLevel,
            body: Object.assign(this.state.body.filter(b => b.value))
        });
    }

    render () {
        return (
            <div className="editor">
                <div className="editor__header">
                    <div className="editor__helper editor__helper-title">
                        Заголовок
                    </div>

                    <div
                        className={['editor__title', this.state.title ? '' : 'editor_show-placeholder']}
                        contentEditable
                        onInput={(e) => {
                            this.editTitle(e);
                        }}
                        onKeyPress={(e) => {
                            this.keyPress(e);
                        }}
                        placeholder="Введите заголовок"
                    >
                        {this.state.title}
                    </div>

                    <div className="editor__helper">
                        Уровень
                    </div>

                    <div className="editor__levels">
                        <div
                            className={[
                                'editor__level',
                                !this.state.activeLevel ? 'active' : ''
                            ]}
                            onClick={() => {
                                this.setLevel(0);
                            }}
                        >
                            Доступен всем
                        </div>

                        {this.state.levels.map((level) => {
                            return (
                                <>
                                    {' | '}

                                    <div
                                        className={[
                                            'editor__level',
                                            level.id === this.state.activeLevel ? 'active' : ''
                                        ]}
                                        onClick={() => {
                                            this.setLevel(level.id);
                                        }}
                                    >
                                        {level.title}
                                    </div>
                                </>
                            );
                        })}
                    </div>

                    <div className="editor__helper">
                        Описание
                    </div>

                    <div
                        className={['editor__description', this.state.description ? '' : 'editor_show-placeholder']}
                        contentEditable
                        onInput={(e) => {
                            this.editDescription(e);
                        }}
                        onKeyPress={(e) => {
                            this.keyPress(e);
                        }}
                        placeholder="Введите описание"
                    >
                        {this.state.description}
                    </div>
                </div>

                <div className="editor__save-panel">
                    {this.state.isDraft
                        ? <div className="btn-container">
                            <Button
                                color="success"
                                onClick={
                                    () => {
                                        this.save();
                                    }
                                }
                                text="Продолжить"
                            />
                        </div>
                        : <>
                            <div className="btn-container">
                                <Button
                                    color="success"
                                    onClick={
                                        () => {
                                            this.save();
                                        }
                                    }
                                    text="Сохранить"
                                />
                            </div>

                            <div className="btn-container">
                                <Button
                                    color="primary"
                                    onClick={
                                        () => {
                                            this.delete();
                                        }
                                    }
                                    text="Удалить"
                                />
                            </div>

                        </>}

                    {this.state.comment}
                </div>

                {!this.state.isDraft
                    ? <>
                        <ImageUploader
                            image={this.state.cover}
                            imageName="обложку"
                            isCircle={false}
                            loading={this.state.loadingCover}
                            onChange={async (image) => {
                                this.state.loadingCover = true;
                                this.state.cover = await this.state.onLoadCover(image);
                                this.state.loadingCover = false;
                            }}
                        />

                        {this.state.body.map((element) => {
                            return (
                                <>
                                    <div
                                        title="Добавить элемент"
                                        key={element.hash + '_helper--add-line'}
                                        className="editor__helper--add-line"
                                        onClick={
                                            () => {
                                                this.addTextBefore(element.hash);
                                            }
                                        } />

                                    {element.type === 'text' && !element.value
                                        ? (
                                            <div
                                                className="editor__helper editor__helper--body"
                                                key={element.hash + '_helper'}
                                            >
                                                <IconComponent
                                                    title="Добавить музыку"
                                                    size="24"
                                                    onClick={
                                                        () => {
                                                            this.convertTo(element.hash, 'audio');
                                                        }
                                                    }
                                                    url="/imgs/icons/music_outline_24.svg"
                                                />

                                                <IconComponent
                                                    title="Добавить картинку"
                                                    size="24"
                                                    onClick={
                                                        () => {
                                                            this.convertTo(element.hash, 'image');
                                                        }
                                                    }
                                                    url="/imgs/icons/picture_outline_28.svg"
                                                />

                                                <IconComponent
                                                    title="Добавить видео"
                                                    size="24"
                                                    onClick={
                                                        () => {
                                                            this.convertTo(element.hash, 'video');
                                                        }
                                                    }
                                                    url="/imgs/icons/video_outline_24.svg"
                                                />
                                            </div>
                                        )
                                        : (
                                            ''
                                        )}

                                    {element.type !== 'text' || element.value
                                        ? (
                                            <div
                                                className="editor__helper editor__helper--body editor__helper--body--delete"
                                                key={element.hash + '_helper'}
                                            >
                                                <IconComponent
                                                    key="delete"
                                                    title="Удалить"
                                                    size="24"
                                                    onClick={
                                                        () => {
                                                            this.deleteElement(element.hash);
                                                        }
                                                    }
                                                    url="/imgs/icons/delete_outline_20.svg"
                                                />
                                            </div>
                                        )
                                        : (
                                            ''
                                        )}

                                    {element.type === 'text'
                                        ? (
                                            <div
                                                className={['editor__body-element', element.value === '' ? 'editor__body-element_show-placeholder' : '']}
                                                contentEditable
                                                key={element.hash + '_element'}
                                                onInput={(e) => {
                                                    this.editTextBody(e, element.hash);
                                                }}
                                                onKeyDown={(e) => {
                                                    this.keyPress(e, element.hash);
                                                }}
                                                placeholder="Пишите текст вашей статьи здесь или выберите  нужный элемент слева"
                                            >
                                                {element.value}
                                            </div>
                                        )
                                        : null}

                                    {element.type === 'image'
                                        ? (
                                            <div className="editor__body-element  editor__body-element--file">
                                                <ImageUploader
                                                    image={element.value}
                                                    isCircle={false}
                                                    onChange={(image) => {
                                                        this.loadImage(element.hash, image);
                                                    }}
                                                    loading={element.loading}
                                                />
                                            </div>
                                        )
                                        : null}

                                    {element.type === 'audio'
                                        ? (
                                            <div className="editor__body-element  editor__body-element--file">
                                                <FileUploader
                                                    accept=".ogg, .mp3"
                                                    onChange={(image) => {
                                                        this.loadFile(element.hash, image, element.type);
                                                    }}
                                                    name="аудио"
                                                    loading={element.loading}
                                                    comment={element.error ? 'Ошибка загрузки:' + element.error : ''}
                                                />

                                                <br />

                                                {element.value
                                                    ? <AudioPlayer src={[{ url: element.value }]} />
                                                    : null}

                                            </div>
                                        )
                                        : null}

                                    {
                                        element.type === 'video'
                                            ? (
                                                <div className="editor__body-element  editor__body-element--file">
                                                    <FileUploader
                                                        accept=".3gpp, .mp4"
                                                        onChange={(image) => {
                                                            this.loadFile(element.hash, image, element.type);
                                                        }}
                                                        name="видео"
                                                        loading={element.loading}
                                                        comment={element.error ? 'Ошибка загрузки:' + element.error : ''}
                                                    />

                                                    <br />

                                                    {element.value
                                                        ? <VideoPlayer src={[{ url: element.value }]} />
                                                        : null}

                                                </div>
                                            )
                                            : null
                                    }
                                </>
                            );
                        })}
                    </>
                    : ''}

            </div>
        );
    }
}

export default EditorComponent;
