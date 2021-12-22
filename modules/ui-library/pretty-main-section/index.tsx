import app from 'irbis';
import Button from '../button';
import Component from 'irbis/component';

import './style.scss';

class PrettySection extends Component<{
    slogan: string,
    text: string
}> {
    defaultProps () {
        return {
            slogan: 'Твой талант стоит денег',
            text: 'Ежемесячная поддержка вашего творчества от самых преданных фанатов'
        };
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
                        {this.props.slogan}
                    </h1>

                    <div className="main-page-section__text">
                        {this.props.text}
                    </div>

                    <div className="main-page-section__button">
                        <Button
                            color="primary"
                            onClick={() => {
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
