import app from 'irbis';
import Component from 'irbis/component';
import './style.scss';

/**
 * Компонент подвала
 */
class Footer extends Component<Record<string, never>> {
    render () {
        return (<div className="footer">
            <div className="footer__body">
                © Patreon by Pyaterochka team  from Technopark VK, 2021
                <br />

                Использованы материалы freepik -
                {' '}

                <a href="https://ru.freepik.com/">
                    ru.freepik.com
                </a>

                <br />

                {
                    app.$router
                        ? <a
                            href="#"
                            router-go={app.$router.createUrl('component-gallery')}
                        >
                            Галерея компонентов
                        </a>
                        : ''
                }

            </div>
        </div>);
    }
}
export default Footer;
