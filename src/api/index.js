/** @module API */

import { sendJSON, uploadFile } from './helpers';
import { mapCreator, mapLevels, mapPayment, mapPost, mapPostFull, mapProfile } from './mappers';

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
                status,
                error: (await req.json()).error
            };
        }

        return {
            status,
            error: status !== 200 ? 'Произошла ошибка' : null
        };
    },

    /**
     * Смена пароля
     */
    async changeNickname ({ oldNickname, newNickname }) {
        const req = await sendJSON({
            url: '/user/update/nickname',
            method: 'put',
            body: {
                old: oldNickname,
                new: newNickname
            },
            csrf: true
        });

        const status = req.status;

        if (status >= 400 && status < 500) {
            return {
                error: (await req.json()).error
            };
        }

        return {
            status,
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
            error: status !== 201,
            data: await req.json()
        };
    },

    /**
     * Профиль
     */
    async profile () {
        const req = await sendJSON({
            url: '/user',
            method: 'get'
        });

        const data = await req.json();

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

        return {
            status: req.status,
            data: await req.json()
        };
    },

    /**
     * Обновление уровня
     */
    async levelUpdate ({
        levelId,
        name,
        benefits,
        price,
        creatorId
    }) {
        const req = await sendJSON({
            url: `/creators/${creatorId}/awards/${levelId}/update`,
            method: 'put',
            body: {
                description: benefits.join('\n'),
                name,
                price
            },
            csrf: true
        });

        return {
            status: req.status
        };
    },

    /**
     * Удаление уровня
     */
    async levelDelete ({
        levelId,
        creatorId
    }) {
        const req = await sendJSON({
            url: `/creators/${creatorId}/awards/${levelId}`,
            method: 'delete',
            csrf: true
        });

        return {
            status: req.status
        };
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
     * Загрузка обложки уровня подписки
     */
    async uploadLevelCover (cover, creatorId, levelId) {
        return uploadFile(cover, 'cover', `/creators/${creatorId}/awards/${levelId}/update/cover`);
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
     * Поиск Авторов
     */
    async creatorsSearch ({
        query = '',
        category = '',
        page = 0,
        offset = 0,
        limit = 9999
    }) {
        const params = new URLSearchParams({
            page,
            offset,
            limit
        });

        if (query) {
            params.append('search_string', query);
        }
        if (category) {
            params.append('category', category);
        }

        const req = await sendJSON({
            url: '/creators/search?' + params.toString(),
            method: 'get'
        });

        const data = await req.json();

        return data.creators.map(mapCreator);
    },

    /**
    * Получить служебную информацию
    */
    async info () {
        const req = await sendJSON({
            url: '/info',
            method: 'get'
        });

        const data = await req.json();

        return data;
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

        return (data.creators || []).map(mapCreator);
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

    /**
     * Загрузка обложки записи
    */
    async uploadPostCover (cover, creatorId, postId) {
        return uploadFile(cover, 'cover', `/creators/${creatorId}/posts/${postId}/update/cover`);
    },

    /**
     * Загрузка изображения в запись
    */
    async uploadPostImage (image, creatorId, postId) {
        return uploadFile(
            image,
            'image',
            `/creators/${creatorId}/posts/${postId}/attaches/image`,
            'post');
    }, /**
     * Загрузка изображения в запись
    */
    async uploadPostAttach (file, type, creatorId, postId) {
        return uploadFile(
            file,
            type,
            `/creators/${creatorId}/posts/${postId}/attaches/${type}`,
            'post');
    },

    async createPost ({
        userId,
        levelId,
        title,
        description
    }) {
        const req = await sendJSON({
            url: `/creators/${userId}/posts`,
            method: 'post',
            body: {
                description,
                title,
                awards_id: levelId || null
            },
            csrf: true
        });

        const dataPost = await req.json();

        return dataPost;
    },

    /**
     * Обновление поста
     */
    async updatePost ({
        postId,
        userId,
        title,
        levelId,
        description,
        attaches
    }) {
        await sendJSON({
            url: `/creators/${userId}/posts/${postId}/update`,
            method: 'put',
            body: {
                description,
                title,
                awards_id: levelId || null
            },
            csrf: true
        });

        await sendJSON({
            url: `/creators/${userId}/posts/${postId}/attaches`,
            method: 'put',
            body: {
                attaches: attaches.map(({ type, value, id }) => {
                    if (type === 'text') {
                        return {
                            type,
                            value,
                            id,
                            status: !id ? 'add' : 'update'
                        };
                    }

                    return { type: type === 'audio' ? 'music' : type, id };
                })
            },
            csrf: true
        });
    },
    /**
     * Удаление поста
     */
    async removePost ({
        creatorId,
        postId
    }) {
        const req = await sendJSON({
            url: `/creators/${creatorId}/posts/${postId}`,
            method: 'delete',
            csrf: true
        });

        return req;
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

        return mapLevels(data);
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
     * Получить записи ленты
     */
    async postsFeedInfo (id) {
        const req = await sendJSON({
            url: '/user/posts?page=0&offset=0&limit=100000',
            method: 'get'
        });

        if (req.status === 204) {
            return null;
        }

        const data = await req.json();

        return data.available_posts.map(p => mapPost(p, id));
    },

    /**
     * Получить запись создателя
     * @param {*} userId
     * @param {*} postId
     * @param {*} addView
     */
    async postInfo (userId, postId, addView = false) {
        const req = await sendJSON({
            url: `/creators/${userId}/posts/${postId}?add-view=${addView ? 'yes' : 'no'}`,
            method: 'get'
        });

        if (req.status !== 200) {
            return null;
        }

        const data = await req.json();

        return mapPostFull(data);
    },

    /**
     * Оформить подписку
     * @param {*} creatorId
     * @param {*} levelId
     */
    async levelSubscribe (creatorId, levelId) {
        const req = await sendJSON({
            url: `/creators/${creatorId}/awards/${levelId}/subscribe`,
            method: 'post',
            csrf: true
        });

        return req;
    },

    /**
     * Отменить подписку
     * @param {*} creatorId
     * @param {*} levelId
     */
    async levelUnsubscribe (creatorId, levelId) {
        const req = await sendJSON({
            url: `/creators/${creatorId}/awards/${levelId}/subscribe`,
            method: 'delete',
            csrf: true
        });

        return req;
    },
    /**
     * get all user payments
     */
    async payments () {
        const req = await sendJSON({
            url: '/user/payments',
            method: 'get'
        });

        if (req.status === 204) return [];

        return (await req.json()).payments.map(mapPayment);
    }
};
