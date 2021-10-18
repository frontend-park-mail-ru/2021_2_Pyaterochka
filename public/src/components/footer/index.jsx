import Component from '../basecomponent';
import './style.css';

/**
 * Компонент подвала
 */
class Footer extends Component {
    render () {
        return <div className="footer">
            <div className="footer-body">
                © Patreon by Pyaterochka team  from Technopark Mail.ru, 2021
                <br />
                Использованы материалы freepik - <a href="https://ru.freepik.com/">ru.freepik.com</a>
            </div>
        </div>;
    }
}
export default Footer;
