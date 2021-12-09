import Component from 'irbis/component';
import Button from '../button';

import './style.scss';

/**
 * Компонент каточки уровня подписки
 */
class LevelCard extends Component<{
    id?: string,
    name?: string,
    parentName?: string,
    benefits: string[],
    cover: string,
    price: string,
    color?: string,
    btnText?: string,
    onClick?: () => unknown
}> {
    defaultProps () {
        return {
            id: null,
            name: '',
            parentName: null,
            benefits: [],
            cover: '',
            price: '0 $',
            color: 'primary',
            btnText: 'Выбрать уровень',
            onClick: () => {
            }
        };
    }

    render () {
        const style = `
            background-color:var(--color-${this.props.color});
            background-image:url('${this.props.cover}')
        `;
        const priceColor = `color:var(--color-${this.props.color})`;
        return (
            <div
                className={[
                    'level-card',
                    !this.props.cover ? 'level-card--no-cover' : ''
                ]}
            >
                <div
                    className="level-card__header"
                    style={style}
                >
                    <div className="level-card__header-name">
                        {this.props.name}
                    </div>

                    <div className="level-card__header-type">
                        уровень
                    </div>
                </div>

                <div className="level-card__body">
                    {this.props.parentName
                        ? (
                            <div className="level-card__body-parent-level">
                                Все из уровня
                                {' '}

                                <b>
                                    {this.props.parentName}
                                </b>
                                , а также:
                            </div>
                        )
                        : (
                            ''
                        )}

                    {this.props.benefits.map((b, i) => {
                        return (
                            <div
                                className="level-card__body-benefit"
                                key={i}
                            >
                                {b}
                            </div>
                        );
                    })}
                </div>

                <div className="level-card__action">
                    <div className="level-card__action-price">
                        <div className="per-month">
                            в месяц
                        </div>

                        <div
                            className="price"
                            style={priceColor}
                        >
                            {this.props.price}
                        </div>
                    </div>
                </div>

                <Button
                    color={this.props.color}
                    onClick={() => {
                        this.props.onClick();
                    }}
                    text={this.props.btnText}
                />
            </div>
        );
    }
}

export default LevelCard;
