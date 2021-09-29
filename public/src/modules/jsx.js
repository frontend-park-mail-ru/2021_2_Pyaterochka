/** @module Поддержка JSX  */

import Component from '../components/basecomponent.js';

/**
 * Компонент экранированного текста
 */
class JsxTextComponent extends Component {
    constructor (text) {
        super();
        this.text = text;
    }

    render () {
        return document.createTextNode(this.text);
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
            return child;
        }
        return (new JsxTextComponent(child)).render();
    });

    if (JsxElement instanceof Function) {
        const component = new JsxElement(attributes, ...children);
        return component.renderReactive();
    }
    const component = document.createElement(JsxElement);
    Object.keys(attributes).forEach(key => {
        if (!attributes[key]) return;
        if (key === 'children') return;
        if (key === 'className') {
            if (Array.isArray(attributes[key])) {
                component.setAttribute(
                    'class',
                    attributes[key].join(' ')
                );
                return;
            }
            component.setAttribute('class', attributes[key]);
            return;
        }
        if (key.startsWith('on')) {
            if (attributes[key] instanceof Function) {
                component.addEventListener(
                    key.substr(2).toLowerCase(),
                    attributes[key]
                );
                return;
            }
        }
        component.setAttribute(key, attributes[key]);
    });
    children.forEach((child) => {
        component.appendChild(child);
    });
    return component;
}

export { jsx, jsxs, Fragment };
