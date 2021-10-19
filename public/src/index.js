import Router from './router';
import Route from './router/route';
import Layout from './components/layout';
import LoadingView from './views/loading-view';
import user from './storage/user';
import App from './core/app';

let router;
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await user.update();
    } catch {

    }

    App.setup(<Layout>
        <Router routes={[
            new Route('/', async () => await import('views/main-page'), 'Главная страница'),
            new Route('/signin', async () => await import('views/signin'), 'Войти'),
            new Route('/signup', async () => await import('views/signup'), 'Регистрация'),
            new Route('/components', async () => await import('views/component-gallery'), 'Главная'),
            new Route('/creator/*', async () => await import('views/creator'), 'Страница автора'),
            new Route('/loading-view', async () => { return { default: LoadingView }; }, ''),
            new Route('/profile', async () => await import('views/profile'), 'Профиль'),
            new Route('', async () => await import('views/errorpage'), 'Страница не найдена')
        ]} loadingView={
            <LoadingView />
        } />
    </Layout>, document.getElementById('root'));
    console.log(App);
});

export { router };
