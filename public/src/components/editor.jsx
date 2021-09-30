import Component from './basecomponent.js';
import Button from './button.jsx';
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
        body = [],
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
        this.body[i].text = e.target.innerText;
    }

    keyPress (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
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

                {this.body.map((element, i) => {
                    return (
                        <>
                            <div className="editor__helper editor__helper--body">
                                <button>1</button>
                                <button>2</button>
                                <button>3</button>
                                <button>4</button>
                            </div>
                            <div
                                className="editor__body-element"
                                contentEditable={true}
                                placeholder="Пишите текст вашей статьи здесь или выберите  нужный элемент слева"
                                onInput={(e) => {
                                    this.editBody(e, i);
                                }}
                                onKeyPress={(e) => {
                                    this.keyPress(e);
                                }}
                            >
                                {element.text}
                            </div>
                        </>
                    );
                })}

                <Button
                    text="+"
                    onclick={() => {
                        this.body.push({
                            text: ''
                        });
                        this.update();
                    }}
                />
            </div>
        );
    }
}

export default EditorComponent;

const styles = `
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
}
.editor__helper--title {
    font-size: 28px;
}
.editor {
    max-width:800px;
    margin:auto;
    padding:40px;
    position:relative;
    color:#7c7c7c;
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
    padding: 10px 15px;

}
.editor__helper--body {
    margin: 10px 0;
    padding-right:22px;
    margin-left:22px;
    border-right:2px solid #888
}

`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
