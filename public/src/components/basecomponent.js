import patchDom from './base/patchDom.js';

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
setInterval(applyUpdates, 10);

/**
 * Базовый компонент, заложен интерфейс компонента и его обновление
 */
class Component {
    constructor () {
        const getter = (attrs, key) => attrs[key];

        const update = (attrs, key, value) => {
            if (value instanceof Object && !(value instanceof Date)) {
                value = new Proxy(value, {
                    set: update,
                    get: getter
                });
            }
            attrs[key] = value;
            this.update();
            return true;
        };
        this.attributes = new Proxy({}, {
            set: update,
            get: getter
        });
        this._slot = null;
        this.dom = null;
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
        if (!this.dom) return;
        if (force) return this.updateForce();

        updateBlocks.add(this);
    }

    /**
     * Запрос на частичное обновление компонента
     */
    updatePartly () {
        const newDom = this.render();
        this.dom = patchDom(this.dom, newDom);
    }

    /**
     * Запрос на замену старого представления компонента на новый
     */
    updateForce () {
        const newDom = this.render();
        this.dom.replaceWith(newDom);
        this.dom = newDom;
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
        this.dom = this.render();
        return this.dom;
    }
}

export default Component;
