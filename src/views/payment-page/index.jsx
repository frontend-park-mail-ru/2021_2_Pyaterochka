import api from '../../api';
import Component from 'irbis/component';
import Button from 'ui-library/button';
import CreatorCard from 'ui-library/creator-card';
import LevelCard from 'ui-library/level-card';
import consts from '../../consts';
import app from 'irbis';
import ErrorPage from '../errorpage';
import LoadingView from '../loading-view';

import './style.scss';
import user from '../../storage/user';

class PaymentPage extends Component {
    defaultProps () {
        return {
            route: null
        };
    }

    constructor () {
        super();

        this.attributes.pay = true;
        this.attributes.loading = true;
        this.attributes.loadingMessage = false;
    }

    async pay () {
        this.attributes.loadingMessage = 'Оплата';

        if (this.state.creator.levelId) {
            this.attributes.loadingMessage = 'Изменение подписки';
            await api.levelUnsubscribe(this.creatorId, this.state.creator.levelId);
        }

        api.pay(this.attributes.level, this.attributes.creator, user.user);
    }

    async unsubscribe () {
        this.attributes.loadingMessage = 'Отмена подписки';

        await api.levelUnsubscribe(this.creatorId, this.levelId);

        app.$router.go(app.$router.createUrl('creator', this.creatorId));
    }

    render () {
        if (this.attributes.loading) {
            return (<LoadingView>
                {
                    this.attributes.pay
                        ? 'Загрузка страницы оплаты'
                        : 'Загрузка страницы отмены подписки'
                }

            </LoadingView>);
        }

        if (this.attributes.loadingMessage) {
            return (<LoadingView>
                {this.attributes.loadingMessage}
            </LoadingView>);
        }

        if (!this.attributes.level || !this.attributes.creator) { return <ErrorPage />; }

        return (<div className="payment-page">
            <div className="payment-page__topper">
                <CreatorCard
                    avatar={this.attributes.creator.avatar}
                    description={this.attributes.creator.description}
                    id={this.attributes.creator.id}
                    name={this.attributes.creator.name}
                    noHoverShadow
                />

                <div className="payment-page__topper__about">
                    <p className="payment-page__title">
                        {
                            this.attributes.pay
                                ? <>
                                    {consts.subscribeOnLevel}

                                    {' '}

                                    <b>
                                        {this.attributes.level.name}
                                    </b>
                                </>
                                : <>
                                    {consts.unsubscribeOnLevel}

                                    {' '}

                                    <b>
                                        {this.attributes.level.name}
                                    </b>
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

                    {this.attributes.benefits.map((benefit, i) => (
                        <p
                            className="level-card__body__benefit"
                            key={i}
                        >
                            {benefit}
                        </p>
                    ))}

                    <Button
                        color="primary"
                        onClick={() => {
                            this.attributes.pay
                                ? this.pay()
                                : this.unsubscribe();
                        }}
                        text={
                            this.attributes.pay
                                ? <>
                                    {consts.subscribeFor}

                                    {' '}

                                    <b>
                                        {this.attributes.level.price}
                                    </b>

                                    {' '}

                                    {consts.inMonth}

                                </>
                                : 'Отмена подписки'
                        }
                    />

                    {this.attributes.pay
                        ? <div className="payment-page__disclaimer">
                            {consts.subscribeWarning}
                        </div>
                        : ''}

                </div>

            </div>

            {
                this.attributes.otherLevels && this.attributes.otherLevels.length
                    ? <>
                        <div className="payment-page__other-levels-title">
                            {consts.maybeInterestedSubscriptions}

                            <b>
                                {this.attributes.creator.name}
                            </b>

                        </div>

                        <div className="payment-page__other-levels-container">
                            {this.attributes.otherLevels.map((level) => (
                                <LevelCard
                                    benefits={level.benefits}
                                    cover={level.cover}
                                    id={level.id}
                                    key={level.id}
                                    name={level.name}
                                    onClick={
                                        () => {
                                            app.$router.go(
                                                app.$router.createUrl(
                                                    'payment', `${this.attributes.creator.id}/${level.id}`
                                                )
                                            );
                                        }
                                    }
                                    parentName={level.parentName}
                                    price={level.price}
                                />
                            ))}
                        </div>
                    </>
                    : ''
            }

        </div>);
    }

    async propsChanged () {
        this.attributes.loading = true;
        try {
            const data = this.props.route.data.split('/');

            [this.creatorId, this.levelId] = data.slice(0, 2).map(x => parseInt(x));

            this.state.creator = await api.creatorInfo(this.creatorId);

            if (this.attributes.creator.levelId === this.levelId) {
                this.attributes.pay = false;
            }
            const levels = await api.levelsInfo(this.creatorId);

            const level = levels.find(level => level.id === this.levelId);

            this.state.level = level;

            let benefits = [...level.benefits];

            let parentId = level.parentId;
            while (parentId) {
                const level = levels.find(level => level.id === parentId);
                parentId = level.parentId;
                benefits = [...level.benefits, ...benefits];
            }

            this.state.benefits = benefits;
            this.state.otherLevels = levels.filter(
                level =>
                    level.id !== this.levelId &&
                    level.id !== this.state.creator.levelId
            );
        } catch (e) {
            this.state.creator = null;
            this.state.level = null;
            this.state.otherLevels = null;
        }
        this.state.loading = false;
    }
}

export default PaymentPage;
