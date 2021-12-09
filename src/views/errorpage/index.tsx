import Component from 'irbis/component';
import Button from 'ui-library/button';
import app from 'irbis';

import './style.scss';

type PropsType = {
    err?: number,
    desc?: string,
    goHome?: boolean
};

class ErrorPage extends Component<PropsType> {
    defaultProps (): PropsType {
        return {
            err: 404,
            desc: 'Страница не найдена',
            goHome: true
        };
    }

    render () {
        return (
            <div className="error-block">
                <h1>
                    {this.props.desc}
                </h1>

                <img src="/imgs/error_page.svg" />

                {
                    this.props.goHome
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
