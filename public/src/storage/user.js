/** @module Хранилище профиля пользователя */
import api from '../api/index';
import { router } from '../index';

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
        router.start();
    }
};

export default user;
