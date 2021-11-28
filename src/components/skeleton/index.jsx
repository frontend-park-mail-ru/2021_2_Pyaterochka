import Component from '../basecomponent';
import './style.scss';

/**
 * Компонент скелетона
 *
 * Элемент имитирующий элемент во время загрузки
 */
class Skeleton extends Component {
    defaultProps () {
        return {
            type: 'rect',
            height: 200,
            width: null
        };
    }

    range (count) {
        const array = [];
        for (let i = 0; i < count; i++) {
            array.push(i);
        }
        return array;
    }

    render () {
        if (this.attributes.type === 'text') {
            const count = Math.floor(this.attributes.height / 20);
            return (<div>
                {this.range(count).map(i => (
                    <div
                        className="skeleton-box skeleton-box--line"
                        key={i}
                    />
                ))}
            </div>);
        }

        const className = ['skeleton-box'];
        let style = `height: ${Number(this.attributes.height)}px;`;

        if (this.attributes.type === 'circle') {
            style += `width: ${this.attributes.height}px;`;
            className.push('skeleton-box--circle');
        }
        if (this.attributes.width) {
            style += `width: ${this.attributes.width}px;`;
        }

        return (<div
            className={className}
            style={style}
        />);
    }
}
export default Skeleton;
