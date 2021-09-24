/** @module API */

const basename = '/api';

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
                email: email,
                password: password
            }),
            credentials: 'include'
        });

        const data = await req.json();

        return data;
    },

    /**
     * Профиль
     */
    async profile () {
        const req = await fetch(basename + '/profile', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data;
    },

    /**
     * Выход
     */
    async logout () {
        const req = await fetch(basename + '/logout', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data;
    },

    /**
     * Информация о создателе
     * @param {*} id
     * @returns
     */
    async creatorInfo (id) {
        const req = await fetch(basename + '/creator', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data;
    },

    /**
     * Получить уровни поддержки создателя
     * @param {*} id
     */
    async levelsInfo (id) {
        const req = await fetch(basename + '/levels', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data;
    },

    /**
     * Получить записи создателя
     * @param {*} id
     */
    async postsInfo (id) {
        const req = await fetch(basename + '/posts', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data.map((v) => {
            v.published = new Date(v.published);
            return v;
        });
    }
};
