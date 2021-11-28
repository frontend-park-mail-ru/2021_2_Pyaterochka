class App {
    setup (component, container) {
        this.setComponent(component);
        this.container = container;

        this.forceUpdate();
    }

    setComponent (component) {
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

export default new App();
