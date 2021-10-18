import Component from '../components/basecomponent';
import Step from '../components/step';
import PrettySection from '../components/pretty-main-section';

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
                    slogan = 'Твой талант стоит денег'
                    text = 'Ежемесячная поддержка вашего творчества от самых преданных фанатов'
                />
                <div className="main-page-container">
                    <div className="main-page-description">
                        <h2 className="main-page-header">Что такое Patreon?</h2>
                        <div className="main-page-description__text">{this.attributes.text}</div>
                    </div>
                </div>
                <div className="main-page-steps">
                    <div className="main-page-container">
                        <h2 className="main-page-header header-how-works">Как это работает?</h2>
                        <Step
                            number={1}
                            name="Настройте свою страницу и уровни подписки"
                            description={(
                                <>
                                    <a router-go="/signup" className="step-content__description_link">
                                        Зарегистрируйтесь
                                    </a>{' '}
                                    и настройте вашу страницу на Patreon. Продумайте уровни
                                    подписки, от самого дешевого до привилегированного. Каждый
                                    уровень предлагает особые условия и преимущества вашим
                                    фанатам. Подумайте, что вы реально сможете давать регулярно и
                                    чему будут рады ваши фанаты. Не усложняйте!
                                </>
                            )}
                        />
                        <Step
                            number={2}
                            name="Расскажите своим подписчикам, что вы теперь есть на Patreon"
                            description="Сделайте посты во всех ваших основных соц.сетях, чтобы оповестить всех ваших подписчиков. Patreon - это место, где рождаются особые отношения между вами и вашими самыми активными фанатами - теми, кто хочет чего-то большего, чем просто следить за вами в социальных сетях."
                        />
                        <Step
                            number={3}
                            name="Будьте активны и прислушивайтесь к вашим подписчикам"
                            description="Регулярно делитесь обновлениями на Patreon, предоставляйте преимущества. Цель - чтобы подписчики были с вами долго и их число стабильно росло. Также поддерживайте импульс, периодически напоминая в социальных сетях о вашем Boosty, чтобы привлечь больше поклонников к подписке."
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPageView;

const styles = `
.main-page-container {
    max-width: 1240px;
    margin: 0 auto;
}

.main-page-header {
    text-align: center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 59px;
}

.main-page-description {
    margin: 0 auto;
    max-width: 980px;
}

.main-page-description__text {
    padding-bottom: 10px;
    text-align: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 42px;
}

.main-page-steps {
    background: #FFFFFF;
    box-shadow: inset 0px 0px 150px rgba(0, 0, 0, 0.07);
    padding-bottom: 30px;
}

.header-how-works {
    padding-top: 50px;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
