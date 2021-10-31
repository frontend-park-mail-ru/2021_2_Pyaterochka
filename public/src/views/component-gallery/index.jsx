import Component from '../../components/basecomponent';
import Button from '../../components/button';
import CreatorCard from '../../components/creator-card';
import Footer from '../../components/footer';
import InputField from '../../components/input-field';
import LevelCard from '../../components/level-card';
import LockMessage from '../../components/lock-message';
import Navbar from '../../components/navbar';
import PostCard from '../../components/post-card';
import ProfileCard from '../../components/profile-card';
import Skeleton from '../../components/skeleton';
import Spinner from '../../components/spinner';
import Step from '../../components/step';
import Comment from '../../components/comment';
import PrettySection from '../../components/pretty-main-section';
import Like from '../../components/like/index';

import './style.scss';
import app from '../../core/app';
import EditorComponent from '../../components/editor';
import { PropsView } from './PropsView';
import TimeAgoComponent from '../../components/time-ago';
import SimplifyNumComponent from '../../components/simplify-num';
import SwitchComponent from '../../components/switch';
import AvatarUploader from '../../components/avatar-uploader';

class IndexView extends Component {
    constructor () {
        super();
        this.attributes.cps = [
            {
                name: 'Загрузка аватара',
                data: [
                    {
                        component: new AvatarUploader({
                            avatar:
                                'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                        })
                    }
                ]
            },
            {
                name: 'Переключатель',
                data: [
                    {
                        name: 'ON',
                        component: new SwitchComponent({
                            isOn: true
                        })
                    }
                ]
            },
            {
                name: 'Лайк',
                data: [
                    {
                        name: 'Авторизирован',
                        component: new Like({
                            user: {
                                username: 'Person',
                                avatar: 'https://thispersondoesnotexist.com/image'
                            },
                            count: 0
                        })
                    },
                    {
                        name: 'Не авторизирован',
                        component: new Like({
                            count: 230
                        })
                    }
                ]
            },
            {
                name: 'Шапка',
                data: [
                    {
                        name: 'Не авторизирован',
                        component: new Navbar()
                    },
                    {
                        name: 'Авторизирован',
                        component: new Navbar({
                            user: {
                                username: 'Person',
                                avatar: 'https://thispersondoesnotexist.com/image'
                            }
                        })
                    }
                ]
            },
            {
                name: 'Редактор',
                showAll: true,
                data: [
                    {
                        name: 'Создание записи',
                        component: new EditorComponent({
                            comment: 'Черновик был сохранен автоматически'
                        })
                    },
                    {
                        name: 'Редактирование',
                        component: new EditorComponent({
                            title: 'Some title',
                            description: 'Some description',
                            isDraft: false
                        })
                    }
                ]
            },
            {
                name: 'Подвал',
                data: [
                    {
                        name: '',
                        component: new Footer()
                    }
                ]
            },
            {
                name: 'Карточка профиля',
                data: [
                    {
                        name: 'Без слота',
                        component: new ProfileCard({
                            username: 'HenSI.Pro2929',
                            supportCount: 15,
                            avatar: 'https://thispersondoesnotexist.com/image'
                        })
                    },
                    {
                        name: 'Со слотом',
                        component: new ProfileCard(
                            {
                                username: 'HenSI.Pro2929',
                                supportCount: 15,
                                avatar: 'https://thispersondoesnotexist.com/image'
                            },
                            new Button({
                                text: 'Редактировать профиль',
                                color: 'primary'
                            }).renderReactive()
                        )
                    }
                ]
            },
            {
                name: 'Скелетон',
                data: [
                    {
                        name: 'Прямоугольник',
                        component: new Skeleton()
                    },
                    {
                        name: 'Текст',
                        component: new Skeleton({ type: 'text' })
                    },
                    {
                        name: 'Круг',
                        component: new Skeleton({ type: 'circle', height: 100 })
                    }
                ]
            },
            {
                name: 'Спинер',
                data: [
                    {
                        name: '',
                        component: new Spinner()
                    }
                ]
            },
            {
                name: 'Карточка автора',
                data: [
                    {
                        name: 'Без тени',
                        component: new CreatorCard({
                            name: 'IU7-memes',
                            description: 'создает мемы из закулисий цирка',
                            avatar:
                                'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                        })
                    },
                    {
                        name: 'С тенью',
                        component: new CreatorCard({
                            name: 'IU7-memes',
                            description: 'создает мемы из закулисий цирка',
                            shadow: true,
                            avatar:
                                'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                        })
                    }
                ]
            },
            {
                name: 'Красивая секция на главной',
                data: [
                    {
                        component: new PrettySection({})
                    }
                ]
            },
            {
                name: 'Сообщение с замочком',
                data: [
                    {
                        name: 'Без слота',
                        component: new LockMessage({
                            text: 'Профи'
                        })
                    },
                    {
                        name: 'Со слотом',
                        component: new LockMessage(
                            {
                                text: 'Стань патроном, чтобы продолжить наслаждаться работами автора'
                            },
                            new Button({
                                text: 'Стать патроном',
                                color: 'primary'
                            }).renderReactive()
                        )
                    }
                ]
            },

            {
                name: 'Карточка записи',
                data: [
                    {
                        name: 'Доступная',
                        component: new PostCard({
                            title:
                                'Новый выпуск игрового ролика о невероятных машинах нашего времени',
                            published: new Date(new Date() - 60 * 1000 * 5),
                            views: 10000,
                            likes: 5000,
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
                            level: 'Профессионал',
                            image:
                                'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
                        })
                    },
                    {
                        name: 'Закрытая',
                        component: new PostCard({
                            title:
                                'Новый выпуск игрового ролика о невероятных машинах нашего времени',
                            published: new Date(new Date() - 60 * 1000 * 60 * 5),
                            views: 10000,
                            likes: 5000,
                            opened: false,
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum efficitur velit, et aliquam ex condimentum vel. In pulvinar lorem augue, a bibendum justo sagittis ut. Sed semper suscipit arcu non sodales. Curabitur dapibus vulputate mauris, egestas ultricies elit consequat ut. Integer ut velit ut velit viverra viverra. Maecenas non porttitor nibh. Class aptent taciti sociosqu ad litor',
                            level: 'Профессионал',
                            image:
                                'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg'
                        })
                    }
                ]
            },

            {
                name: 'Комментарий',
                data: [
                    {
                        name: '',
                        component: new Comment({
                            user: {
                                username: 'Person',
                                avatar:
                                    'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                            },
                            published: new Date(new Date() - 60 * 1000 * 5),
                            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti quod iure necessitatibus doloribus magni assumenda quasi, a maiores repellendus et, quidem sit vitae totam fugiat ut voluptas libero dolor perspiciatis.'
                        })
                    }
                ]
            },

            {
                name: 'Шаг',
                data: [
                    {
                        name: 'Шаг 1',
                        component: new Step({
                            number: 1,
                            name: 'Настройте свою страницу и уровни подписки',
                            description: (
                                <>
                                    <a router-go={app.$router.createUrl('signup')} className="step-content__description-link">
                                        Зарегистрируйтесь
                                    </a>{' '}
                                    и настройте вашу страницу на Patreon. Продумайте уровни
                                    подписки, от самого дешевого до привилегированного. Каждый
                                    уровень предлагает особые условия и преимущества вашим
                                    фанатам. Подумайте, что вы реально сможете давать регулярно и
                                    чему будут рады ваши фанаты. Не усложняйте!
                                </>
                            )
                        })
                    },
                    {
                        name: 'Шаг 2',
                        component: new Step({
                            number: 2,
                            name: 'Расскажите своим подписчикам, что вы теперь есть на Patreon',
                            description:
                                'Сделайте посты во всех ваших основных соц.сетях, чтобы оповестить всех ваших подписчиков. Patreon - это место, где рождаются особые отношения между вами и вашими самыми активными фанатами - теми, кто хочет чего-то большего, чем просто следить за вами в социальных сетях.'
                        })
                    },
                    {
                        name: 'Шаг 3',
                        component: new Step({
                            number: 3,
                            name: 'Будьте активны и прислушивайтесь к вашим подписчикам',
                            description:
                                'Регулярно делитесь обновлениями на Patreon, предоставляйте преимущества. Цель - чтобы подписчики были с вами долго и их число стабильно росло. Также поддерживайте импульс, периодически напоминая в социальных сетях о вашем Boosty, чтобы привлечь больше поклонников к подписке.'
                        })
                    }
                ]
            },

            {
                name: 'Карточка уровня подписки',
                data: [
                    {
                        name: 'С родителем',
                        component: new LevelCard({
                            name: 'Профессионал',
                            parentName: 'Геймер',
                            cover:
                                'https://wallpaperscave.ru/images/original/18/01-10/abstract-colors-8119.jpg',
                            benefits: [
                                'Доступ к реализации алгоритмов',
                                'Безлимитное мыло из Анапы'
                            ],
                            price: '10 $'
                        })
                    },
                    {
                        name: 'Без родителя',
                        component: new LevelCard({
                            name: 'Геймер',
                            cover:
                                'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg',
                            benefits: [
                                'Доступ к реализации алгоритмов',
                                'Безлимитное мыло из Анапы'
                            ],
                            price: '10 $',
                            color: 'accent'
                        })
                    },
                    {
                        name: 'Без обложки и много преимуществ',
                        component: new LevelCard({
                            name: 'Без обложки и много преимуществ',
                            cover: null,
                            benefits: [
                                'Доступ к реализации алгоритмов',
                                'Безлимитное мыло из Анапы',
                                'Безлимитное мыло из Анапы',
                                'Безлимитное мыло из Анапы',
                                'Безлимитное мыло из Анапы'
                            ],
                            price: '10 ₽',
                            color: 'success'
                        })
                    }
                ]
            },
            {
                name: 'Поле ввода',
                data: [
                    {
                        name: '',
                        component: new InputField({
                            placeholder: 'Placeholder',
                            validation: [
                                (v) => (v === '' ? null : 'Поле не должно быть пустым')
                            ]
                        })
                    }
                ]
            },
            {
                name: 'Кнопка',
                data: [
                    ...['default', 'primary', 'success', 'grey', 'warning', 'accent'].map(
                        (color) => ({
                            name: color,
                            component: new Button({ text: 'Button ' + color, color: color })
                        })
                    ),
                    ...['default', 'primary', 'success', 'grey', 'warning', 'accent'].map(
                        (color) => ({
                            name: color + ' rounded',
                            component: new Button({
                                text: 'Button ' + color,
                                color: color,
                                rounded: true
                            })
                        })
                    )
                ]
            },
            {
                name: 'Форматированная дата',
                data: [
                    {
                        component: new TimeAgoComponent({
                            date: new Date()
                        })
                    }
                ]
            },
            {
                name: 'Упрощенное число',
                data: [
                    {
                        component: new SimplifyNumComponent({
                            num: 1001
                        })
                    }
                ]
            }
        ];

        this.attributes.cps.forEach((c) => {
            c.active = 0;
        });
    }

    render () {
        const componentMenu = [];
        const componentWrappers = [];

        this.attributes.cps.forEach((info, ii) => {
            const component = info.data[info.active].component;
            const componentWrapper = info.showAll
                ? (
                    <div className="component-wrapper">
                        <h2>{info.name}</h2>

                        {info.data.map((component, i) =>
                            <>
                                Вариант компонента: {component.name}
                                <div className="component-wrapper__component">
                                    {component.component.renderReactive()}
                                </div>
                                Описание атрибутов:
                                <div key={i}>
                                    <PropsView component={component.component} />
                                </div>
                            </>

                        )}
                    </div>
                )
                : (
                    <div className="component-wrapper">
                        <h2>{info.name}</h2>
                        {info.data.length > 1
                            ? (
                                <>
                                    Варианты компонента:
                                    <div className="component-wrapper__variants">
                                        {info.data.map((c, i) => (
                                            <Button
                                                key={i}
                                                text={c.name}
                                                onClick={() => {
                                                    this.attributes.cps[ii].active = i;
                                                    this.attributes.cps = Object.assign(this.attributes.cps);
                                                }}
                                                color={info.active === i ? 'primary' : 'default'}
                                            />
                                        ))}
                                    </div>
                                </>
                            )
                            : (
                                ''
                            )}
                        <div className="component-wrapper__component">
                            {component.renderReactive()}
                        </div>
                        Описание атрибутов:
                        <div key={info.active}>
                            <PropsView component={component} />
                        </div>
                    </div>
                );

            componentWrappers.push(componentWrapper);
            componentMenu.push(
                new Button({
                    text: info.name,
                    onClick: () => {
                        window.scrollTo(0, componentWrapper.dom.offsetTop - 100);
                    }
                }).renderReactive()
            );
        });

        const element = (
            <div className="content">
                <div className="container">
                    <h1 className="text-center">Страницы</h1>
                    <div>
                        <a router-go={app.$router.createUrl('creator')}> Страница автора </a>
                        <a router-go={app.$router.createUrl('profile')}> Профиль </a>
                        <a router-go="/404"> Страница ошибки </a>
                    </div>
                    <h1 className="text-center">Компоненты</h1>
                    <div className="components-map">
                        {componentMenu}
                    </div>
                    {componentWrappers}
                </div>

            </div>
        );

        return element;
    }
}

export default IndexView;
