const basename = '/api';

export default {
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
    async profile () {
        const req = await fetch(basename + '/profile', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data;
    },
    async logout () {
        const req = await fetch(basename + '/logout', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data;
    },
    async creatorInfo (id) {
        const req = await fetch(basename + '/creator', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data;
    },

    async levelsInfo (id) {
        const req = await fetch(basename + '/levels', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data;
    },
    async postsInfo (id) {
        const req = await fetch(basename + '/posts', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await req.json();

        return data;
    }
};
