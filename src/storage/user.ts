/** @module Хранилище профиля пользователя */
import api from '../api/index';
import app from 'irbis';

const userField = 'user__patreon';
const themeField = 'theme__patreon';

/**
 * Хранилище пользователя
 */
const user = {
    user: null,
    theme: 'default',
    /**
     * Обновление хранилища
     */
    async update () {
        try {
            this.user = await api.profile();
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
        localStorage.setItem(themeField, this.theme);
        app.$router?.start();
    }
};

if (localStorage.getItem(userField)) {
    try {
        user.user = JSON.parse(localStorage.getItem(userField));
        user.theme = String(localStorage.getItem(themeField));
    } catch {
        user.user = null;
    }
}

export default user;
