import Component from '../basecomponent';
import SimplifyNumComponent from '../simplify-num';
import './style.scss';

/**
 * Компонент лайка
 */

class Like extends Component {
    defaultProps () {
        return {
            user: null,
            liked: false,
            count: 0,
            onClick: () => { }
        };
    }

    render () {
        return (
            <div className="like">
                <button
                    className={['like__link', this.attributes.liked ? 'like_has-like' : '']}
                    onClick={
                        this.attributes.user
                            ? (e) => {
                                this.hasLike(e);
                            }
                            : null
                    }
                />

                <span className="like__count">
                    <SimplifyNumComponent num={this.attributes.count} />
                </span>
            </div>
        );
    }

    hasLike (e) {
        e.preventDefault();

        this.attributes.onClick();
    }
}

export default Like;
