/** @module Хранилище профиля пользователя */
import api from '../api/index';
import app from 'irbis';

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
        try {
            const user = await api.profile();
            if (user.status === 'error') {
                this.user = null;
            }
            this.user = user;
        } catch {
            this.user = null;
        }

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
