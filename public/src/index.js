import Router, { Route } from './router/index.js'
import IndexView from './views/index.js'
import ErrorPage from './views/errorpage.js'
import Layout from './components/layout.js'
import SigninView from './views/signin.js'
import SignupView from './views/signup.js'

let router
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root')

    router = new Router(root, [
        new Route('/signin', new Layout(new SigninView()), 'Войти'),
        new Route('/signup', new Layout(new SignupView()), 'Регистрация'),
        new Route('/', new Layout(new IndexView()), 'Главная'),
        new Route('', new Layout(new ErrorPage()), '404')
    ])

    router.start()
})

export { router }
