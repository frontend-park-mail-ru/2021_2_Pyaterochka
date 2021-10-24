import Component from '../../components/basecomponent';
import EditorComponent from '../../components/editor';

class CreatePostView extends Component {
    render () {
        return <div>
            <h1 className="text-center">Создать новую запись</h1>
            <EditorComponent isDraft={true}/>
        </div>;
    }
}

export default CreatePostView;
