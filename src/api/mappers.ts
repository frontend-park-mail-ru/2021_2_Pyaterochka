import config from './config';
import {
    AttachmentEntity, CommentEntity,
    CreatorEntity,
    FullPostEntity,
    IdType,
    InData,
    LevelEntity,
    LevelWithParentEntity,
    PaymentEntity,
    PostEntity,
    ProfileEntity
} from './types';

const basename = config.imageBasename;

const mapCreator = (data: InData): CreatorEntity => {
    return {
        id: data.id,
        name: data.nickname,
        avatar: data.avatar ? `${basename}/${data.avatar}` : config.fallback.avatar,
        cover: data.cover ? `${basename}/${data.cover}` : config.fallback.cover,
        description: data.description,
        levelId: data.awards_id
    };
};

const mapPost = (data: InData, creatorId: IdType): PostEntity => {
    return {
        id: data.posts_id,
        creatorId: creatorId || data.creator_id,
        levelId: data.type_awards || 0,
        title: data.title,
        published: new Date(data.date),
        views: data.views,
        likes: Number(data.likes),
        description: data.description,
        image: data.cover ? `${basename}/${data.cover}` : config.fallback.cover
    };
};

const mapPostFull = (data: InData & {
    attaches: InData[]
} & {
    post: InData
}, creatorId?: IdType): FullPostEntity => {
    const post: FullPostEntity = mapPost(data.post, creatorId);

    post.liked = !!data.post.add_like;
    post.body = data.attaches.map(attach => {
        const mappedAttach: AttachmentEntity = {
            id: attach.attach_id,
            type: attach.type === 'music' ? 'audio' : attach.type,
            value: attach.type === 'text' ? `${attach.value}` : `${config.imageBasename}/${attach.value}`
        };
        return mappedAttach;
    });

    return post;
};

const mapProfile = (data: InData): ProfileEntity => {
    return {
        email: data.login,
        username: data.nickname,
        id: data.id,
        avatar: data.avatar ? `${basename}/${data.avatar}` : config.fallback.avatar,
        haveCreator: !!data.have_creator
    };
};

const mapLevel = (data: InData): LevelEntity => {
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

const mapLevels = (data: InData[]): LevelWithParentEntity[] => {
    const levels = data
        .sort((a, b) => (Number(a.price) - Number(b.price)))
        .map(mapLevel);

    return levels.map(level => {
        if (!level.parentId) {
            return level;
        }

        const levelParent = levels.find(l => l.id === level.parentId);

        if (!levelParent) {
            return level;
        }

        const levelCopy: LevelWithParentEntity = Object.assign(level);

        levelCopy.parent = Object.assign(levelParent);
        levelCopy.parentName = levelCopy.parent.name;

        return levelCopy;
    });
};

const mapPayment = (data: InData, i: IdType): PaymentEntity => {
    return {
        id: i,
        amount: data.amount,
        creatorId: data.creator_id,
        creator: {
            id: data.creator_id,
            nickname: data.creator_nickname,
            category: data.creator_category,
            description: data.creator_description
        },
        date: new Date(data.date),
        userId: data.user_id
    };
};

const mapComment = (data: InData): CommentEntity => {
    return {
        id: data.id,
        user: {
            username: data.author_nickname,
            avatar: data.author_avatar ? `${basename}/${data.author_avatar}` : config.fallback.avatar,
            id: data.author_id,
            isCreator: !!data.as_creator
        },
        body: data.body,
        published: new Date(data.date)
    };
};
export {
    mapCreator,
    mapPost,
    mapPostFull,
    mapProfile,
    mapLevel,
    mapLevels,
    mapPayment,
    mapComment
};
