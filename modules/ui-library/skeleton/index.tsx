import Component from 'irbis/component';
import './style.scss';

const RECT = 'rect';
const TEXT = 'text';
const CIRCLE = 'circle';

type SkeletonType = typeof RECT | typeof TEXT | typeof CIRCLE;

/**
 * Компонент скелетона
 *
 * Элемент имитирующий элемент во время загрузки
 */
class Skeleton extends Component<{
    type?: SkeletonType,
    height?: number,
    width?: number
}> {
    defaultProps () {
        return {
            type: RECT,
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
        if (this.props.type === TEXT) {
            const count = Math.floor(this.props.height / 20);
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
        let style = `height: ${Number(this.props.height)}px;`;

        if (this.props.type === CIRCLE) {
            style += `width: ${this.props.height}px;`;
            className.push('skeleton-box--circle');
        }
        if (this.props.width) {
            style += `width: ${this.props.width}px;`;
        }

        return (<div
            className={className}
            style={style}
        />);
    }
}

export { SkeletonType };
export default Skeleton;
