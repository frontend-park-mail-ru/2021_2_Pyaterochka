import Component from './basecomponent.js';

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

const styles = `
.skeleton-box {
    border-radius:10px;
    height: 10px;
    position: relative;
    overflow: hidden;
    background-color: var(--color-grey);
    min-width: 100px;
    max-width: 100%;
}
.skeleton-line {
    margin-bottom:10px;
}
.skeleton-circle {
    border-radius: 100%;
}

.skeleton-box::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
    animation: shimmer 2s infinite;
    content: '';
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
`;
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
