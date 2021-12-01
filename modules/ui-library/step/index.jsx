import Component from 'irbis/component';
import './style.scss';

/**
 * Компонент шага
 */
class Step extends Component {
    defaultProps () {
        return {
            number: 0,
            image: '',
            name: '',
            description: ''
        };
    }

    render () {
        const isLeftText = this.props.number % 2;
        return (
            <div className={['step', isLeftText ? 'step_left-text' : '']}>

                <div className="step-content">
                    <div className="step-content__number">
                        ШАГ
                        {' '}

                        {this.props.number}
                    </div>

                    <div className="step-content__name">
                        {this.props.name}
                    </div>

                    <div className="step-content__description">
                        <span>
                            {this.props.description}
                        </span>
                    </div>
                </div>

                <img
                    alt=""
                    src={this.props.image}
                />

            </div>
        );
    }
}
export default Step;
