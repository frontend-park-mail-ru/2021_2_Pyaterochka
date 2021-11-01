/** @module API */

import { sendJSON, uploadFile } from './hellpers';
import { mapCreator, mapLevel, mapPost, mapPostFull, mapProfile } from './mappers';

export default {
    /**
     * Авторизация
     */
    async login ({ email, password }) {
        const req = await sendJSON({
            url: '/login',
            method: 'post',
            body: {
                login: email,
                password: password
            }
        });

        const status = req.status;

        return {
            error: status !== 200
        };
    },

    /**
     * Смена пароля
     */
    async changePassword ({ oldPassword, newPassword }) {
        const req = await sendJSON({
            url: '/user/update/password',
            method: 'put',
            body: {
                old: oldPassword,
                new: newPassword
            },
            csrf: true
        });

        const status = req.status;

        if (status === 400) {
            return {
                error: (await req.json()).error
            };
        }

        return {
            error: status !== 200 ? 'Произошла ошибка' : null
        };
    },

    /**
     * Регистрация
     */
    async register ({ username, email, password }) {
        const req = await sendJSON({
            url: '/register',
            method: 'post',
            body: {
                login: email,
                password: password,
                nickname: username
            }
        });

        const status = req.status;

        return {
            error: status !== 200
        };
    },

    /**
     * Профиль
     */
    async profile () {
        console.log('asd');
        const req = await sendJSON({
            url: '/user',
            method: 'get'
        });

        const data = await req.json();
        console.log(data);

        return mapProfile(data);
    },

    /**
     * Создания автора
     */
    async creatorCreate ({
        description,
        category
    }) {
        const req = await sendJSON({
            url: '/creators',
            method: 'post',
            body: {
                description,
                category
            },
            csrf: true
        });

        return req;
    },

    /**
     * Создания уровня
     */
    async levelCreate ({
        name,
        benefits,
        price,
        creatorId
    }) {
        const req = await sendJSON({
            url: `/creators/${creatorId}/awards`,
            method: 'post',
            body: {
                description: benefits.join('\n'),
                name,
                price
            },
            csrf: true
        });

        return req;
    },

    /**
     * Лайк поста
     */
    async likePost ({
        creatorId,
        postId,
        like = true
    }) {
        const req = await sendJSON({
            url: `/creators/${creatorId}/posts/${postId}/like`,
            method: like ? 'put' : 'delete',
            csrf: true
        });

        return req;
    },

    /**
     * Загрузка аватара пользователя
     */
    async uploadAvatar (avatar) {
        return uploadFile(avatar, 'avatar', '/user/update/avatar');
    },

    /**
     * Загрузка аватара креатора
     */
    async uploadCreatorAvatar (avatar, creatorId) {
        return uploadFile(avatar, 'avatar', `/creators/${creatorId}/update/avatar`);
    },

    /**
     * Загрузка обложки креатора
     */
    async uploadCreatorCover (cover, creatorId) {
        return uploadFile(cover, 'cover', `/creators/${creatorId}/update/cover`);
    },

    /**
     * Список авторов
     */
    async creators () {
        const req = await sendJSON({
            url: '/creators',
            method: 'get'
        });

        const data = await req.json();

        return data.map(mapCreator);
    },

    /**
     * Список подписок
     */
    async subscriptions () {
        const req = await sendJSON({
            url: '/user/subscriptions',
            method: 'get'
        });

        const data = await req.json();

        return await Promise.all(data.creator_id.map(this.creatorInfo));
    },

    /**
     * Выход
     */
    async logout () {
        const req = await sendJSON({
            url: '/logout',
            method: 'post'
        });

        return req;
    },

    async createPost ({
        userId,
        title,
        description,
        body
    }) {
        const req = await sendJSON({
            url: `/creators/${userId}/posts`,
            method: 'post',
            body: {
                description,
                title
            },
            csrf: true
        });

        const dataPost = await req.json();

        for (let i = 0; i < body.length; ++i) {
            const text = body[i].text;

            await sendJSON({
                url: `/creators/${userId}/posts/${dataPost.id}/text`,
                method: 'post',
                body: {
                    text
                },
                csrf: true
            });
        }

        return dataPost;
    },

    /**
     * Обновление поста
     */
    async updatePost ({
        postId,
        oldBodyIds,
        userId,
        title,
        description,
        body
    }) {
        await Promise.all(oldBodyIds.map(async (id) => {
            await sendJSON({
                url: `/creators/${userId}/posts/${postId}/${id}`,
                method: 'delete',
                csrf: true
            });
        }));

        await sendJSON({
            url: `/creators/${userId}/posts/${postId}/update`,
            method: 'put',
            body: {
                description,
                title
            },
            csrf: true
        });

        for (let i = 0; i < body.length; ++i) {
            const text = body[i].text;

            await sendJSON({
                url: `/creators/${userId}/posts/${postId}/text`,
                method: 'post',
                body: {
                    text
                },
                csrf: true
            });
        }
    },

    /**
     * Информация о создателе
     * @param {*} id
     * @returns
     */
    async creatorInfo (id) {
        const req = await sendJSON({
            url: '/creators/' + id,
            method: 'get'
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
        const req = await sendJSON({
            url: `/creators/${id}/awards`,
            method: 'get'
        });

        const data = await req.json();

        return data.map(mapLevel);
    },

    /**
     * Получить записи создателя
     * @param {*} id
     */
    async postsInfo (id) {
        const req = await sendJSON({
            url: `/creators/${id}/posts?offset=0&limit=100`,
            method: 'get'
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
        const req = await sendJSON({
            url: `/creators/${userId}/posts/${postId}`,
            method: 'get'
        });

        if (req.status !== 200) {
            return null;
        }

        const data = await req.json();

        return mapPostFull(data);
    }
};
