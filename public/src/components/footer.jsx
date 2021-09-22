import Component from './basecomponent.js';

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

const styles = `
body {
    position: relative;
    min-height: 100%;
    max-width: 100%; 
    overflow-x: hidden;
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: var(--color-primary-dark);
    height: 120px;
}

.footer-body {
    margin: auto;
    margin-left: 100px;
    padding-top: 40px;
    color: #fff;
}

.footer-body a { 
    color: #fff;
}

`;
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
