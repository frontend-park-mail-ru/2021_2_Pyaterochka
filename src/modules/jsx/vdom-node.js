/**
 * Узел виртуального дерева
 */
class VDomNode {
    constructor () {
        this.children = [];
    }

    /**
     * Создать DOM дерево
     *
     * @returns Element | Text
     */
    createElement () {

    }

    /**
     * Применить изменения в дереве
     * @param {*} newJsxDom
     */
    patch (newJsxDom) {

    }

    /**
     * Заменить данное виртуальное дерево другим деревом
     * @param {*} newJsxDom
     */
    replace (newJsxDom) {

    }

    /**
     * Уничтожить данное виртуальное дерево
     */
    destroy () {

    }
}

export default VDomNode;
