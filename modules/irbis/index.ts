import VDomNode from './vdom/vdom-node';

interface AppInterface {
    setup (component: VDomNode, container: Element): void,
    setComponent (component: VDomNode):void,
    forceUpdate ():void,
    update (): void,
    [key: `$${string}`]: unknown,
}

class App {
    container: Element = null;
    component: VDomNode = null;

    setup (component: VDomNode, container: Element) {
        this.setComponent(component);
        this.container = container;

        this.forceUpdate();
    }

    setComponent (component: VDomNode) {
        this.component = component;
    }

    forceUpdate () {
        this.container.innerHTML = '';
        this.container.appendChild(this.component.createElement());
    }

    update () {
        this.forceUpdate();
    }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const app:AppInterface = new App();

export default app;
