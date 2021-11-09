/** @module Поддержка JSX  */

import { arrayOfArraysToArray } from './utils';
import JsxDomElement from './JsxDomElement';
import JsxDomText from './JsxDomText';
import Fragment from './Fragment';

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
function jsx (Element, attributes, key = null) {
    return createElement(Element, attributes,
        attributes.children ? [attributes.children] : [], key);
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
function jsxs (Element, attributes, key = null) {
    return createElement(Element, attributes, attributes.children, key);
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
function createElement (JsxElement, attributes, jsxChildren, key) {
    const children = arrayOfArraysToArray(jsxChildren).map((child) => {
        if (child instanceof Element || child instanceof Text) {
            return new $$$$$$Deprecated$$$$JSXDomBrowser(child);
        }
        if (child instanceof JsxDomElement || child instanceof JsxDomText) {
            return child;
        }
        return new JsxDomText(child);
    });

    if (JsxElement instanceof Function) {
        const component = new JsxElement(attributes, ...children);
        const el = component.renderReactive();
        el.key = key;
        return el;
    }

    const el = new JsxDomElement(JsxElement, attributes, children);
    el.key = key;
    el.attributes.key = key;
    return el;
}

export { jsx, jsxs, Fragment };
