/** @module Поддержка JSX  */

import Component from '../components/basecomponent';
/**
 * Компонент экранированного текста
 */
class JSXDomText {
    constructor (text) {
        this.children = [];
        this.text = text;
        this.dom = null;
    }

    createElement () {
        this.dom = document.createTextNode(this.text);
        return this.dom;
    }

    patch (newJsxDom) {
        if (newJsxDom instanceof JSXDomText) {
            if (this.text !== newJsxDom.text) {
                this.text = newJsxDom.text;
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

/**
 * Компонент объединения нескольких компонентов в группу
 */
class Fragment extends Component {
    constructor (a, ...c) {
        super();
        this.c = c;
    }

    render () {
        return this.c;
    }
}

class $$$$$$Deprecated$$$$JSXDomBrowser {
    constructor (element) {
        console.warn('Using deprecated syntax. Please use JSX syntax.');

        this.children = [];

        this.dom = element;
    }

    createElement () {
        return this.dom;
    }

    patch (newJsxDom) {
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

/**
 * Обертка JSX для создания представления компонента с одним
 * ребенком или без детей
 *
 * @param {Function | String} Element - тип компонента, если поле
 * представлено строкой, то название тега, иначе класс компонента
 * @param {Object} attributes атрибуты компонента
 * @returns {Component | Text} представление компонента
 */
function jsx (Element, attributes) {
    return createElement(Element, attributes,
        attributes.children ? [attributes.children] : []);
}

/**
 * Обертка JSX для создания представления компонента
 * с несколькими детьми
 *
 * @param {Function | String} Element - тип компонента, если поле
 * представлено строкой, то название тега, иначе класс компонента
 * @param {Object} attributes атрибуты компонента
 * @returns {Component | Text} представление компонента
 */
function jsxs (Element, attributes) {
    return createElement(Element, attributes, attributes.children);
}

/**
 * Преобразует массив массивов в единый массив
 *
 * @param {any} a - исходный массив
 * @returns {any} результирующий массив
 */
function arrayOfArraysToArray (a) {
    if (!Array.isArray(a)) return a;

    return a.reduce((acc, a) => {
        if (!Array.isArray(a)) {
            return [...acc, a];
        }
        return [...acc, ...arrayOfArraysToArray(a)];
    }, []);
}

class JsxDomElement {
    constructor (tagName, attributes, jsxChildren) {
        this.attributes = {};
        this.listeners = {};
        this.dom = null;

        this.tagName = tagName;
        this.children = jsxChildren;
        this.children.forEach(child => { child.parent = this; });

        Object.keys(attributes).forEach(key => {
            if (!attributes[key]) return;
            if (key === 'children') return;
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

        if (this.parentComponent)
        {
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

/**
 * Создает представление компонента
 *
 * @param {Function | String} JsxElement - тип компонента, если поле
 * представлено строкой, то название тега, иначе класс компонента
 * @param {Object} attributes атрибуты компонента
 * @param {Array} jsxChildren дети компонента
 * @returns {Component | Text} представление компонента
 */
function createElement (JsxElement, attributes, jsxChildren) {
    const children = arrayOfArraysToArray(jsxChildren).map((child) => {
        if (child instanceof Element || child instanceof Text) {
            return new $$$$$$Deprecated$$$$JSXDomBrowser(child);
        }
        if (child instanceof JsxDomElement || child instanceof JSXDomText) {
            return child;
        }
        return new JSXDomText(child);
    });

    if (JsxElement instanceof Function) {
        const component = new JsxElement(attributes, ...children);
        return component.renderReactive();
    }

    return new JsxDomElement(JsxElement, attributes, children);
}

export { jsx, jsxs, Fragment };
