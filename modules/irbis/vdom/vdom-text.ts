import VDomNode from './vdom-node';

/**
 * Компонент экранированного текста
 */
class VDomText implements VDomNode {
    children = [];
    dom?: Text;
    text: string;
    parent: VDomNode = null;

    constructor (text: string) {
        this.text = text;
        this.dom = null;
    }

    createElement () {
        this.dom = document.createTextNode(this.text);
        return this.dom;
    }

    patch (newJsxDom: VDomNode) {
        if (newJsxDom instanceof VDomText) {
            if (this.text !== newJsxDom.text) {
                this.text = newJsxDom?.dom?.textContent || newJsxDom?.text || '';
                this.dom.textContent = this.text;
            }
            return this;
        }

        return this.replace(newJsxDom);
    }

    replace (newJsxDom: VDomNode) {
        const newDom = newJsxDom.createElement();
        this.dom.replaceWith(newDom);

        return newJsxDom;
    }

    destroy () {
        this.dom?.remove();
    }
}

export default VDomText;
