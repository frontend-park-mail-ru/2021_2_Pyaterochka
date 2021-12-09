import { ComponentConstructor } from '../irbis/component';

/**
 * Путь роутера
 */
class Route {
    url: string;
    component: () => Promise<{ default: ComponentConstructor }>;
    title: string;
    name: string = null;
    data: string;

    constructor (route: {
        url: string,
        component: () => Promise<{ default: ComponentConstructor }>,
        title: string,
        name: string
    }
    ) {
        this.url = route.url;
        this.component = route.component;
        this.title = route.title;
        this.name = route.name;
    }
}
export default Route;
