import Component from '../components/basecomponent.js';

class JsxTextComponent extends Component {
    constructor (text) {
        super();
        this.text = text;
    }

    render () {
        return document.createTextNode(this.text);
    }
}
class Fragment extends Component {
    constructor (a, ...c) {
        super();
        this.c = c;
    }

    render () {
        return this.c;
    }
}

function jsx (Element, attributes) {
    return createElement(Element, attributes,
        attributes.children ? [attributes.children] : []);
}

/**
 * Use for many children
 * @param {any} element
 * @param {} attributes
 */
function jsxs (Element, attributes) {
    return createElement(Element, attributes, attributes.children);
}

function arrayOfArraysToArray (a) {
    if (!Array.isArray(a)) return a;

    return a.reduce((acc, a) => {
        if (!Array.isArray(a)) {
            return [...acc, a];
        }
        return [...acc, ...arrayOfArraysToArray(a)];
    }, []);
}

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
        if (key === 'className') {
            if (Array.isArray(attributes[key])) {
                component.setAttribute('class', attributes[key].join(' '));
                return;
            }
            component.setAttribute('class', attributes[key]);
            return;
        }
        if (key.startsWith('on')) {
            if (attributes[key] instanceof Function) {
                component.addEventListener(key.substr(2), attributes[key]);
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
