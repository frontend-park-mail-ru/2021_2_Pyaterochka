import api from '../api/index.js';
import Component from '../components/basecomponent.js';
import Button from '../components/button.js';
import CreatorCard from '../components/creator-card.js';
import LevelCard from '../components/level-card.js';
import LockMessage from '../components/lock-message.js';
import PostCard from '../components/post-card.js';
import Skeleton from '../components/skeleton.js';

class CreatorView extends Component {
    constructor () {
        super();
        this.attributes.creator = null;
        this.attributes.levels = [];
        this.attributes.posts = [];
    }

    render () {
        const element = document.createElement('div');

        if (!this.attributes.creator) {
            element.innerHTML = `
            <div class="creator-cover">
            </div>
            <div class="creator-card"></div>
            <div class="level-card-container"></div>
            `;
            const coverSkeleton = new Skeleton({ height: 256 });
            const avatarSkeleton = new Skeleton({ type: 'circle', height: 200 });
            const textSkeleton = new Skeleton({ type: 'text', height: 40 });
            const levelSkeleton = new Skeleton({ height: 260, width: 260 });

            element.querySelector('.creator-cover').appendChild(coverSkeleton.render());
            element.querySelector('.creator-card').appendChild(avatarSkeleton.render());
            element.querySelector('.creator-card').appendChild(textSkeleton.render());
            element.querySelector('.creator-card').lastChild.style.margin = '10px';

            for (let i = 0; i < 3; ++i) {
                element.querySelector('.level-card-container').appendChild(levelSkeleton.render());
            }
            element.style.overflow = 'hidden';
            element.style.maxHeight = 'calc(100vh - 52px)';
            return element;
        }

        element.innerHTML = `
            <div class="creator-cover" style="background-image:url(${this.attributes.creator.cover})">
            </div>

            <div class="creator-card"></div>

            <div class="level-card-container"></div>

            <div class="post-container"></div>
        `;

        const creatorCardAttr = Object.assign(this.attributes.creator);
        creatorCardAttr.shadow = true;
        const creatorCard = new CreatorCard(creatorCardAttr);
        element.querySelector('.creator-card').replaceWith(creatorCard.renderReactive());

        const levelCardContainer = element.querySelector('.level-card-container');
        this.attributes.levels.map(card => new LevelCard(card)).forEach(card => {
            levelCardContainer.appendChild(card.renderReactive());
        });

        const postCardContainer = element.querySelector('.post-container');
        this.attributes.posts.map(card => new PostCard(card)).forEach(card => {
            postCardContainer.appendChild(card.renderReactive());
        });

        const lockMessage = new LockMessage(
            {
                text: 'Стань патроном, чтобы продолжить наслаждаться работами автора'
            },
            new Button({ text: 'Стать патроном', color: 'primary' })
        );

        element.appendChild(lockMessage.renderReactive());
        return element;
    }

    async created () {
        this.attributes.creator = null;

        this.attributes.creator = await api.creatorInfo();
        this.attributes.levels = await api.levelsInfo();
        this.attributes.posts = await api.postsInfo();
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
