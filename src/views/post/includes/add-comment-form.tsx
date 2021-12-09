import Component from '../../../../modules/irbis/component';
import consts from '../../../consts';
import InputField from '../../../../modules/ui-library/input-field';
import Button from '../../../../modules/ui-library/button';
import api from '../../../api';
import { PostEntity } from '../../../api/types';
import ValidationError from '../../../../modules/ui-library/validation-error';

class AddCommentForm extends Component<{
    post?: PostEntity,
    onSend: () => unknown,
}, {
    comment: string,
    loading: boolean,
    error: false | string
}> {
    constructor () {
        super();
        this.state.comment = '';
        this.state.loading = false;
        this.state.error = false;
    }

    defaultProps () {
        return {
            post: null,
            onSend: () => {
            }
        };
    }

    async sendComment () {
        if (!this.state.comment) {
            this.state.error = 'Введите текст комментария';
            return;
        }
        this.state.loading = true;
        const post = this.props.post;
        try {
            await api.postCommentLeave(post.creatorId, post.id, this.state.comment);
        } catch (e) {
            console.error(e);
            this.state.error = 'Произошла неизвестная ошибка';
        }
        this.state.loading = false;

        this.props.onSend();
    }

    render () {
        return (<div className="add-comment">
            <div className="add-comment__title">
                {consts.leaveComment}
            </div>

            <InputField
                placeholder="Текст комментария"
                onInput={(e) => {
                    this.state.comment = e.target.value;
                }}
            />

            {
                this.state.error
                    ? <ValidationError value={this.state.error} />
                    : ''
            }

            <div className="add-comment__actions">
                <Button
                    color="primary"
                    text="Отправить"
                    onClick={() => {
                        this.sendComment();
                    }}
                    loading={this.state.loading}
                />

                <span className="add-comment__actions_warn">
                    {consts.communityWarning}
                </span>
            </div>
        </div>);
    }
}

export default AddCommentForm;
