import Component from '../basecomponent';
import Button from '../button';
import { router } from '../../index';

import './style.css';

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
        router.go('/signup');
    }

    render () {
        return <div className={
            ['main-page-section']
        }>
            <div className="main-page-section-container">
                <div className="main-page-section-info">
                    <h1 className="main-page-section-container__slogan">{this.attributes.slogan}</h1>
                    <div className="main-page-section-container__text">{this.attributes.text}
                    </div>
                    <div className="main-page-section-container__button">
                        <Button text="Начать" rounded={true} color={'primary'} onclick={() => {
                            this.submit();
                        }}/>
                    </div>
                </div>
                <img src="/imgs/mainPage.png" alt="Картинка главной страницы"/>
            </div>
        </div>;
    }
}
export default PrettySection;
