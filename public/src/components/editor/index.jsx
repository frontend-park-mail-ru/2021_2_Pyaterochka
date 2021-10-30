import { nextTick } from '../../modules/utils';
import Component from '../basecomponent';
import Button from '../button';
import './style.scss';

/**
 * Компонент карточки создателя
 */
class EditorComponent extends Component {
    constructor ({
        isDraft = true,
        title = '',
        description = '',
        comment = '',
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
        body = []
    } = {}) {
        super();
        this.attributes.title = title;
        this.attributes.description = description;
        this.attributes.levels = levels;
        this.attributes.activeLevel = activeLevel;
        this.attributes.cover = cover;
        this.attributes.comment = comment;
        this.attributes.body = body;
        this.attributes.isDraft = isDraft;

        this.attributes.body.forEach(b => {
            if (!b.hash) {
                b.hash = String((new Date()).getTime());
            }
        });

        this.checkLast();
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

    findBody (hash) {
        return this.attributes.body.findIndex(el => el.hash === hash);
    }

    editBody (e, hash) {
        this.attributes.body[this.findBody(hash)].text = this.fixText(e.target.textContent) || '';
        this.checkLast();
    }

    checkLast () {
        if (this.attributes.body.length === 0 || this.attributes.body.at(-1).text !== '') {
            this.appendBody();
        }
    }

    appendBody () {
        this.attributes.body.push({
            hash: String((new Date()).getTime()),
            text: ''
        });
    }

    onPaste (e, setter) {
        // const paste = e.clipboardData.getData('text');
        setTimeout(() => {
            if (!e.heloelelelel) return;
            const el = e.target;

            const sel = window.getSelection();

            const oldRange = sel.getRangeAt(el);
            const start = oldRange.startOffset;
            const end = oldRange.endOffset;

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

    keyPress (event, hash = null) {
        if (hash !== null && (event.keyCode === 8 || event.keyCode === 46)) {
            const i = this.findBody(hash);
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
            if (hash != null) {
                const i = this.findBody(hash);
                this.attributes.body.splice(i + 1, 0, {
                    hash: String((new Date()).getTime()),
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

    async focusBodyElement (i, atEnd = false) {
        await nextTick();
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

    onBlur (e) {
        e.target.innerText = this.fixText(e.target.innerText);
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
                        onBlur={(e) => { this.onBlur(e); }}
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
                        onBlur={(e) => { this.onBlur(e); }}
                    >
                        {this.attributes.description}
                    </div>
                </div>
                <div className="editor__save-panel">
                    {this.attributes.isDraft
                        ? <>
                            <div className="btn-container">
                                <Button color="success" text="Опубликовать" />
                            </div>
                        </>
                        : <>
                            <div className="btn-container">
                                <Button color="success" text="Сохранить" />
                            </div>
                            <div className="btn-container">
                                <Button color="primary" text="Удалить" />
                            </div>

                        </>}
                    {this.attributes.comment}
                </div>
                {this.attributes.body.map((element) => {
                    return (
                        <>
                            {element.text === ''
                                ? (
                                    <div key={element.hash + '_helper'} className="editor__helper editor__helper--body">
                                        <button className="add-icon-button" alt="Добавить музыку">
                                            <div className="icon" style="--icon: url('/imgs/icons/music_outline_24.svg')" />
                                        </button>
                                        <button className="add-icon-button" alt="Добавить картинку">
                                            <div className="icon" style="--icon: url('/imgs/icons/picture_outline_28.svg')" />
                                        </button>
                                        <button className="add-icon-button" alt="Добавить видео">
                                            <div className="icon" style="--icon: url('/imgs/icons/video_outline_24.svg')" />
                                        </button>
                                    </div>
                                )
                                : (
                                    ''
                                )}

                            <div
                                key={element.hash + '_element'}
                                className={['editor__body-element', element.text === '' ? 'editor__body-element--show-placeholder' : '']}
                                contentEditable={true}
                                placeholder="Пишите текст вашей статьи здесь или выберите  нужный элемент слева"
                                onInput={(e) => {
                                    this.editBody(e, element.hash);
                                }}
                                onKeyDown={(e) => {
                                    this.keyPress(e, element.hash);
                                }}
                                onPaste={(e) => this.onPaste(e, (a) => { element.text = a; })}
                                onBlur={(e) => { this.onBlur(e); }}
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
