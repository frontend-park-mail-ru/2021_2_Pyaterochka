/** @module API */

const basename = 'http://api.pyaterochka-team.site:8080';
const basenameDev = '/api';
const mapCreator = (data) => {
    return {
        id: data.id,
        name: data.nickname,
        avatar: data.avatar || 'https://www.vtp-club.ru/img/user.png',
        cover: data.cover || 'https://tub.avatars.mds.yandex.net/i?id=6ba16db8f8a59eb8740ae862e5d080c9-5221613-images-thumbs&n=13&exp=1',
        description: data.description
    };
};

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
    async creatorInfo (id = 1) {
        const req = await fetch(basename + '/creators/' + id, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return mapCreator(data);
    },

    /**
     * Получить уровни поддержки создателя
     * @param {*} id
     */
    async levelsInfo (id) {
        const req = await fetch(basenameDev + '/levels', {
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
        const req = await fetch(basenameDev + '/posts', {
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
