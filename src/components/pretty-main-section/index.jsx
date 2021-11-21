import app from '../../core/app';
import Component from '../basecomponent';
import Button from '../button';

import './style.scss';

class PrettySection extends Component {
    constructor ({
        slogan = 'Твой талант стоит денег',
        text = 'Ежемесячная поддержка вашего творчества от самых преданных фанатов'
    }) {
        super();
        this.attributes.slogan = slogan;
        this.attributes.text = text;
    }

    async submit () {
        app.$router.go(app.$router.createUrl('signup'));
    }

    render () {
        return (<div className={
            ['main-page-section']
        }
        >
            <div className="main-page-section__container">
                <div className="main-page-section__info">
                    <h1 className="main-page-section__slogan">
                        {this.attributes.slogan}
                    </h1>

                    <div className="main-page-section__text">
                        {this.attributes.text}
                    </div>

                    <div className="main-page-section__button">
                        <Button
                            color="primary"
                            onclick={() => {
                                this.submit();
                            }}
                            rounded
                            text="Начать"
                        />
                    </div>
                </div>

                <img
                    alt="Картинка главной страницы"
                    className="main-page-section__image"
                    src="/imgs/main-page.svg"
                />
            </div>
        </div>);
    }
}
export default PrettySection;
