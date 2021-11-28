import Component from 'irbis/component';
import Step from 'ui-library/step';
import PrettySection from 'ui-library/pretty-main-section';
import app from 'irbis';

import './style.scss';
import consts from '../../consts';

class MainPageView extends Component {
    constructor (
        text = 'Оформив ежемесячную подписку, поклонники смогут участвовать в вашем творческом процессе. Вы предоставляете им эксклюзивные материалы, приглашаете в сообщество единомышленников и позволяете взглянуть за кулисы. А взамен получаете свободу и стабильность, которые так нужны для раскрытия потенциала и построения творческой карьеры.') {
        super();
        this.attributes.text = text;
    }

    render () {
        return (
            <div>
                <PrettySection
                    slogan='Твой талант стоит денег'
                    text='Ежемесячная поддержка вашего творчества от самых преданных фанатов'
                />

                <div className="main-page-container">
                    <div className="main-page-description">
                        <h2 className="main-page-header">
                            Что такое Patreon?
                        </h2>

                        <div className="main-page-description__text">
                            {this.attributes.text}
                        </div>
                    </div>
                </div>

                <div className="main-page-steps">
                    <div className="main-page-container">
                        <h2 className="main-page-header header-how-works">
                            Как это работает?
                        </h2>

                        <Step
                            description={(
                                <>
                                    <a
                                        className="step-content__description-link"
                                        router-go={app.$router.createUrl('signup')}
                                    >
                                        {consts.landing.steps.signup}
                                    </a>

                                    {consts.landing.steps.configPage}
                                </>
                            )}
                            image='/imgs/steps/step1.svg'
                            name="Настройте свою страницу и уровни подписки"
                            number={1}
                        />

                        <Step
                            description="Сделайте посты во всех ваших основных соц.сетях, чтобы оповестить всех ваших подписчиков. Patreon - это место, где рождаются особые отношения между вами и вашими самыми активными фанатами - теми, кто хочет чего-то большего, чем просто следить за вами в социальных сетях."
                            image='/imgs/steps/step2.webp'
                            name="Расскажите своим подписчикам, что вы теперь есть на Patreon"
                            number={2}
                        />

                        <Step
                            description="Регулярно делитесь обновлениями на Patreon, предоставляйте преимущества. Цель - чтобы подписчики были с вами долго и их число стабильно росло. Также поддерживайте импульс, периодически напоминая в социальных сетях о вашем Boosty, чтобы привлечь больше поклонников к подписке."
                            image='/imgs/steps/step3.svg'
                            name="Будьте активны и прислушивайтесь к вашим подписчикам"
                            number={3}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPageView;
