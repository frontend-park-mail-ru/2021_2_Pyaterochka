
/**
 * Путь роутера
 */
class Route {
    constructor (url, component, title = '') {
        this.url = url;
        this.component = component;
        this.title = title;
        this.loadingView = null;
    }
}
export default Route;
