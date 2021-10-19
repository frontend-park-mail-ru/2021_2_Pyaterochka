class JsxDomElement {
    constructor (tagName, attributes, jsxChildren) {
        this.attributes = {};
        this.listeners = {};
        this.dom = null;

        this.tagName = tagName;
        this.children = jsxChildren;
        this.children.forEach(child => { child.parent = this; });

        Object.keys(attributes).forEach(key => {
            if (!attributes[key]) { return; }
            if (key === 'children') { return; }
            if (key === 'className') {
                if (Array.isArray(attributes[key])) {
                    this.className = attributes[key].join(' ');
                    return;
                }
                this.className = attributes[key];
                return;
            }
            if (key.startsWith('on')) {
                if (attributes[key] instanceof Function) {
                    this.listeners[key.substr(2).toLowerCase()] = attributes[key];
                    return;
                }
            }
            this.attributes[key] = attributes[key];
        });
    }

    createElement () {
        const element = document.createElement(this.tagName);
        this.dom = element;

        element.className = this.className;

        this.children
            .map(child => child.createElement())
            .forEach(child => element.appendChild(child));

        Object.entries(this.attributes).forEach(([attr, val]) => element.setAttribute(attr, val));

        this.setListeners();

        return element;
    }

    setListeners (element = this.dom) {
        // Object.entries(this.listeners).forEach(([attr, val]) => console.log("addListeners ", attr, val, element))
        Object.entries(this.listeners).forEach(([attr, val]) => element.addEventListener(attr, val));
    }

    removeListeners (element = this.dom) {
        // Object.entries(this.listeners).forEach(([attr, val]) => console.log("removeListener ", attr, val, element))
        Object.entries(this.listeners).forEach(([attr, val]) => element.removeEventListener(attr, val));
    }

    destroy () {
        this.children.forEach(child => child.destroy());
        this.dom?.remove();
        this.removeListeners();
        this.dom = null;
    }

    replace (newJsxDom) {
        const newDom = newJsxDom.createElement(true);
        this.dom.replaceWith(newDom);

        if (this.parentComponent) {
            this.parentComponent.dom = newDom;
        }

        this.destroy();

        return newJsxDom;
    }

    patch (newJsxDom) {
        if (newJsxDom.tagName !== this.tagName) {
            return this.replace(newJsxDom);
        }

        this.className = newJsxDom.className;
        this.dom.className = this.className;

        this.patchAttributes(newJsxDom);
        this.childrenPatch(newJsxDom);

        if (this.parentComponent) {
            this.parentComponent.dom = this;
        }

        return this;
    }

    patchAttributes (newJsxDom) {
        const oldKeys = Object.keys(this.attributes);
        const newKeys = Object.keys(newJsxDom.attributes);

        newKeys.forEach(key => {
            const newAttr = newJsxDom.attributes[key];
            const oldAttr = this.attributes[key];

            if (newAttr !== oldAttr) {
                this.dom.setAttribute(key, newAttr);
            }
        });

        const removedKeys = oldKeys.filter(key => !newKeys.includes(key));
        removedKeys.forEach(key => {
            this.dom.removeAttribute(key);
        });
    }

    childrenPatch (newJsxDom) {
        if (newJsxDom.attributes.contentEditable && this.attributes.contentEditable) {
            return;
        }

        const newChildren = newJsxDom.children;

        // console.log(this.children, newChildren, this, newJsxDom);
        const minI = Math.min(this.children.length, newChildren.length);

        for (let i = 0; i < minI; ++i) {
            this.children[i] = this.children[i].patch(newChildren[i]);
        }

        if (this.children.length >= newChildren.length) {
            this.children.slice(minI).forEach((el) => {
                el.destroy();
            });
            this.children = this.children.slice(0, minI);

            return;
        }
        newChildren.slice(minI).forEach((el) => {
            this.children.push(el);
            this.dom.appendChild(el.createElement());
        });
    }
}

export default JsxDomElement;
