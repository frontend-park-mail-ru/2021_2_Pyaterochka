import { arrayOfArraysToArray, findReplacements } from './utils';
import VDomNode from './vdom-node';

class VDomElement extends VDomNode {
    constructor (tagName, attributes, jsxChildren) {
        super();

        this.attributes = {};
        this.listeners = {};
        this.dom = null;

        this.tagName = tagName;
        this.children = jsxChildren;
        this.children.forEach(child => { child.parent = this; });

        this.className = '';

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
        Object.entries(this.listeners).forEach(([attr, val]) => element.addEventListener(attr, val));
    }

    removeListeners (element = this.dom) {
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
            // this.patchListeners(newJsxDom);
            return this;
        }

        this.patchAttributes(newJsxDom);
        this.childrenPatch(newJsxDom);
        this.patchListeners(newJsxDom);

        if (this.parentComponent) {
            this.parentComponent.dom = this;
        }

        if (newJsxDom.parentComponent) {
            newJsxDom.parentComponent.dom = this;
        }

        return this;
    }

    childrenPatchContentEditable (newJsxDom) {
        this.dom.innerText = '';
        this.children.forEach(child => {
            child.destroy();
        });
        this.children = newJsxDom.children;
        this.children.forEach(child => {
            this.dom.appendChild(child.createElement());
        });
    }

    patchListeners (newJsxDom) {
        this.removeListeners();
        this.listeners = newJsxDom.listeners;
        this.setListeners();
    }

    patchAttributes (newJsxDom) {
        if (this.tagName === 'input' && this.attributes.type !== 'checkbox' && this.attributes.value !== newJsxDom.attributes.value) {
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

    prepareKeys (children) {
        children.forEach((child, i) => {
            if (child.key && !String(child.key).endsWith('_generated')) return;

            child.key = i + '_generated';
        });
        return children.map((child) => child.key);
    }

    // getPositions(children) {
    //     return children.map(element => {
    //         if (!element.dom) {
    //             console.log("NULL DOM", element);
    //             return null;
    //         }
    //         if (!element.dom.getBoundingClientRect) {
    //             return [0, 0];
    //         }
    //         const pos = element.dom.getBoundingClientRect();

    //         return [pos.left, pos.top];
    //     })
    // }

    async childrenPatch (newJsxDom) {
        const newChildren = arrayOfArraysToArray(newJsxDom.children);

        const oldKeys = this.prepareKeys(this.children);
        const newKeys = this.prepareKeys(newChildren);

        const replacements = findReplacements(oldKeys, newKeys);

        const patchedChildren = [];

        replacements.forEach(r => {
            if (r.to < 0) {
                // Deleted element
                const el = this.children[r.from];

                el.destroy();

                return;
            }
            if (r.from < 0) {
                // New element
                const el = newChildren[r.to];

                el.createElement();
                patchedChildren[r.to] = el;
                return;
            }

            // Replacement
            const oldElement = this.children[r.from];
            const newElement = newChildren[r.to];
            patchedChildren[r.to] = oldElement.patch(newElement);
        });

        // await nextTick()

        // const oldPos = this.getPositions(patchedChildren)

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

        // const newPos = this.getPositions(patchedChildren);

        // oldPos.forEach(async (oldP, i) => {
        //     if (replacements[i].from < 0) {
        //         const element = patchedChildren[i].dom;
        //         if (element instanceof Text) {
        //             return;
        //         }

        //         const oldD = element.style.visibility;
        //         element.style.visibility = 'hidden'
        //         await nextTick();
        //         element.style.visibility = oldD

        //         element.classList.add("fade-in");
        //         element.addEventListener("animationend", () => {
        //             element.classList.remove("fade-in")
        //         }, {
        //             once: true
        //         })

        //         return;
        //     }

        //     const newP = newPos[i];
        //     if (!newP) return;

        //     const dx = oldP[0] - newP[0];
        //     const dy = oldP[1] - newP[1];

        //     const element = patchedChildren[i].dom;

    //     if (dx || dy) {
    //         element.style.transform = `translate(${dx}px, ${dy}px)`;
    //         await nextTick();
    //         element.classList.add("move");
    //         element.style.transform = ``;
    //         element.addEventListener("transitionend", () => {
    //             element.classList.remove("move");
    //         }, {
    //             once: true
    //         })
    //     }
    // })
    }
}

export default VDomElement;
