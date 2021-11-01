/** @module Хранилище профиля пользователя */
import api from '../api/index';
import app from '../core/app';

/**
 * Хранилище пользователя
 */
const user = {
    user: null,
    /**
     * Обновление хранилища
     */
    async update () {
        const user = await api.profile();

        console.log(user);

        if (user.status === 'error') return;
        this.user = user;
        if (this.onUpdate) this.onUpdate();
    },
    /**
     * Выйти из профиля
     */
    async logout () {
        await api.logout();
        this.user = null;
        if (this.onUpdate) this.onUpdate();
    },
    /**
     * Хук при обновлении профиля
     */
    onUpdate () {
        app.$router?.start();
    }
};

export default user;
