/**
 * Компонент экранированного текста
 */
class JsxDomText {
    constructor(text) {
        this.children = [];
        this.text = text;
        this.dom = null;
    }

    createElement() {
        this.dom = document.createTextNode(this.text);
        return this.dom;
    }

    patch(newJsxDom) {
        if (newJsxDom instanceof JsxDomText) {
            if (this.text !== newJsxDom.text) {
                this.text = newJsxDom.text;
                this.dom.textContent = this.text;
            }
            return this;
        }

        return this.replace(newJsxDom);
    }

    replace(newJsxDom) {
        const newDom = newJsxDom.createElement();
        this.dom.replaceWith(newDom);

        return newJsxDom;
    }

    destroy() {
        this.dom?.remove();
    }
}

export default JsxDomText