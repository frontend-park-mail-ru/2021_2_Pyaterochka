/** @module API */

import { sendJSON, uploadFile } from './helpers';
import { mapComment, mapCreator, mapLevels, mapPayment, mapPost, mapPostFull, mapProfile } from './mappers';
import { AttachmentEntity, CommentEntity, CreatorEntity, IdType } from './types';

export default {
    /**
     * Авторизация
     */
    async login ({
        email,
        password
    }: {
        email: string,
        password: string
    }) {
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
    async changePassword (
        {
            oldPassword,
            newPassword
        }:
            {
                oldPassword: string,
                newPassword: string
            }
    ) {
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
    async changeNickname (
        {
            oldNickname,
            newNickname
        }: {
            oldNickname: string,
            newNickname: string
        }
    ) {
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
    async register (
        {
            username,
            email,
            password
        }: {
            username: string,
            email: string,
            password: string
        }
    ) {
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
    async creatorCreate (
        {
            description,
            category
        }: {
            description: string,
            category: string
        }
    ) {
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
    }: {
            name: string,
            benefits: string[],
            price: number,
            creatorId: IdType
        }
    ) {
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
    }: {
        levelId: IdType,
        name: string,
        benefits: string[],
        price: number,
        creatorId: IdType
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
            status: req.status,
            data: {
                error: null
            }
        };
    },

    /**
     * Удаление уровня
     */
    async levelDelete ({
        levelId,
        creatorId
    }: {
        levelId: IdType,
        creatorId: IdType
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
    }: {
        creatorId: IdType,
        postId: IdType,
        like?: boolean
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
    async uploadAvatar (avatar: File) {
        return uploadFile(avatar, 'avatar', '/user/update/avatar');
    },

    /**
     * Загрузка аватара креатора
     */
    async uploadCreatorAvatar (avatar: File, creatorId: IdType) {
        return uploadFile(avatar, 'avatar', `/creators/${creatorId}/update/avatar`);
    },

    /**
     * Загрузка обложки креатора
     */
    async uploadCreatorCover (cover: File, creatorId: IdType) {
        return uploadFile(cover, 'cover', `/creators/${creatorId}/update/cover`);
    },

    /**
     * Загрузка обложки уровня подписки
     */
    async uploadLevelCover (cover: File, creatorId: IdType, levelId: IdType) {
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
    }: {
        query?: string,
        category?: string,
        page?: number,
        offset?: number,
        limit?: number,
    }) {
        const params = new URLSearchParams({
            page: String(page),
            offset: String(offset),
            limit: String(limit)
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
    async subscriptions (): Promise<CreatorEntity[]> {
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
    async uploadPostCover (cover: File, creatorId: IdType, postId: IdType) {
        return uploadFile(cover, 'cover', `/creators/${creatorId}/posts/${postId}/update/cover`);
    },

    /**
     * Загрузка изображения в запись
     */
    async uploadPostImage (image: File, creatorId: IdType, postId: IdType) {
        return uploadFile(
            image,
            'image',
            `/creators/${creatorId}/posts/${postId}/attaches/image`,
            'post');
    },
    /**
     * Загрузка изображения в запись
     */
    async uploadPostAttach (file: File, type: string, creatorId: IdType, postId: IdType) {
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
    }: {
        userId: IdType,
        levelId: IdType,
        title: string,
        description: string
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
    }: {
        postId: IdType,
        userId: IdType,
        title: string,
        levelId: IdType,
        description: string,
        attaches: AttachmentEntity[]
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
                attaches: attaches.map(({
                    type,
                    value,
                    id
                }) => {
                    if (type === 'text') {
                        return {
                            type,
                            value,
                            id,
                            status: !id ? 'add' : 'update'
                        };
                    }

                    return {
                        type: type === 'audio' ? 'music' : type,
                        id
                    };
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
    }: {
        creatorId: IdType,
        postId: IdType
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
    async creatorInfo (id: IdType) {
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
    async levelsInfo (id: IdType) {
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
    async postsInfo (id: IdType) {
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
    async postsFeedInfo (id?: IdType) {
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
    async postInfo (userId: IdType, postId: IdType, addView = false) {
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
     * Получить коментарии записи
     * @param {*} userId
     * @param {*} postId
     */
    async postComments (userId: IdType, postId: IdType): Promise<CommentEntity[]> {
        const req = await sendJSON({
            url: `/creators/${userId}/posts/${postId}/comments?page=0&offset=0&limit=100000`,
            method: 'get'
        });

        if (req.status !== 200) {
            return null;
        }

        const data = await req.json();

        return data.comments.map(mapComment);
    },

    /**
     * Оставить коментарий
     * @param {*} userId
     * @param {*} postId
     * @param body
     */
    async postCommentLeave (userId: IdType, postId: IdType, body: string): Promise<Response> {
        return await sendJSON({
            url: `/creators/${userId}/posts/${postId}/comments`,
            method: 'post',
            csrf: true,
            body: {
                as_creator: false,
                body
            }
        });
    },

    /**
     * Оформить подписку
     * @param {*} creatorId
     * @param {*} levelId
     */
    async levelSubscribe (creatorId: IdType, levelId: IdType) {
        return await sendJSON({
            url: `/creators/${creatorId}/awards/${levelId}/subscribe`,
            method: 'post',
            csrf: true
        });
    },

    /**
     * Отменить подписку
     * @param {*} creatorId
     * @param {*} levelId
     */
    async levelUnsubscribe (creatorId: IdType, levelId: IdType) {
        return await sendJSON({
            url: `/creators/${creatorId}/awards/${levelId}/subscribe`,
            method: 'delete',
            csrf: true
        });
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
