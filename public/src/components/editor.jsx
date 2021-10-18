import Component from './basecomponent';
import Button from './button';
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
        this.title = title;
        this.description = description;
        this.attributes.levels = levels;
        this.attributes.activeLevel = activeLevel;
        this.attributes.cover = cover;
        this.body = body;
        this.attributes.isDraft = isDraft;
    }

    setLevel (id) {
        this.attributes.activeLevel = id;
    }

    editTitle (e) {
        this.title = e.target.innerText;
    }

    editDescription (e) {
        this.description = e.target.innerText;
    }

    editBody (e, i) {
        this.body[i].text = e.target.firstChild?.textContent || '';
        this.checkLast();
    }

    checkLast () {
        if (this.body.length === 0 || this.body.at(-1).text !== '') {
            this.appendBody();
        }
    }

    appendBody () {
        this.body.push({
            text: ''
        });
        this.update();
    }

    keyPress (event, i = null) {
        if (i !== null && (event.keyCode === 8 || event.keyCode === 46)) {
            if (this.body[i].text === '') {
                this.body.splice(i, 1);
                this.checkLast();
                event.preventDefault();
                this.updatePartly();
                if (event.keyCode === 8) {
                    this.focusBodyElement(Math.max(0, i - 1), true);
                }
            } else {
                this.update();
            }
            return;
        }

        if (event.keyCode === 13) {
            if (i != null) {
                this.body.splice(i + 1, 0, {
                    text: ''
                });
            }
            this.updatePartly();

            this.focusBodyElement(i + 1);
            event.preventDefault();
            return;
        }

        if (event.keyCode !== 32) {
            this.update();
        }
    }

    focusBodyElement (i, atEnd = false) {
        const element = this.dom.querySelectorAll('.editor__body-element')[i];
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
                        className="editor__title"
                        onKeyPress={(e) => {
                            this.keyPress(e);
                        }}
                        contentEditable={true}
                        onInput={(e) => {
                            this.editTitle(e);
                        }}
                    >
                        {this.title}
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
                        className="editor__description"
                        onKeyPress={(e) => {
                            this.keyPress(e);
                        }}
                        contentEditable={true}
                        onInput={(e) => {
                            this.editDescription(e);
                        }}
                    >
                        {this.description}
                    </div>
                </div>
                <div className="editor__save-panel">
                    <div className="btn-container">
                        <Button color="success" text="Опубликовать" />
                    </div>{' '}
                    Черновик был сохранен автоматически
                </div>
                {this.body.map((element, i) => {
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
                                className="editor__body-element"
                                contentEditable={true}
                                placeholder="Пишите текст вашей статьи здесь или выберите  нужный элемент слева"
                                onInput={(e) => {
                                    this.editBody(e, i);
                                }}
                                onKeyDown={(e) => {
                                    this.keyPress(e, i);
                                }}
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

const styles = `
.add-icon-button {
    background: none;
    border:none;
    outline:none;
    cursor: pointer;
    padding: 0;
    margin: 0 5px;
}
.add-icon-button icon{
    width: 24px;
    height: 24px;
    mask-image: var(--icon);
    mask-position: center;
    mask-size: contain;
    -webkit-mask-image: var(--icon);
    -webkit-mask-position: center;
    -webkit-mask-size: contain;
    background-color: #7c7c7c;
    display: block;
    transition: background-color .2s ease;
}
.add-icon-button icon:hover{
    background-color: #000;
}
.editor__save-panel {
    padding: 15px 15px;
    font-size:14px;
}
.editor__save-panel .btn-container {
    width:200px;
    margin-right:10px;
    display:inline-block
}
.editor__header {
    padding: 5px 15px;
    border-left: 2px #878787 solid;
    transition: border-color .2s ease;
}

.editor__header:hover {
    padding: 5px 15px;
    border-color: #000;   
}
.editor__header:hover .editor__helper {
    color: #000;   
}
.editor__helper {
    transition: color .2s ease;
    position: absolute;
    text-align: right;
    left: -180px;
    font-size: 18px;
    width: 200px;
    color:#7c7c7c;
}
.editor__helper--title {
    font-size: 28px;
}
.editor {
    max-width:800px;
    margin:auto;
    padding:40px;
    position:relative;
}
.editor [contentEditable=true] {
    border:none;
    outline:none;
    cursor:text;
    color:#000;
}

.editor textarea {
    display:block;
    width:100%;
    border:none;
    outline:none;
    font-family: Roboto, sans-serif;
}
.editor [contentEditable=true]:empty:before{
    content:attr(placeholder);
    color: #7C7C7C;
}
.editor [contentEditable=true] br {
    display:none;
}

.editor__title {
    font-size: 28px;
    font-weight: 300;
}

.editor__levels {
font-size: 18px;
font-weight: 400;
color: #878787;
}
.editor__level.active {
    color: #000;
}
.editor__level {
    display:inline-block;
    cursor:pointer;
    transition: all ease .1s;
}
.editor__description {
    font-size: 18px;
    font-weight: 300;
}
.editor__body-element {
    padding: 15px 15px;

}
.editor__helper--body {
    margin: 10px 0;
    padding-right:22px;
    margin-left:22px;
    border-right:2px solid #888
}
.editor__title, .editor__levels, .editor__description {
    margin-bottom: 4px;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
