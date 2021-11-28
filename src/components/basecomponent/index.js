import VDomText from '../../modules/jsx/vdom-text';

/**
 * Аккумулятор запросов на обновление компонентов
 */
const updateBlocks = new Set();

/**
 * Применяет к компонентам аккумулированные запросы на обновление
 */
function applyUpdates () {
    updateBlocks.forEach((block) => {
        try {
            block.updatePartly();
        } catch (err) {
            console.error('Не удалось обновить компонент', block, err);
            try {
                block.updateForce();
            } catch {
                console.error('Не удалось обновить компонент принудительно', block, err);
            }
        }
    });
    updateBlocks.clear();
}
setInterval(applyUpdates, 100);

/**
 * Базовый компонент, заложен интерфейс компонента и его обновление
 */
class Component {
    constructor () {
        const getter = (attrs, key) => attrs[key];

        const update = (attrs, key, value) => {
            if (value instanceof Object && !(value instanceof Date) && !(value instanceof Node)) {
                value = new Proxy(value, {
                    set: update,
                    get: getter
                });
            }
            attrs[key] = value;
            this.update();
            return true;
        };
        this.state = new Proxy({}, {
            set: update,
            get: getter
        });

        this.props = {};

        this._slot = null;
        this.vdom = null;
    }

    /**
     * Установка параметров компонента
     * @param {*} props
     */
    setProps (props) {
        const newProps = {};
        Object.entries(this.defaultProps())
            .forEach(
                ([key, defaultValue]) => {
                    newProps[key] =
                    props[key] === undefined ? defaultValue : props[key];
                }
            );
        this.props = newProps;

        this.update();
    }

    /**
     * Параметры компонента по умолчанию
     * @returns
     */
    defaultProps () {
        return {};
    }

    get attributes () {
        const getter = (_, key) => this.state[key] || this.props[key];

        const update = (_, key, value) => {
            this.state[key] = value;
            return true;
        };
        return new Proxy({}, {
            set: update,
            get: getter
        });
    }

    /**
     * Формируется отображение компонента
     *
     * @return {Element | Text}
     */
    render () {
    }

    /**
     * Хук, вызываемый после внедрения компонента в страницу
     */
    created () {

    }

    /**
     * Запрос на обновление компонента
     *
     * @param {Bool} force - если true, компонент будет обновлен
     * немедленно с помощью замены старого представления компонента
     * на новый, иначе будут применены изменения в старое
     * представление
     */
    update (force = false) {
        if (!this.vdom) return;
        if (force) return this.updateForce();

        updateBlocks.add(this);
    }

    /**
     * Запрос на частичное обновление компонента
     */
    updatePartly () {
        const newDom = this.render();
        this.vdom = this.vdom.patch(newDom);
    }

    /**
     * Запрос на замену старого представления компонента на новый
     */
    updateForce () {
        const newDom = this.render();
        this.vdom = this.vdom.replace(newDom);
    }

    set slot (component) {
        this._slot = component;
        this.update(true);
    }

    get slot () {
        return this._slot;
    }

    /**
     * Первичное создание отображения компонента
     *
     * Создает представление компонента, включает механизм
     * обновления данного представления при изменении атрибутов
     * компонента. Вызывает хук внедрения компонента
     *
     * @returns {Element | Text}
     */
    renderReactive () {
        this.created();
        this.vdom = this.render() || new VDomText('');
        this.vdom.parentComponent = this;
        return this.vdom;
    }
}

export default Component;
