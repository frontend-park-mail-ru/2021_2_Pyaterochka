class App {
    setup (component, container) {
        this.component = component;
        this.container = container;

        this.forceUpdate();
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
