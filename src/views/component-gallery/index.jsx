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
import TabsPanel from '../../components/tabs-panel';
import ImageUploader from '../../components/image-uploader';
import SelectComponent from '../../components/select';
import VideoPlayer from '../../components/video-player';
import FileUploader from '../../components/file-uploader';
import AudioPlayer from '../../components/audio-player';
import VDomComponent from '../../modules/jsx/vdom-component';

class IndexView extends Component {
    constructor () {
        super();
        this.attributes.cps = [
            {
                name: 'Видео плеер',
                Component: VideoPlayer,
                data: [
                    {
                        component: {
                            src: [{
                                url: 'http://media.w3.org/2010/05/bunny/movie.mp4',
                                type: 'video/mp4'
                            }],
                            poster: 'http://media.w3.org/2010/05/bunny/poster.png'
                        }
                    }
                ]
            },
            {
                name: 'Аудио плеер',
                Component: AudioPlayer,
                data: [
                    {
                        component: {
                            src: [{
                                url: 'https://jplayer.org/audio/mp3/RioMez-01-Sleep_together.mp3',
                                type: ''
                            }]
                        }
                    }
                ]
            },
            {
                name: 'Загрузка файла',
                Component: FileUploader,
                data: [
                    {
                        name: 'Файл',
                        component: {}
                    }
                ]
            },
            {
                name: 'Загрузка аватара',
                Component: ImageUploader,
                data: [
                    {
                        name: 'Загружен аватар',

                        component: {
                            isCircle: true,
                            imageName: 'аватар',
                            image: 'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                        }
                    },
                    {
                        name: 'Загружена обложка',

                        component: {
                            isCircle: false,
                            imageName: 'обложку',
                            image: 'https://wallpaperscave.ru/images/original/18/01-10/abstract-colors-8119.jpg'

                        }
                    },
                    {
                        name: 'Спиннер на аватарке',

                        component: {
                            loading: true,
                            isCircle: true,
                            image: 'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                        }
                    },
                    {
                        name: 'Спиннер на обложке',

                        component: {
                            loading: true,
                            isCircle: false,
                            image: 'https://wallpaperscave.ru/images/original/18/01-10/abstract-colors-8119.jpg'
                        }
                    }
                ]
            },
            {
                name: 'Выпадающее меню',
                Component: SelectComponent,
                data: [
                    {
                        component: {
                            placeholder: 'Категория',
                            inital: 'Выберите категорию',
                            options: [
                                'Подкасты',
                                'Музыканты',
                                'Художники',
                                'Писатели и журналисты',
                                'Видеоблогер',
                                'Образование',
                                'Программирование',
                                'Другое'
                            ]
                        }
                    }]
            },
            {
                name: 'Панель вкладок',
                Component: TabsPanel,
                data: [
                    {
                        name: 'ON',
                        component: {
                            tabs: [
                                {
                                    key: 'common',
                                    title: 'Основная информация'
                                },
                                {
                                    key: 'account',
                                    title: 'Аккаунт'
                                },
                                {
                                    key: 'notifications',
                                    title: 'Уведомления'
                                },
                                {
                                    key: 'creator_settings',
                                    title: 'Аккаунт креатора'
                                }
                            ],
                            activeTab: 'notifications'
                        }
                    }
                ]
            }, {
                name: 'Переключатель',
                Component: SwitchComponent,
                data: [
                    {
                        name: 'ON',
                        component: {
                            isOn: true
                        }
                    }
                ]
            },
            {
                name: 'Лайк',
                Component: Like,
                data: [
                    {
                        name: 'Авторизирован',
                        component: {
                            user: {
                                username: 'Person',
                                avatar: 'https://thispersondoesnotexist.com/image'
                            },
                            count: 0
                        }
                    },
                    {
                        name: 'Не авторизирован',
                        component: {
                            count: 230
                        }
                    }
                ]
            },
            {
                name: 'Шапка',
                Component: Navbar,
                data: [
                    {
                        name: 'Не авторизирован',
                        component: {}
                    },
                    {
                        name: 'Авторизирован',
                        component: {
                            user: {
                                username: 'Person',
                                avatar: 'https://thispersondoesnotexist.com/image'
                            }
                        }
                    }
                ]
            },
            {
                name: 'Редактор',
                showAll: true,
                Component: EditorComponent,
                data: [
                    {
                        name: 'Создание записи',
                        component: {
                            comment: 'Черновик был сохранен автоматически'
                        }
                    },
                    {
                        name: 'Редактирование',
                        component: {
                            title: 'Some title',
                            description: 'Some description',
                            isDraft: false
                        }
                    }
                ]
            },
            {
                name: 'Подвал',
                Component: Footer,
                data: [
                    {
                        name: '',
                        component: {}
                    }
                ]
            },
            {
                name: 'Карточка профиля',
                Component: ProfileCard,
                data: [
                    {
                        name: 'Без слота',
                        component: {
                            username: 'HenSI.Pro2929',
                            supportCount: 15,
                            avatar: 'https://thispersondoesnotexist.com/image'
                        }
                    },
                    {
                        name: 'Со слотом',
                        component:
                        {
                            username: 'HenSI.Pro2929',
                            supportCount: 15,
                            avatar: 'https://thispersondoesnotexist.com/image'
                        },
                        slot: <Button
                            text='Редактировать профиль'
                            color='primary' />
                    }
                ]
            },
            {
                name: 'Скелетон',
                Component: Skeleton,
                data: [
                    {
                        name: 'Прямоугольник',
                        component: {}
                    },
                    {
                        name: 'Текст',
                        component: { type: 'text' }
                    },
                    {
                        name: 'Круг',
                        component: { type: 'circle', height: 100 }
                    }
                ]
            },
            {
                name: 'Спинер',
                Component: Spinner,
                data: [
                    {
                        name: '',
                        component: {}
                    }
                ]
            },
            {
                name: 'Карточка автора',
                Component: CreatorCard,
                data: [
                    {
                        name: 'Без тени',
                        component: {
                            name: 'IU7-memes',
                            description: 'создает мемы из закулисий цирка',
                            avatar:
                                'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                        }
                    },
                    {
                        name: 'С тенью',
                        component: {
                            name: 'IU7-memes',
                            description: 'создает мемы из закулисий цирка',
                            shadow: true,
                            avatar:
                                'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                        }
                    }
                ]
            },
            {
                name: 'Красивая секция на главной',
                Component: PrettySection,
                data: [
                    {
                        component: {}
                    }
                ]
            },
            {
                name: 'Сообщение с замочком',
                Component: LockMessage,
                data: [
                    {
                        name: 'Без слота',
                        component: {
                            text: 'Профи'
                        }
                    },
                    {
                        name: 'Со слотом',
                        component: {
                            text: 'Стань патроном, чтобы продолжить наслаждаться работами автора'
                        },
                        slot:
                            new Button({
                                text: 'Стать патроном',
                                color: 'primary'
                            }).renderReactive()

                    }
                ]
            },

            {
                name: 'Карточка записи',
                Component: PostCard,
                data: [
                    {
                        name: 'Доступная',
                        component: {
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
                        }
                    },
                    {
                        name: 'Закрытая',
                        component: {
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
                        }
                    }
                ]
            },

            {
                name: 'Комментарий',
                Component: Comment,
                data: [
                    {
                        name: '',
                        component: {
                            user: {
                                username: 'Person',
                                avatar:
                                    'https://sun9-12.userapi.com/impf/c854228/v854228051/16558/K7rRvW0xelY.jpg?size=647x809&quality=96&sign=83e72450667c775a5831dac80fb2dea5&type=album'
                            },
                            published: new Date(new Date() - 60 * 1000 * 5),
                            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti quod iure necessitatibus doloribus magni assumenda quasi, a maiores repellendus et, quidem sit vitae totam fugiat ut voluptas libero dolor perspiciatis.'
                        }
                    }
                ]
            },

            {
                name: 'Шаг',
                Component: Step,
                data: [
                    {
                        name: 'Шаг 1',
                        component: {
                            number: 1,
                            name: 'Настройте свою страницу и уровни подписки',
                            description: (
                                <>
                                    <a
                                        className="step-content__description-link"
                                        router-go={app.$router.createUrl('signup')}
                                    >
                                        Зарегистрируйтесь
                                    </a>

                                    {' '}
                                    и настройте вашу страницу на Patreon. Продумайте уровни
                                    подписки, от самого дешевого до привилегированного. Каждый
                                    уровень предлагает особые условия и преимущества вашим
                                    фанатам. Подумайте, что вы реально сможете давать регулярно и
                                    чему будут рады ваши фанаты. Не усложняйте!
                                </>
                            )
                        }
                    },
                    {
                        name: 'Шаг 2',
                        component: {
                            number: 2,
                            name: 'Расскажите своим подписчикам, что вы теперь есть на Patreon',
                            description:
                                'Сделайте посты во всех ваших основных соц.сетях, чтобы оповестить всех ваших подписчиков. Patreon - это место, где рождаются особые отношения между вами и вашими самыми активными фанатами - теми, кто хочет чего-то большего, чем просто следить за вами в социальных сетях.'
                        }
                    },
                    {
                        name: 'Шаг 3',
                        component: {
                            number: 3,
                            name: 'Будьте активны и прислушивайтесь к вашим подписчикам',
                            description:
                                'Регулярно делитесь обновлениями на Patreon, предоставляйте преимущества. Цель - чтобы подписчики были с вами долго и их число стабильно росло. Также поддерживайте импульс, периодически напоминая в социальных сетях о вашем Boosty, чтобы привлечь больше поклонников к подписке.'
                        }
                    }
                ]
            },

            {
                name: 'Карточка уровня подписки',
                Component: LevelCard,
                data: [
                    {
                        name: 'С родителем',
                        component: {
                            name: 'Профессионал',
                            parentName: 'Геймер',
                            cover:
                                'https://wallpaperscave.ru/images/original/18/01-10/abstract-colors-8119.jpg',
                            benefits: [
                                'Доступ к реализации алгоритмов',
                                'Безлимитное мыло из Анапы'
                            ],
                            price: '10 $'
                        }
                    },
                    {
                        name: 'Без родителя',
                        component: {
                            name: 'Геймер',
                            cover:
                                'https://w-dog.ru/wallpapers/12/12/456213867326621/fraktaly-prelomlenie-sveta-cvetovaya-gamma-figury-geometrii-triptix.jpg',
                            benefits: [
                                'Доступ к реализации алгоритмов',
                                'Безлимитное мыло из Анапы'
                            ],
                            price: '10 $',
                            color: 'accent'
                        }
                    },
                    {
                        name: 'Без обложки и много преимуществ',
                        component: {
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
                        }
                    }
                ]
            },
            {
                name: 'Поле ввода',
                Component: InputField,
                data: [
                    {
                        name: '',
                        component: {
                            placeholder: 'Placeholder',
                            validation: [
                                (v) => (v === '' ? null : 'Поле не должно быть пустым')
                            ]
                        }
                    }
                ]
            },
            {
                name: 'Кнопка',
                Component: Button,
                data: [
                    ...['default', 'primary', 'success', 'grey', 'warning', 'accent'].map(
                        (color) => ({
                            name: color,
                            component: { text: 'Button ' + color, color: color }
                        })
                    ),
                    ...['default', 'primary', 'success', 'grey', 'warning', 'accent'].map(
                        (color) => ({
                            name: color + ' rounded',
                            component: {
                                text: 'Button ' + color,
                                color: color,
                                rounded: true
                            }
                        })
                    )
                ]
            },
            {
                name: 'Форматированная дата',
                Component: TimeAgoComponent,
                data: [
                    {
                        component: {
                            date: new Date()
                        }
                    }
                ]
            },
            {
                name: 'Упрощенное число',
                Component: SimplifyNumComponent,
                data: [
                    {
                        component: {
                            num: 1001
                        }
                    }
                ]
            }
        ];

        this.attributes.cps.forEach((c) => {
            c.active = 0;
            if (!c.Component) {
                console.error('No component', c);
            }
            c.vdom = new VDomComponent(c.Component, c.data[0].component, []);
        });
    }

    render () {
        const componentMenu = [];
        const componentWrappers = [];

        this.attributes.cps.forEach((info, ii) => {
            const componentWrapper = (
                <div className="component-wrapper">
                    <h2>
                        {info.name}
                    </h2>

                    {info.data.length > 1
                        ? (
                            <>
                                Варианты компонента:
                                <div className="component-wrapper__variants">
                                    {info.data.map((c, i) => (
                                        <Button
                                            color={info.active === i ? 'primary' : 'default'}
                                            key={i}
                                            onClick={() => {
                                                info.active = i;
                                                info.vdom._component.setProps(c.component);
                                                this.update();
                                            }}
                                            text={c.name}
                                        />
                                    ))}
                                </div>
                            </>
                        )
                        : (
                            ''
                        )}

                    <div className="component-wrapper__component">
                        {info.vdom}
                    </div>
                    Описание атрибутов:

                    <div>
                        <PropsView component={info.vdom} />
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
                    <h1 className="text-center">
                        Страницы
                    </h1>

                    <div>
                        <a router-go={app.$router.createUrl('creator')}>
                            {' '}
                            Страница автора

                            {' '}
                        </a>

                        <a router-go={app.$router.createUrl('profile')}>
                            {' '}
                            Профиль

                            {' '}
                        </a>

                        <a router-go="/404">
                            {' '}
                            Страница ошибки

                            {' '}
                        </a>
                    </div>

                    <h1 className="text-center">
                        Компоненты
                    </h1>

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
