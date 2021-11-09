import Component from '../basecomponent';
import SimplifyNumComponent from '../simplify-num';
import './style.scss';

class CountersComponent extends Component {
    constructor ({
        likes = null,
        views = null
    }) {
        super();
        this.attributes.likes = likes;
        this.attributes.views = views;
    }

    render () {
        return <div className="counters">
            {
                this.attributes.views
                    ? <span className="counters__visits">
                        <img src="/imgs/icons/view_outline_28.svg" />
                        <SimplifyNumComponent num={this.attributes.views} />
                    </span>
                    : ''
            }
            {
                this.attributes.likes
                    ? <span className="counters__likes">
                        <img src="/imgs/icons/like_outline_28.svg" />
                        <SimplifyNumComponent num={this.attributes.likes} />
                    </span>
                    : ''
            }
        </div>;
    }
}

export default CountersComponent;
