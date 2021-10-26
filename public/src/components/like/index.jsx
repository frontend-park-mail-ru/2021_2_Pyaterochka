import Component from '../basecomponent';
import SimplifyNumComponent from '../simplify-num';
import './style.css';

/**
 * Компонент лайка
 */

class Like extends Component {
    constructor ({
        user = null,
        liked = false,
        count = 0
    }) {
        super();
        this.attributes.user = user;
        this.attributes.liked = liked;
        this.attributes.count = count;
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
                    className={['like-link', this.attributes.liked ? 'has-like' : '']}
                />
                <span className="likes-count"><SimplifyNumComponent num={this.attributes.count}/></span>
            </div>
        );
    }

    hasLike (e) {
        e.preventDefault();

        if (!this.attributes.liked) {
            this.attributes.count++;
            this.attributes.liked = true;
        } else {
            this.attributes.count--;
            this.attributes.liked = false;
        }
    }
}

export default Like;