
/**
 * Путь роутера
 */
class Route {
    constructor ({ url, component, title = '', name = null }) {
        this.url = url;
        this.component = component;
        this.title = title;
        this.name = name;
    }
}
export default Route;
