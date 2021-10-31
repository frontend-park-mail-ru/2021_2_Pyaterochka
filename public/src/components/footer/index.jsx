import app from '../../core/app';
import Component from '../basecomponent';
import './style.scss';

/**
 * Компонент подвала
 */
class Footer extends Component {
    render () {
        return <div className="footer">
            <div className="footer__body">
                © Patreon by Pyaterochka team  from Technopark VK, 2021
                <br />
                Использованы материалы freepik - <a href="https://ru.freepik.com/">ru.freepik.com</a>
                <br />
                <a href="#" router-go={app.$router.createUrl('component-gallery')}>
                    Галерея компонентов
                </a>
            </div>
        </div>;
    }
}
export default Footer;
