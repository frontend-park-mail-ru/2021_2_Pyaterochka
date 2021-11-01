import Component from '../basecomponent';
import Button from '../button';

import './style.scss';

/**
 * Компонент каточки уровня подписки
 */
class LevelCard extends Component {
    constructor ({
        id = null,
        name = '',
        parentName = null,
        benefits = [],
        cover = '',
        price = '0 $',
        color = 'primary',
        btnText = 'Выбрать уровень',
        onClick = () => { }
    }) {
        super();
        this.attributes.id = id;
        this.attributes.name = name;
        this.attributes.parentName = parentName;
        this.attributes.benefits = benefits;
        this.attributes.cover = cover;
        this.attributes.price = price;
        this.attributes.color = color;

        this.attributes.btnText = btnText;
        this.attributes.onClick = onClick;
    }

    render () {
        const style = `
            background-color:var(--color-${this.attributes.color});
            background-image:url('${this.attributes.cover}'')
        `;
        const priceColor = `color:var(--color-${this.attributes.color})`;
        return (
            <div className="level-card">
                <div className="level-card__header" style={style}>
                    <div className="level-card__header-name">{this.attributes.name}</div>
                    <div className="level-card__header-type">уровень</div>
                </div>
                <div className="level-card__body">
                    {this.attributes.parentName
                        ? (
                            <div className="level-card__body-parent-level">
                                Все из уровня <b>{this.attributes.parentName}</b>, а также:
                            </div>
                        )
                        : (
                            ''
                        )}

                    {this.attributes.benefits.map((b, i) => {
                        return (
                            <div key={i} className="level-card__body-benefit">
                                {b}
                            </div>
                        );
                    })}
                </div>
                <div className="level-card__action">
                    <div className="level-card__action-price">
                        <div className="per-month">в месяц</div>
                        <div className="price" style={priceColor}>
                            {this.attributes.price}
                        </div>
                    </div>
                </div>
                <Button
                    text={this.attributes.btnText}
                    color={this.attributes.color}
                    onClick={() => { this.attributes.onClick(); }}
                />
            </div>
        );
    }
}
export default LevelCard;
