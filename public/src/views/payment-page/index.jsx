import api from '../../api';
import Component from '../../components/basecomponent';
import Button from '../../components/button';
import CreatorCard from '../../components/creator-card';
import LevelCard from '../../components/level-card';
import app from '../../core/app';
import ErrorPage from '../errorpage';
import LoadingView from '../loading-view';

import './style.scss';

class PaymentPage extends Component {
    constructor () {
        super();

        this.attributes.pay = true;
        this.attributes.loading = true;
        this.attributes.loadingMessage = false;
    }

    async pay () {
        this.attributes.loadingMessage = 'Оплата';

        await api.levelSubscribe(this.creatorId, this.levelId);

        app.$router.go(app.$router.createUrl('profile'));
    }

    async unsubscribe () {
        this.attributes.loadingMessage = 'Отмена подписки';

        await api.levelUnsubscribe(this.creatorId, this.levelId);

        app.$router.go(app.$router.createUrl('profile'));
    }

    render () {
        if (this.attributes.loading) {
            return <LoadingView>
                {
                    this.attributes.pay
                        ? 'Загрузка страницы оплаты'
                        : 'Загрузка страницы отмены подписки'
                }

            </LoadingView>;
        }

        if (this.attributes.loadingMessage) {
            return <LoadingView>
                {this.attributes.loadingMessage}
            </LoadingView>;
        }

        if (!this.attributes.level || !this.attributes.creator) { return <ErrorPage />; }

        return <div className="payment-page">
            <div className="payment-page__topper">
                <CreatorCard
                    noHoverShadow
                    id={this.attributes.creator.id}
                    name={this.attributes.creator.name}
                    description={this.attributes.creator.description}
                    avatar={this.attributes.creator.avatar}
                />

                <div className="payment-page__topper__about">
                    <p className="payment-page__title">
                        {
                            this.attributes.pay
                                ? <>
                                    Оформление подписки на уровень <b>{this.attributes.level.name}</b>
                                </>
                                : <>
                                    Отмена подписки на уровень <b>{this.attributes.level.name}</b>
                                </>
                        }
                    </p>

                    <p>
                        {
                            this.attributes.pay
                                ? 'Вы получите следующие преимущества:'
                                : 'Вы потеряете следующие преимущества:'
                        }

                    </p>

                    {this.attributes.level.benefits.map((benefit, i) => (
                        <p key={i} className="level-card__body__benefit">{benefit}</p>
                    ))}

                    <Button
                        color="primary"
                        text={
                            this.attributes.pay
                                ? <>Оформить подписку за <b>{this.attributes.level.price}</b> в месяц</>
                                : 'Отмена подписки'
                        }
                        onClick={() => {
                            this.attributes.pay
                                ? this.pay()
                                : this.unsubscribe();
                        }}
                    />
                    {this.attributes.pay
                        ? <div className="payment-page__disclaimer">
                            В любой момент Вы можете отказаться от подписки
                        </div>
                        : ''
                    }

                </div>

            </div>
            {
                this.attributes.otherLevels && this.attributes.otherLevels.length
                    ? <>
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
                    </>
                    : ''
            }

        </div>;
    }

    async created () {
        this.attributes.loading = true;
        try {
            const data = this.data.split('/');

            [this.creatorId, this.levelId] = data.slice(0, 2).map(x => parseInt(x));

            this.attributes.pay = !(data[2] && data[2] === 'unsubscribe');

            this.attributes.creator = await api.creatorInfo(this.creatorId);

            const levels = await api.levelsInfo(this.creatorId);

            this.attributes.level = levels.find(level => level.id === this.levelId);
            this.attributes.otherLevels = levels.filter(level => level.id !== this.levelId);
        } catch {
            this.attributes.creator = null;
            this.attributes.level = null;
            this.attributes.otherLevels = null;
        }
        this.attributes.loading = false;
    }
}

export default PaymentPage;
