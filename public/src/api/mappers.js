import config from './config';

const basename = config.imageBasename;

const mapCreator = (data) => {
    return {
        id: data.id,
        name: data.nickname,
        avatar: data.avatar ? `${basename}/${data.avatar}` : 'https://www.vtp-club.ru/img/user.png',
        cover: data.cover ? `${basename}/${data.cover}` : 'https://tub.avatars.mds.yandex.net/i?id=6ba16db8f8a59eb8740ae862e5d080c9-5221613-images-thumbs&n=13&exp=1',
        description: data.description
    };
};

const mapPost = (data, creatorId) => {
    return {
        id: data.posts_id,
        creatorId: creatorId,
        title: data.title,
        published: new Date(data.date),
        views: data.views,
        likes: data.likes,
        description: data.description,
        image: data.cover ? `${basename}/${data.cover}` : 'https://tub.avatars.mds.yandex.net/i?id=6ba16db8f8a59eb8740ae862e5d080c9-5221613-images-thumbs&n=13&exp=1'
    };
};

const mapPostFull = (data, creatorId) => {
    const post = mapPost(data.post, creatorId);
    post.liked = !!data.post.add_like;
    post.body = data.attach.map(attach => {
        return {
            id: attach.attach_id,
            text: attach.data
        };
    });

    return post;
};

const mapProfile = (data) => {
    return {
        email: data.login,
        username: data.nickname,
        id: data.id,
        avatar: data.avatar ? `${basename}/${data.avatar}` : 'https://www.vtp-club.ru/img/user.png'
    };
};

const mapLevel = (data) => {
    const description = data.description.split('\n');

    return {
        id: data.awards_id,
        name: data.name,
        cover: data.cover ? `${basename}/${data.cover}` : null,
        benefits: description,
        price: data.price + ' руб.',
        color: 'primary'
    };
};

export {
    mapCreator,
    mapPost,
    mapPostFull,
    mapProfile,
    mapLevel
};
