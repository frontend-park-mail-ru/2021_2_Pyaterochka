import { arrayOfArraysToArray, findReplacements } from './utils';
import VDomNode from './vdom-node';

class VDomElement implements VDomNode {
    dom: Element = null;
    children: VDomNode[] = [];
    tagName = '';
    className = '';
    key: string = null;
    parent: VDomNode = null;

    attributes: {
        [key: string]: string;
    } = {};

    listeners: {
        [key: string]: (this: Element, ev?: Event) => void;
    } = {};

    constructor (tagName: string, attributes: {
        [key: string]: unknown;
    }, jsxChildren: VDomNode[]) {
        this.attributes = {};
        this.listeners = {};
        this.dom = null;

        this.tagName = tagName;
        this.children = jsxChildren;
        this.children.forEach(child => { child.parent = this; });

        Object.entries(attributes).forEach(([key, value]) => {
            if (!attributes[key]) { return; }
            if (key === 'children') { return; }
            if (key === 'className') {
                if (Array.isArray(value)) {
                    this.className = value.join(' ');
                    return;
                }
                this.className = String(attributes[key]);
                return;
            }
            if (key.startsWith('on') && value instanceof Function) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.listeners[
                    key.substring(2).toLowerCase()
                ] = value;
                return;
            }
            this.attributes[key] = String(attributes[key]);
        });
    }

    createElement (): Element {
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

    setListeners (element: Element = this.dom) {
        Object.entries(this.listeners).forEach(([attr, val]) => element.addEventListener(attr, val));
    }

    removeListeners (element: Element = this.dom) {
        Object.entries(this.listeners).forEach(([attr, val]) => element.removeEventListener(attr, val));
    }

    destroy () {
        this.children.forEach(child => child.destroy());
        this.dom?.remove();
        this.removeListeners();

        this.dom = null;
    }

    replace (newJsxDom: VDomNode) {
        const newDom = newJsxDom.createElement();
        this.dom.replaceWith(newDom);

        this.destroy();

        return newJsxDom;
    }

    patch (newJsxDom: VDomNode) {
        if (
            !(newJsxDom instanceof VDomElement) ||
            newJsxDom.tagName !== this.tagName
        ) {
            return this.replace(newJsxDom);
        }

        if (!this.dom) {
            // console.error("Can't find DOM element of", this);
            return;
        }

        this.className = newJsxDom.className || '';
        this.dom.className = this.className;

        if (
            newJsxDom.attributes.contentEditable &&
            this.attributes.contentEditable
        ) {
            this.patchAttributes(newJsxDom);
            if (this.dom !== document.activeElement) {
                this.childrenPatchContentEditable(newJsxDom);
            }
            return this;
        }

        this.patchAttributes(newJsxDom);
        this.childrenPatch(newJsxDom);
        this.patchListeners(newJsxDom);

        return this;
    }

    childrenPatchContentEditable (newJsxDom: VDomElement) {
        this.dom.innerHTML = '';
        this.children.forEach(child => {
            child.destroy();
        });
        this.children = newJsxDom.children;
        this.children.forEach(child => {
            this.dom.appendChild(child.createElement());
        });
    }

    patchListeners (newJsxDom: VDomElement) {
        this.removeListeners();
        this.listeners = newJsxDom.listeners;
        this.setListeners();
    }

    patchAttributes (newJsxDom: VDomElement) {
        if (
            this.tagName === 'input' &&
            this.dom instanceof HTMLInputElement &&
            this.attributes.type !== 'checkbox' &&
            this.attributes.value !== newJsxDom.attributes.value
        ) {
            this.dom.value = newJsxDom.attributes.value || '';
        }

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

    prepareKeys (children: VDomNode[]) {
        children.forEach((child, i) => {
            if (child.key && !String(child.key).endsWith('_generated')) return;

            child.key = i + '_generated';
        });
        return children.map((child) => child.key);
    }

    async childrenPatch (newJsxDom: VDomElement) {
        const newChildren = arrayOfArraysToArray(newJsxDom.children);

        const oldKeys = this.prepareKeys(this.children);
        const newKeys = this.prepareKeys(newChildren);

        const replacements = findReplacements(oldKeys, newKeys);

        const patchedChildren = [];

        replacements.forEach(({ to, from }) => {
            if (to < 0) {
                // Deleted element
                const el = this.children[from];

                el.destroy();

                return;
            }
            if (from < 0) {
                // New element
                const el = newChildren[to];

                el.createElement();
                patchedChildren[to] = el;
                return;
            }

            // Replacement
            const oldElement = this.children[from];
            const newElement = newChildren[to];
            patchedChildren[to] = oldElement.patch(newElement);
        });

        if (patchedChildren.length) {
            const reversedChildren = patchedChildren.reverse();
            if (this.dom.lastChild !== reversedChildren[0].dom) {
                this.dom.appendChild(reversedChildren[0].dom);
            }
            reversedChildren.slice(1).forEach((element, i) => {
                if (element.dom.nextSibling !== reversedChildren[i].dom) {
                    this.dom.insertBefore(element.dom, reversedChildren[i].dom);
                }
            });
            patchedChildren.reverse();
        }

        this.children = patchedChildren;
    }
}

export default VDomElement;
