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
import Route from 'irbis-router/route';
import { CreatorEntity, LevelWithParentEntity } from '../../api/types';

class PaymentPage extends Component<{
    route?: Route
}, {
    pay: boolean,
    loading: boolean,
    loadingMessage?: false | string,
    creator?: CreatorEntity,
    level?: LevelWithParentEntity,
    benefits?: string[],
    otherLevels?: LevelWithParentEntity[]
}> {
    creatorId?: string | number;
    levelId?: string | number;

    defaultProps () {
        return {
            route: null
        };
    }

    constructor () {
        super();

        this.state.pay = true;
        this.state.loading = true;
        this.state.loadingMessage = false;
    }

    async pay () {
        this.state.loadingMessage = 'Оплата';

        if (this.state.creator.levelId) {
            this.state.loadingMessage = 'Изменение подписки';
            await api.levelUnsubscribe(this.creatorId, this.state.creator.levelId);
        }
        await api.levelSubscribe(this.creatorId, this.levelId);

        app.$router.go(app.$router.createUrl('creator', this.creatorId));
    }

    async unsubscribe () {
        this.state.loadingMessage = 'Отмена подписки';

        await api.levelUnsubscribe(this.creatorId, this.levelId);

        app.$router.go(app.$router.createUrl('creator', this.creatorId));
    }

    render () {
        if (this.state.loading) {
            return (<LoadingView>
                {
                    this.state.pay
                        ? 'Загрузка страницы оплаты'
                        : 'Загрузка страницы отмены подписки'
                }

            </LoadingView>);
        }

        if (this.state.loadingMessage) {
            return (<LoadingView>
                {this.state.loadingMessage}
            </LoadingView>);
        }

        if (!this.state.level || !this.state.creator) { return <ErrorPage />; }

        return (<div className="payment-page">
            <div className="payment-page__topper">
                <CreatorCard
                    avatar={this.state.creator.avatar}
                    description={this.state.creator.description}
                    id={this.state.creator.id}
                    name={this.state.creator.name}
                    noHoverShadow
                />

                <div className="payment-page__topper__about">
                    <p className="payment-page__title">
                        {
                            this.state.pay
                                ? <>
                                    {consts.subscribeOnLevel}

                                    {' '}

                                    <b>
                                        {this.state.level.name}
                                    </b>
                                </>
                                : <>
                                    {consts.unsubscribeOnLevel}

                                    {' '}

                                    <b>
                                        {this.state.level.name}
                                    </b>
                                </>
                        }
                    </p>

                    <p>
                        {
                            this.state.pay
                                ? 'Вы получите следующие преимущества:'
                                : 'Вы потеряете следующие преимущества:'
                        }

                    </p>

                    {this.state.benefits.map((benefit, i) => (
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
                            this.state.pay
                                ? this.pay()
                                : this.unsubscribe();
                        }}
                        text={
                            this.state.pay
                                ? <>
                                    {consts.subscribeFor}

                                    {' '}

                                    <b>
                                        {this.state.level.price}
                                    </b>

                                    {' '}

                                    {consts.inMonth}

                                </>
                                : 'Отмена подписки'
                        }
                    />

                    {this.state.pay
                        ? <div className="payment-page__disclaimer">
                            {consts.subscribeWarning}
                        </div>
                        : ''}

                </div>

            </div>

            {
                this.state.otherLevels && this.state.otherLevels.length
                    ? <>
                        <div className="payment-page__other-levels-title">
                            {consts.maybeInterestedSubscriptions}

                            <b>
                                {this.state.creator.name}
                            </b>

                        </div>

                        <div className="payment-page__other-levels-container">
                            {this.state.otherLevels.map((level) => (
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
                                                    'payment', `${this.state.creator.id}/${level.id}`
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
        this.state.loading = true;
        try {
            const data = this.props.route.data.split('/');

            [this.creatorId, this.levelId] = data.slice(0, 2).map(x => parseInt(x));

            this.state.creator = await api.creatorInfo(this.creatorId);

            if (this.state.creator.levelId === this.levelId) {
                this.state.pay = false;
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
