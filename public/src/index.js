import Router, { Route, DynamicComponentLoader } from './router/index.js'
import Layout from './components/layout.js'
import LoadingView from './views/loading-view.js'

let router
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root')

    router = new Router(root, [
        new Route('/signin', new DynamicComponentLoader('/src/views/signin.js'), 'Войти'),
        new Route('/signup', new DynamicComponentLoader('/src/views/signup.js'), 'Регистрация'),
        new Route('/', new DynamicComponentLoader('/src/views/index.js'), 'Главная'),
        new Route('/creator', new DynamicComponentLoader('/src/views/creator.js'), 'Страница автора'),
        new Route('/profile', new DynamicComponentLoader('/src/views/profile.js'), 'Профиль'),
        new Route('', new DynamicComponentLoader('/src/views/errorpage.js'), 'Страница не найдена')
    ])

    router.setLayout(new Layout())
    router.setLoadingView(new LoadingView())
    router.start()

    console.log(router)
})

export { router }
