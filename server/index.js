const express = require('express');
const app = express();
const utils = require('./utils');

const port = process.env.PORT || 3001;

const session = require('express-session');

app.use(async (res, req, next) => {
    if (!res.path.endsWith('.jsx')) {
        return next();
    }
    try {
        const code = await utils.transformFile(`./public/${res.path}`);
        req.header('Content-Type', 'application/javascript');
        req.send(code);
        req.end();
    } catch (err) {
        if (err.code === 'ENOENT') return next();
        next(err);
    }
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Origin', 'localhost');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
app.use(express.json());
app.use(express.static('public'));

const users = [
    {
        id: '' + Math.random(),
        username: 'Vladimir',
        password: 'Qwertyuiop',
        email: 'test@test.ru',
        avatar: 'https://million-wallpapers.ru/wallpapers/1/50/339646622751917/vodopad-v-tailande.jpg'
    },
    {
        id: '' + Math.random(),
        username: 'Slava',
        password: 'Qwertyuiop',
        email: 'test2@test.ru',
        avatar: 'https://www.korabli.eu/users/andrey/images/unnamed-gallery-1/full/091033jpg.jpg'
    }
];
app.post('/api/login', (req, res) => {
    const user = users.find(
        (user) =>
            req.body.email === user.email &&
            req.body.password === user.password
    );
    if (!user) {
        res.status(401).json({
            status: 'error'
        });
        return;
    }
    req.session.user = user;
    res.json({
        status: 'success'
    });
});

app.get('/api/profile', (req, res) => {
    if (!req.session.user) {
        res.status(401).json({
            status: 'error'
        });
        return;
    }
    res.json(req.session.user);
});

app.get('/api/logout', (req, res) => {
    if (!req.session.user) {
        res.status(401).json({
            status: 'error'
        });
        return;
    }
    req.session.user = null;
    res.json({
        status: 'ok'
    });
});

app.get('/api/creator', (req, res) => {
    res.json({
        id: 0,
        name: 'IU7-memes',
        description: 'создает мемы из закулисий цирка',
        avatar: 'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album',
        cover: 'https://sun9-32.userapi.com/impf/adHV39RxzhK4WR5F5jATKuoEAOJ1bJrbpl_mqg/cbYQA5UNtlg.jpg?size=795x200&quality=95&crop=0,0,1590,400&sign=2ffcff16ba49a336f42b603af92122d4&type=cover_group'
    });
});

app.get('/api/posts', (req, res) => {
    res.json([
        {
            title: 'Новый выпуск игрового ролика о невероятных машинах нашего времени',
            published: new Date(new Date() - 60 * 1000 * 60 * 5),
            views: 10000,
            likes: 5000,
            opened: true,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
            level: 'Профессионал',
            image: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
        },
        {
            title: 'Новый выпуск игрового ролика о невероятных машинах нашего времени',
            published: new Date(new Date() - 60 * 1000 * 60 * 5),
            views: 10000,
            likes: 5000,
            opened: false,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
            level: 'Профессионал',
            image: 'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
        }
    ]);
});

app.get('/api/levels', (req, res) => {
    res.json([
        {
            name: 'Новичок',
            cover: null,
            benefits: [
                'Доступ к реализации алгоритмов',
                'Безлимитное мыло из Анапы'
            ],
            price: '10 ₽',
            color: 'accent'
        },
        {
            name: 'Геймер',
            cover: null,
            parentName: 'Новичок',
            benefits: [
                'Доступ к реализации алгоритмов',
                'Безлимитное мыло из Анапы'
            ],
            price: '10 ₽',
            color: 'primary'
        },
        {
            name: 'Профессионал',
            cover: null,
            parentName: 'Геймер',
            benefits: [
                'Доступ к реализации алгоритмов',
                'Безлимитное мыло из Анапы'
            ],
            price: '11 ₽',
            color: 'success'
        }
    ]);
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
