/** @module API */

const basename = 'https://secure-proxy.api.pyaterochka-team.site/api/v1';
// const basename = 'http://api.pyaterochka-team.site:8080/api/v1';

const mapCreator = (data) => {
    return {
        id: data.id,
        name: data.nickname,
        avatar: data.avatar || 'https://www.vtp-club.ru/img/user.png',
        cover: data.cover || 'https://tub.avatars.mds.yandex.net/i?id=6ba16db8f8a59eb8740ae862e5d080c9-5221613-images-thumbs&n=13&exp=1',
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
        image: data.cover || 'https://tub.avatars.mds.yandex.net/i?id=6ba16db8f8a59eb8740ae862e5d080c9-5221613-images-thumbs&n=13&exp=1'
    };
};

async function getCsrfToken () {
    const req = await fetch(basename + '/token', {
        method: 'get',
        mode: 'cors',
        credentials: 'include'
    });

    const data = await req.json();

    return data.token;
}

export default {
    /**
     * Авторизация
     */
    async login ({ email, password }) {
        const req = await fetch(basename + '/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: email,
                password: password
            }),
            mode: 'cors',
            credentials: 'include'
        });

        const status = req.status;

        return {
            error: status !== 200
        };
    },

    /**
     * Регистрация
     */
    async register ({ username, email, password }) {
        const req = await fetch(basename + '/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: email,
                password: password,
                nickname: username
            }),
            mode: 'cors',
            credentials: 'include'
        });

        const status = req.status;
        const data = await req.json();

        return {
            error: status !== 200,
            data: data
        };
    },

    /**
     * Профиль
     */
    async profile () {
        const req = await fetch(basename + '/user', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return {
            email: data.login,
            username: data.nickname,
            id: data.id,
            avatar: data.avatar || 'https://www.vtp-club.ru/img/user.png'
        };
    },

    /**
     * Создания автора
     */
    async creatorCreate ({
        description,
        category
    }) {
        const req = await fetch(basename + '/creators', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': await getCsrfToken()
            },
            body: JSON.stringify({
                description,
                category
            }),
            mode: 'cors',
            credentials: 'include'
        });

        return req;
    },

    /**
     * Загрузка аватара
     */
    async uploadAvatar (avatar) {
        const form = new FormData();
        form.set('avatar', avatar);
        const req = await fetch(basename + '/user/update/avatar', {
            method: 'put',
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-csrf-token': await getCsrfToken()
            },
            body: form,
            mode: 'cors',
            credentials: 'include'
        });

        return req;
    },

    /**
     * Список авторов
     */
    async creators () {
        const req = await fetch(basename + '/creators', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data.map(mapCreator);
    },

    /**
     * Выход
     */
    async logout () {
        const req = await fetch(basename + '/logout', {
            method: 'post',
            mode: 'cors',
            credentials: 'include'
        });

        return req;
    },

    async createPost ({
        userId,
        title,
        description,
        body
    }) {
        const req = await fetch(`${basename}/creators/${userId}/posts`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': await getCsrfToken()
            },
            body: JSON.stringify({
                description,
                title
            }),
            mode: 'cors',
            credentials: 'include'
        });

        const dataPost = await req.json();

        for (let i = 0; i < body.length; ++i) {
            const text = body[i].text;
            await fetch(`${basename}/creators/${userId}/posts/${dataPost.id}/text`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-csrf-token': await getCsrfToken()
                },
                body: JSON.stringify({
                    text
                }),
                mode: 'cors',
                credentials: 'include'
            });
        }

        return dataPost;
    },

    /**
     * Информация о создателе
     * @param {*} id
     * @returns
     */
    async creatorInfo (id) {
        const req = await fetch(basename + '/creators/' + id, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        if (req.status !== 200) {
            return null;
        }

        const data = await req.json();

        return mapCreator(data);
    },

    /**
     * Получить уровни поддержки создателя
     * @param {*} id
     */
    async levelsInfo (id) {
        // const req = await fetch(basenameDev + '/levels', {
        //     method: 'get',
        //     mode: 'cors',
        //     credentials: 'include'
        // });

        // const data = await req.json();

        // return data;

        return [];
    },

    /**
     * Получить записи создателя
     * @param {*} id
     */
    async postsInfo (id) {
        const req = await fetch(`${basename}/creators/${id}/posts?page=0&offset=0&limit=1000000`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data.map(p => mapPost(p, id));
    },

    /**
     * Получить запись создателя
     * @param {*} userId
     * @param {*} postId
     */
    async postInfo (userId, postId) {
        const req = await fetch(`${basename}/creators/${userId}/posts/${postId}`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });
        if (req.status !== 200) {
            return null;
        }

        const data = await req.json();

        const post = mapPost(data.post, userId);
        post.body = data.attach.map(attach => {
            return {
                text: attach.data
            };
        });
        return post;
    }
};
