import Component from 'irbis/component';
import SimplifyNumComponent from '../simplify-num';
import './style.scss';

/**
 * Компонент лайка
 */

class Like extends Component<{
    user: boolean,
    liked?: boolean,
    count?: number,
    onClick: () => unknown
}> {
    defaultProps () {
        return {
            user: null,
            liked: false,
            count: 0,
            onClick: () => {
            }
        };
    }

    render () {
        return (
            <div className="like">
                <button
                    className={['like__link', this.props.liked ? 'like_has-like' : '']}
                    onClick={
                        this.props.user
                            ? (e) => {
                                this.hasLike(e);
                            }
                            : null
                    }
                />

                <span className="like__count">
                    <SimplifyNumComponent num={this.props.count} />
                </span>
            </div>
        );
    }

    hasLike (e) {
        e.preventDefault();

        this.props.onClick();
    }
}

export default Like;
