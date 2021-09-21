import api from '../api/index.js';
import { router } from '../index.js';

const user = {
    user: null,
    async update () {
        const user = await api.profile();
        if (user.status === 'error') return;
        this.user = user;
        if (this.onUpdate) this.onUpdate();
    },
    async logout () {
        await api.logout();
        this.user = null;
        if (this.onUpdate) this.onUpdate();
    },
    onUpdate () {
        router.start();
    }
};

user.update();

export default user;
