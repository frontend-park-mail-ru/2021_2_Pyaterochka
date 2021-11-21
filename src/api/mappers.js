import config from './config';

const basename = config.imageBasename;

const mapCreator = (data) => {
    return {
        id: data.id,
        name: data.nickname,
        avatar: data.avatar ? `${basename}/${data.avatar}` : config.fallback.avatar,
        cover: data.cover ? `${basename}/${data.cover}` : config.fallback.cover,
        description: data.description,
        levelId: data.awards_id
    };
};

const mapPost = (data, creatorId) => {
    return {
        id: data.posts_id,
        creatorId: creatorId,
        levelId: data.type_awards || 0,
        title: data.title,
        published: new Date(data.date),
        views: data.views,
        likes: data.likes,
        description: data.description,
        image: data.cover ? `${basename}/${data.cover}` : config.fallback.cover
    };
};

const mapPostFull = (data, creatorId) => {
    const post = mapPost(data.post, creatorId);
    post.liked = !!data.post.add_like;
    post.body = data.attaches.map(attach => {
        if (attach.type === 'text') return attach;

        return {
            id: attach.attach_id,
            type: attach.type,
            value: `${config.imageBasename}/${attach.value}`
        };
    });

    return post;
};

const mapProfile = (data) => {
    return {
        email: data.login,
        username: data.nickname,
        id: data.id,
        avatar: data.avatar ? `${basename}/${data.avatar}` : config.fallback.avatar,
        haveCreator: data.have_creator
    };
};

const mapLevel = (data) => {
    const description = data.description.split('\n');

    return {
        id: data.awards_id,
        name: data.name,
        cover: data.cover ? `${basename}/${data.cover}` : null,
        benefits: description,
        price: data.price + ' ₽',
        color: 'primary',
        parentId: data.child_award
    };
};

const mapLevels = (data) => {
    const levels = data
        .sort((a, b) => (a.price - b.price))
        .map(mapLevel);

    const result = levels.map(level => {
        if (!level.parentId) {
            return level;
        }

        const levelParent = levels.find(l => l.id === level.parentId);

        if (!levelParent) {
            return level;
        }

        const levelCopy = Object.assign(level);

        levelCopy.parent = Object.assign(levelParent);
        levelCopy.parentName = level.parent.name;

        return levelCopy;
    });

    return result;
};

const mapPayment = (data, i) => {
    return {
        id: i,
        amount: data.amount,
        creatorId: data.creator_id,
        date: new Date(data.date),
        userId: data.user_id
    };
};

export {
    mapCreator,
    mapPost,
    mapPostFull,
    mapProfile,
    mapLevel,
    mapLevels,
    mapPayment
};
