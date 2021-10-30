import Component from '../../components/basecomponent';
import Button from '../../components/button';
import CreatorCard from '../../components/creator-card';
import LevelCard from '../../components/level-card';
import Spinner from '../../components/spinner';

import './style.css';

class PaymentPage extends Component {
    render () {
        if (!this.attributes.level || !this.attributes.creator) { return <Spinner />; }

        return <div className="payment-page">
            <div className="payment-page__topper">
                <CreatorCard
                    noHoverShadow
                    name={this.attributes.creator.name}
                    description={this.attributes.creator.description}
                    avatar={this.attributes.creator.avatar}
                />

                <div className="payment-page__topper__about">
                    <p className="payment-page__title">
                        Оформление подписки на уровень <b>{this.attributes.level.name}</b>
                    </p>

                    <p> Вы получите следующие преимущества:</p>

                    {this.attributes.level.benefits.map((benefit, i) => (
                        <p key={i} className="level-card__body__benefit">{benefit}</p>
                    ))}

                    <Button
                        color="primary"
                        text={<>Оформить подписку за <b>{this.attributes.level.price}</b> в месяц</>}
                    />
                    <div className="payment-page__disclaimer">
                        В любой момент Вы можете отказаться от подписки
                    </div>
                </div>

            </div>

            <div className="payment-page__other-levels-title">
                Вас могут заинтересовать другие уровни <b>{this.attributes.creator.name}</b>

            </div>
            <div className="payment-page__other-levels-container">
                {this.attributes.otherLevels.map((level) => (
                    <LevelCard
                        key={level.id}
                        id={level.id}
                        name={level.name}
                        parentName={level.parentName}
                        benefits={level.benefits}
                        cover={level.cover}
                        price={level.price}
                    />
                ))}
            </div>

        </div>;
    }

    created () {
        this.attributes.level = {
            name: 'Геймер',
            parentName: 'Новичок',
            cover:
                'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg',
            benefits: [
                'Доступ к реализации алгоритмов',
                'Безлимитное мыло из Анапы',

                'Доступ к реализации алгоритмов',
                'Безлимитное мыло из Анапы',

                'Доступ к реализации алгоритмов',
                'Безлимитное мыло из Анапы'
            ],
            price: '10 $',
            color: 'accent'
        };

        this.attributes.otherLevels = [
            {
                name: 'Новичок',
                cover:
                    'https://wallpaperscave.ru/images/original/18/01-10/abstract-colors-8119.jpg',
                benefits: [
                    'Доступ к реализации алгоритмов',
                    'Безлимитное мыло из Анапы'
                ],
                price: '10 $'
            },
            {
                name: 'Профессионал',
                parentName: 'Геймер',
                cover:
                    'https://wallpaperscave.ru/images/original/18/01-10/abstract-colors-8119.jpg',
                benefits: [
                    'Доступ к реализации алгоритмов',
                    'Безлимитное мыло из Анапы'
                ],
                price: '10 $'
            }
        ];

        this.attributes.creator = {
            name: 'IU7-memes',
            description: 'создает мемы из закулисий цирка',
            avatar:
                'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
        };
    }
}

export default PaymentPage;
