import { ComponentConstructor } from '../component';
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
 * @param key
 * @returns {Component | Text} представление компонента
 */
function jsx (Element: ComponentConstructor | string, attributes: {
    children: VDomNode | string | null,
    [key: string]: unknown
}, key: string = null) {
    return createVDomNode(Element, attributes,
        attributes.children ? [attributes.children] : [], key);
}

/**
 * Обертка JSX для создания представления компонента
 * с несколькими детьми
 *
 * @param {ComponentConstructor | string} Element - тип компонента, если поле
 * представлено строкой, то название тега, иначе класс компонента
 * @param {Object} attributes атрибуты компонента
 * @param {string} key ключ
 * @returns {Component | Text} представление компонента
 */
function jsxs (Element: ComponentConstructor | string, attributes: {
    children: (VDomNode | string)[],
    [key: string]: unknown
}, key: string = null) {
    return createVDomNode(Element, attributes, attributes.children, key);
}

/**
 * Создает представление компонента
 *
 * @param {Function | String} JsxElement - тип компонента, если поле
 * представлено строкой, то название тега, иначе класс компонента
 * @param {Object} attributes атрибуты компонента
 * @param {Array} jsxChildren дети компонента
 * @param key
 * @returns {Component | Text} представление компонента
 */
function createVDomNode (JsxElement: ComponentConstructor | string, attributes: {
    [key: string]: unknown
}, jsxChildren: (VDomNode | string)[], key: string) {
    const children = arrayOfArraysToArray(jsxChildren)
        .map(child => child || '')
        .map((child) => {
            if (
                child instanceof VDomComponent ||
                child instanceof VDomText ||
                child instanceof VDomElement
            ) {
                return child;
            }
            return new VDomText(String(child));
        });

    if (typeof JsxElement === 'string') {
        const el = new VDomElement(JsxElement, attributes, children);
        el.key = key;
        el.attributes.key = key;
        return el;
    } else {
        if (JsxElement === Fragment) {
            return children;
        } else {
            return new VDomComponent(JsxElement, attributes, children);
        }
    }
}

export { jsx, jsxs };
