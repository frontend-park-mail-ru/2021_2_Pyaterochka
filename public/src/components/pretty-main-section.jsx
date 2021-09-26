import Component from './basecomponent.js';
import Button from './button.jsx';
import { router } from '../index.js';

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
                    <Button text="Начать" rounded={true} color={'primary'} onclick={() => {
                        this.submit();
                    }}/>
                </div>
                <img src="../../imgs/mainPage.png" alt="Картинка глвной страницы"/>
            </div>
        </div>;
    }
}
export default PrettySection;

const styles = `
.main-page-section {
    width: 100%;
    background-color: #484745;
    padding: 100px 0;
}

.main-page-section-container {
    display: flex;
    justify-content: space-between;
    width: 1240px;
    margin: auto;
}

.main-page-section-container__slogan {
    font-family: Montserrat, sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: 60px;
    line-height: 73px;

    color: #FFFFFF;
}

.main-page-section-container__text {
    margin-bottom: 50px;

    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;
    
    color: #fff;
}

.main-page-section-container__button {
    width: 108px;
}
`;
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
