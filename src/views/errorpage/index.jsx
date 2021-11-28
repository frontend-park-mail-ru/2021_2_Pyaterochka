import Component from '../../components/basecomponent';
import Button from '../../components/button';
import app from '../../core/app';

import './style.scss';

class ErrorPage extends Component {
    constructor ({ err = 404, desc = 'Страница не найдена', goHome = true } = {}) {
        super();
        this.attributes.error = err;
        this.attributes.message = desc;
        this.attributes.goHome = goHome;
    }

    render () {
        return (
            <div className="error-block">
                <h1>
                    {this.attributes.message}
                </h1>

                <img src="/imgs/error_page.svg" />

                {
                    this.attributes.goHome
                        ? <Button
                            text="Перейти на главную"
                            color="primary"
                            rounded
                            onClick={() => {
                                app.$router.go('/');
                            }}
                        />
                        : ''
                }
            </div>
        );
    }
}

export default ErrorPage;
