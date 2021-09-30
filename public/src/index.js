import Router, { Route, DynamicComponentLoader } from './router/index.js';
import Layout from './components/layout.jsx';
import LoadingView from './views/loading-view.jsx';
import user from './storage/user.js';
import EditorComponent from './components/editor.jsx';

let router;
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await user.update();
    } catch {

    }
    const root = document.getElementById('root');

    router = new Router(root, [
        new Route('/main', new DynamicComponentLoader('/src/views/main-page.jsx'), 'Главная страница'),
        new Route('/signin', new DynamicComponentLoader('/src/views/signin.jsx'), 'Войти'),
        new Route('/signup', new DynamicComponentLoader('/src/views/signup.jsx'), 'Регистрация'),
        new Route('/components', new DynamicComponentLoader('/src/views/index.jsx'), 'Главная'),
        new Route('/creator/*', new DynamicComponentLoader('/src/views/creator.jsx'), 'Страница автора'),
        new Route('/loading-view', new LoadingView(), ''),
        new Route('/editor', new EditorComponent(), ''),
        new Route('/', new DynamicComponentLoader('/src/views/profile.jsx'), 'Профиль'),
        new Route('', new DynamicComponentLoader('/src/views/errorpage.jsx'), 'Страница не найдена')
    ]);

    router.setLayout(new Layout());
    router.setLoadingView(new LoadingView());
    router.start();
});

export { router };
