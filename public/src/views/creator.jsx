import api from '../api/index.js';
import Component from '../components/basecomponent.js';
import Button from '../components/button.jsx';
import CreatorCard from '../components/creator-card.jsx';
import LevelCard from '../components/level-card.jsx';
import LockMessage from '../components/lock-message.jsx';
import PostCard from '../components/post-card.jsx';
import Skeleton from '../components/skeleton.js';

class CreatorView extends Component {
    constructor () {
        super();
        this.attributes.creator = null;
        this.attributes.levels = [];
        this.attributes.posts = [];
    }

    render () {
        return (
            <div>
                {!this.attributes.creator
                    ? (
                        <>
                            <div className="creator-cover">
                                <Skeleton height={256} />
                            </div>
                            <div className="creator-card">
                                <Skeleton type="circle" height={200} />
                                <Skeleton type="text" height={40} />
                            </div>
                            <div className="level-card-container">
                                {[1, 2, 3].map((v) => (
                                    <Skeleton key={v} width={260} height={260} />
                                ))}
                            </div>
                        </>
                    )
                    : (
                        <>
                            <div
                                className="creator-cover"
                                style={`background-image:url(${this.attributes.creator.cover}`}
                            ></div>

                            <CreatorCard
                                id={this.attributes.creator.id}
                                name={this.attributes.creator.name}
                                avatar={this.attributes.creator.avatar}
                                description={this.attributes.creator.description}
                                shadow={true}
                                clickable={false}
                            />

                            <div className="level-card-container">
                                {this.attributes.levels.map((card) =>
                                    new LevelCard(card).renderReactive()
                                )}
                            </div>

                            <div className="post-container">
                                {this.attributes.posts.map(
                                    (card) => (new PostCard(card)).renderReactive()
                                )}
                            </div>
                            <LockMessage text="Стань патроном, чтобы продолжить наслаждаться работами автора">
                                <Button text="Стать патроном" color="primary" />
                            </LockMessage>
                        </>
                    )}
            </div>
        );
    }

    async created () {
        this.attributes.creator = null;

        this.attributes.creator = await api.creatorInfo(this.data);
        this.attributes.levels = await api.levelsInfo(this.data);
        this.attributes.posts = await api.postsInfo(this.data);
    }
}

export default CreatorView;

const styles = `
.creator-cover + .creator-card {
    margin-top:-120px;
}
.creator-card {
    width: 400px;
    max-width: 100%;
    margin:auto;
}
.creator-cover {
    height:256px;
    background-color: var(--color-grey);
    background-size:cover;
    background-position:center;
}
.level-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.level-card-container > * {
    margin:20px;
}

.post-container {
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-bottom: 20px;
}
.post-container > *{
    margin:10px;
}

.lock-message {
    max-width: 500px;
    margin:auto;
}
`;
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
