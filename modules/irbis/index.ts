import VDomNode from './vdom/vdom-node';

interface AppInterface {
    setup (component: VDomNode, container: Element): void,

    setComponent (component: VDomNode): void,

    forceUpdate (): void,

    update (): void,
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

const app: AppInterface = new App();

export { AppInterface };

export default app;
