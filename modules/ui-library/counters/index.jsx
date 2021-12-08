import Component from 'irbis/component';
import IconComponent from '../icon';
import SimplifyNumComponent from '../simplify-num';
import './style.scss';

class CountersComponent extends Component {
    defaultProps () {
        return {
            likes: null,
            views: null
        };
    }

    render () {
        return (<div className="counters">
            {
                this.props.views
                    ? <span className="counters__visits">
                        <IconComponent
                            size={18}
                            url="/imgs/icons/view_outline_28.svg"
                            color="var(--color-text)"
                            colorHover="var(--color-text)"
                        />

                        <SimplifyNumComponent num={this.props.views} />
                    </span>
                    : ''
            }

            {
                this.props.likes
                    ? <span className="counters__likes">
                        <IconComponent
                            size={18}
                            url="/imgs/icons/like_outline_28.svg"
                            color="var(--color-text)"
                            colorHover="var(--color-text)"
                        />

                        <SimplifyNumComponent num={this.props.likes} />
                    </span>
                    : ''
            }
        </div>);
    }
}

export default CountersComponent;
