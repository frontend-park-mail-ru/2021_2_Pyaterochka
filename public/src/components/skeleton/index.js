import Component from '../basecomponent';
import './style.scss';

/**
 * Компонент скелетона
 *
 * Элемент имитирующий элемент во время загрузки
 */
class Skeleton extends Component {
    constructor ({ type = 'rect', height = 200, width = null } = {}) {
        super();
        this.attributes.type = type;
        this.attributes.height = height;
        this.attributes.width = width;
    }

    render () {
        const element = document.createElement('div');
        if (this.attributes.type === 'text') {
            const count = Math.floor(this.attributes.height / 20);
            for (let i = 0; i < count; i++) {
                const line = document.createElement('div');
                line.className = 'skeleton-box skeleton-line';
                element.appendChild(line);
            }
            return element;
        }

        element.className = 'skeleton-box';
        element.style.height = this.attributes.height + 'px';
        if (this.attributes.type === 'circle') {
            element.style.width = this.attributes.height + 'px';
            element.className += ' skeleton-circle';
        }
        if (this.attributes.width) {
            element.style.width = this.attributes.width + 'px';
        }

        return element;
    }
}
export default Skeleton;
