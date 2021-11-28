import VDomNode from './vdom-node';

/**
 * Компонент экранированного текста
 */
class VDomText extends VDomNode {
    constructor (text) {
        super();

        this.children = [];
        this.text = text;
        this.dom = null;
    }

    createElement () {
        this.dom = document.createTextNode(this.text);
        return this.dom;
    }

    patch (newJsxDom) {
        if (newJsxDom instanceof VDomText) {
            if (this.text !== newJsxDom.text) {
                this.text = newJsxDom?.dom?.textContent || newJsxDom?.text || '';
                this.dom.textContent = this.text;
            }
            return this;
        }

        return this.replace(newJsxDom);
    }

    replace (newJsxDom) {
        const newDom = newJsxDom.createElement();
        this.dom.replaceWith(newDom);

        return newJsxDom;
    }

    destroy () {
        this.dom?.remove();
    }
}

export default VDomText;
