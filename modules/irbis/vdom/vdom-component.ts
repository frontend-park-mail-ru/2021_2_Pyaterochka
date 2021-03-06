import Component, { ComponentConstructor } from '../component';
import VDomNode from './vdom-node';

class VDomComponent implements VDomNode {
    _component: Component<unknown, unknown> = null;
    Component: ComponentConstructor<unknown, unknown>;
    props: {
        [key: string]: unknown
    };

    slot: VDomNode[]

    children = [];
    parent = null;

    constructor (Component: ComponentConstructor, props: {
        [key: string]: unknown
    }, slot: VDomNode[]) {
        this.Component = Component;
        this.props = props;
        this.slot = slot;
    }

    createElement () {
        this._component = new this.Component(this.props, ...this.slot);
        this._component.setProps(this.props);
        this._component.renderReactive();

        return this._component.vdom.createElement();
    }

    get dom () {
        return this._component.vdom.dom;
    }

    replace (newJsxDom) {
        const newDom = newJsxDom.createElement();
        this._component.vdom.dom.replaceWith(newDom);

        this.destroy();

        return newJsxDom;
    }

    patch (newJsxDom) {
        if (!(newJsxDom instanceof VDomComponent && newJsxDom.Component === this.Component)) {
            return this.replace(newJsxDom);
        } else {
            this.props = newJsxDom.props;
            this._component.setProps(newJsxDom.props);
            return this;
        }
    }

    destroy () {
        if (this?._component?.vdom) {
            this._component.vdom.destroy();
        }
    }
}

export default VDomComponent;
