import Component from '../../components/basecomponent';
import Button from '../../components/button';
import app from '../../core/app';

import './style.css';

class ErrorPage extends Component {
    constructor ({ err = 404, desc = 'Страница не найдена' } = {}) {
        super();
        this.attributes.error = err;
        this.attributes.message = desc;
    }

    render () {
        return (
            <div className="error-block">
                <h1>{this.attributes.message}</h1>

                <img src="/imgs/error_page.svg" />
                <Button
                    text="Перейти на главную"
                    color="primary"
                    rounded={true}
                    onclick={() => {
                        app.$router.go('/');
                    }}
                />
            </div>
        );
    }
}

export default ErrorPage;
