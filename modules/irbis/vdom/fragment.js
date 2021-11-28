/**
 * Компонент объединения нескольких компонентов в группу
 */
class Fragment {
    constructor (a, ...c) {
        this.c = c;
    }

    render () {
        return this.c;
    }
}

export default Fragment;
