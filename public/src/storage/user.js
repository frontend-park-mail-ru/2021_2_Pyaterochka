/** @module Хранилище профиля пользователя */
import api from '../api/index';
import app from '../core/app';

const userField = 'user__patreon';

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
        localStorage.setItem(userField, JSON.stringify(this.user));
        app.$router?.start();
    }
};

if (localStorage.getItem(userField)) {
    try {
        user.user = JSON.parse(localStorage.getItem(userField));
    } catch {
        user.user = null;
    }
}

export default user;
