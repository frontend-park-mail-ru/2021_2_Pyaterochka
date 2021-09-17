import api from '../api/index.js'

const user = {
    user: null,
    async update () {
        this.user = await api.profile()
    }
}

user.update()

export default user
