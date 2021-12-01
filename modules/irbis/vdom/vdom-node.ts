/**
 * Узел виртуального дерева
 */
interface VDomNode {
    children: VDomNode[];
    dom?: Element | Text;
    key?: string;
    parent: VDomNode;

    /**
     * Создать DOM дерево
     */
    createElement(): Element | Text;

    /**
     * Применить изменения в дереве
     */
    patch(newJsxDom: VDomNode): VDomNode;

    /**
     * Заменить данное виртуальное дерево другим деревом
     */
    replace(newJsxDom: VDomNode): VDomNode;

    /**
     * Уничтожить данное виртуальное дерево
     */
    destroy();
}

export default VDomNode;
