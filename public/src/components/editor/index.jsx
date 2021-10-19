import Component from '../basecomponent';
import Button from '../button';
import './style.css';

/**
 * Компонент карточки создателя
 */
class EditorComponent extends Component {
    constructor ({
        title = '',
        description = '',
        levels = [
            {
                title: 'Новичок',
                id: 1
            },
            {
                title: 'Про',
                id: 2
            }
        ],
        activeLevel = 0,
        cover = null,
        body = [
            {
                text: ''
            }
        ],
        isDraft = true
    } = {}) {
        super();
        this.attributes.title = title;
        this.attributes.description = description;
        this.attributes.levels = levels;
        this.attributes.activeLevel = activeLevel;
        this.attributes.cover = cover;
        this.attributes.body = body;
        this.attributes.isDraft = isDraft;
    }

    setLevel (id) {
        this.attributes.activeLevel = id;
    }

    fixText (text) {
        return text?.replace(/\n/g, '')?.replace(/\r/g, '');
    }

    editTitle (e) {
        this.attributes.title = this.fixText(e.target.innerText);
    }

    editDescription (e) {
        this.attributes.description = this.fixText(e.target.innerText);
    }

    editBody (e, i) {
        this.attributes.body[i].text = this.fixText(e.target.textContent) || '';
        this.checkLast();
    }

    checkLast () {
        if (this.attributes.body.length === 0 || this.attributes.body.at(-1).text !== '') {
            this.appendBody();
        }
    }

    appendBody () {
        this.attributes.body.push({
            text: ''
        });
    }

    onPaste (e, setter) {
        // const paste = e.clipboardData.getData('text');
        setTimeout(() => {
            // console.log(e)
            const el = e.target;

            const sel = window.getSelection();

            const oldRange = sel.getRangeAt(el);
            const start = oldRange.startOffset;
            const end = oldRange.endOffset;

            // console.log(start, end);

            const text = el.innerText.replace(/\n/g, ' ');
            setter(text);
            el.innerText = text;

            const range = document.createRange();
            range.setStart(el.firstChild, start);
            range.setEnd(el.firstChild, end);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }, 0);
    }

    keyPress (event, i = null) {
        if (i !== null && (event.keyCode === 8 || event.keyCode === 46)) {
            if (this.attributes.body[i].text === '') {
                this.attributes.body.splice(i, 1);
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
            if (i != null) {
                this.attributes.body.splice(i + 1, 0, {
                    text: ''
                });
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

    focusBodyElement (i, atEnd = false) {
        const element = this.dom.dom.querySelectorAll('.editor__body-element')[i];
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

    render () {
        return (
            <div className="editor">
                <div className="editor__header">
                    <div className="editor__helper editor__helper--title">Заголовок</div>
                    <div
                        placeholder="Введите заголовок"
                        className={['editor__title', this.attributes.title ? '' : 'editor--show-placeholder']}
                        onKeyPress={(e) => {
                            this.keyPress(e);
                        }}
                        onPaste={(e) => this.onPaste(e, (a) => { this.attributes.title = a; })}
                        contentEditable={true}
                        onInput={(e) => {
                            this.editTitle(e);
                        }}
                    >
                        {this.attributes.title}
                    </div>
                    <div className="editor__helper">Уровень</div>
                    <div className="editor__levels">
                        <div
                            className={[
                                'editor__level',
                                this.attributes.activeLevel === 0 ? 'active' : ''
                            ]}
                            onClick={() => {
                                this.setLevel(0);
                            }}
                        >
                            Доступен всем
                        </div>
                        {this.attributes.levels.map((level) => {
                            return (
                                <>
                                    {' | '}
                                    <div
                                        className={[
                                            'editor__level',
                                            level.id === this.attributes.activeLevel ? 'active' : ''
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

                    <div className="editor__helper">Описание</div>
                    <div
                        placeholder="Введите описание"
                        className={['editor__description', this.attributes.description ? '' : 'editor--show-placeholder']}
                        onKeyPress={(e) => {
                            this.keyPress(e);
                        }}
                        contentEditable={true}
                        onInput={(e) => {
                            this.editDescription(e);
                        }}
                        onPaste={(e) => this.onPaste(e, (a) => { this.attributes.description = a; })}
                    >
                        {this.attributes.description}
                    </div>
                </div>
                <div className="editor__save-panel">
                    <div className="btn-container">
                        <Button color="success" text="Опубликовать" />
                    </div>{' '}
                    Черновик был сохранен автоматически
                </div>
                {this.attributes.body.map((element, i) => {
                    return (
                        <>
                            {element.text === ''
                                ? (
                                    <div className="editor__helper editor__helper--body">
                                        <button className="add-icon-button" alt="Добавить музыку">
                                            <icon style="--icon: url('/imgs/icons/music_outline_24.svg')" />
                                        </button>
                                        <button className="add-icon-button" alt="Добавить картинку">
                                            <icon style="--icon: url('/imgs/icons/picture_outline_28.svg')" />
                                        </button>
                                        <button className="add-icon-button" alt="Добавить видео">
                                            <icon style="--icon: url('/imgs/icons/video_outline_24.svg')" />
                                        </button>
                                    </div>
                                )
                                : (
                                    ''
                                )}

                            <div
                                className={['editor__body-element', element.text === '' ? 'editor__body-element--show-placeholder' : '']}
                                contentEditable={true}
                                placeholder="Пишите текст вашей статьи здесь или выберите  нужный элемент слева"
                                onInput={(e) => {
                                    this.editBody(e, i);
                                }}
                                onKeyDown={(e) => {
                                    this.keyPress(e, i);
                                }}
                                onPaste={(e) => this.onPaste(e, (a) => { element.text = a; })}

                            >
                                {element.text}
                            </div>
                        </>
                    );
                })}
            </div>
        );
    }
}

export default EditorComponent;
