import Component from '../basecomponent';
import SimplifyNumComponent from '../simplify-num';
import './style.scss';

/**
 * Компонент лайка
 */

class Like extends Component {
    constructor ({
        user = null,
        liked = false,
        count = 0,
        onClick = () => {

        }
    }) {
        super();
        this.attributes.user = user;
        this.attributes.liked = liked;
        this.attributes.count = count;
        this.attributes.onClick = onClick;
    }

    render () {
        return (
            <div className="like">
                <button
                    onClick={
                        this.attributes.user
                            ? (e) => {
                                this.hasLike(e);
                            }
                            : null}
                    className={['like__link', this.attributes.liked ? 'like_has-like' : '']}
                />
                <span className="like__count"><SimplifyNumComponent num={this.attributes.count}/></span>
            </div>
        );
    }

    hasLike (e) {
        e.preventDefault();

        this.attributes.onClick();
    }
}

export default Like;
