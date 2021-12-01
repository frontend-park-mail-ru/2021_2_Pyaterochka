import Component from 'irbis/component';
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
                        <img src="/imgs/icons/view_outline_28.svg" />

                        <SimplifyNumComponent num={this.props.views} />
                    </span>
                    : ''
            }

            {
                this.props.likes
                    ? <span className="counters__likes">
                        <img src="/imgs/icons/like_outline_28.svg" />

                        <SimplifyNumComponent num={this.props.likes} />
                    </span>
                    : ''
            }
        </div>);
    }
}

export default CountersComponent;
