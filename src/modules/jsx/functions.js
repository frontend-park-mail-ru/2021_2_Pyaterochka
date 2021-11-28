import Fragment from './fragment';
import { arrayOfArraysToArray } from './utils';
import VDomComponent from './vdom-component';
import VDomElement from './vdom-element';
import VDomNode from './vdom-node';
import VDomText from './vdom-text';

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
    return createVDomNode(Element, attributes,
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
    return createVDomNode(Element, attributes, attributes.children, key);
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
function createVDomNode (JsxElement, attributes, jsxChildren, key) {
    const children = arrayOfArraysToArray(jsxChildren)
        .map(child => child || '')
        .map((child) => {
            if (child instanceof VDomNode) {
                return child;
            }
            return new VDomText(child);
        });

    if (JsxElement instanceof Function) {
        if (JsxElement === Fragment) {
            return children;
        }
        return new VDomComponent(JsxElement, attributes, children);
    }

    const el = new VDomElement(JsxElement, attributes, children);
    el.key = key;
    el.attributes.key = key;
    return el;
}

export { jsx, jsxs };
