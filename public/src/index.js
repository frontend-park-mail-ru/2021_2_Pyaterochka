import Router, { Route } from './router/index.js'
import IndexView from './views/index.js'
import ErrorPage from './views/errorpage.js'
import Layout from './components/layout.js'
import SigninView from './views/signin.js'
import SignupView from './views/signup.js'
import CreatorView from './views/creator.js'
import ProfileView from './views/profile.js'

let router
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root')

    router = new Router(root, [
        new Route('/signin', new SigninView(), 'Войти'),
        new Route('/signup', new SignupView(), 'Регистрация'),
        new Route('/', new IndexView(), 'Главная'),
        new Route('/creator', new CreatorView(), 'Страница автора'),
        new Route('/profile', new ProfileView(), 'Профиль'),
        new Route('', new ErrorPage(), 'Страница не найдена')
    ])

    router.setLayout(new Layout())

    router.start()

    console.log(router)
})

export { router }
