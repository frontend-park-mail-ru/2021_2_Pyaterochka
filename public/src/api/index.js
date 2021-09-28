/** @module API */

const basename = 'http://tp.volodyalarin.site:8080';

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
        const data = await req.json();

        return {
            error: status !== 200,
            data: data
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
        const req = await fetch(basename + '/profile', {
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
