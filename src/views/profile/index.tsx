import api from '../../api/index';
import app from 'irbis';
import Button from 'ui-library/button';
import Component from 'irbis/component';
import consts from '../../consts';
import CreatorCard from 'ui-library/creator-card';
import ErrorPage from '../errorpage';
import ProfileCard from 'ui-library/profile-card';
import Skeleton from 'ui-library/skeleton';
import user from '../../storage/user';

import { CreatorEntity } from '../../api/types';
import './style.scss';

class ProfileView extends Component<never, {
    user?: {
        avatar: string,
        username: string
    },
    creators?:CreatorEntity[],
    errorFirstLoading?: boolean
}> {
    constructor () {
        super();
        this.state.user = null;
        this.state.creators = null;

        this.state.errorFirstLoading = false;
    }

    render () {
        if (!this.state.user) return null;

        // if (this.state.errorFirstLoading) {
        //     return <ErrorPage desc="Нет соединения с интернетом" />;
        // }

        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }

        return (
            <div>
                <div className="profile-block shadow">
                    <ProfileCard
                        avatar={this.state.user.avatar}
                        supportCount={
                            this.state.creators
                                ? this.state.creators.length
                                : '?'
                        }
                        username={this.state.user.username}
                    >
                        <>
                            <Button
                                color="default"
                                onClick={
                                    () => {
                                        app.$router.go(app.$router.createUrl('profile.edit'));
                                    }
                                }
                                text="Настройки"
                            />

                            {user.user.haveCreator
                                ? <div style="margin-top:10px;">

                                    <Button
                                        color="default"
                                        onClick={
                                            () => {
                                                app.$router.go(app.$router.createUrl('creator.panel'));
                                            }
                                        }
                                        text="Панель автора"
                                    />
                                </div>
                                : <div style="margin-top:10px;">

                                    <Button
                                        color="default"
                                        onClick={
                                            () => {
                                                app.$router.go(app.$router.createUrl('profile.edit', 'creator_settings'));
                                            }
                                        }
                                        text="Создать аккаунт автора"
                                    />
                                </div>}
                        </>
                    </ProfileCard>
                </div>

                <h1 className="text-center">
                    {consts.subscriptions + ':'}
                </h1>

                {
                    this.state.creators
                        ? <>

                            <div className="creators-container">
                                {this.state.creators.map((creator) => {
                                    return (<CreatorCard
                                        key={creator.id}
                                        id={creator.id}
                                        name={creator.name}
                                        avatar={creator.avatar}
                                        description={creator.description}
                                    />);
                                })}
                            </div>

                            {
                                !this.state.creators.length
                                    ? <div className="profile-block__no-creators">
                                        <img
                                            router-go={app.$router.createUrl('creators.search')}
                                            src="/imgs/find_creators_message.svg"
                                        />
                                    </div>
                                    : <div className="profile-block__find_new">
                                        <Button
                                            onClick={() => {
                                                app.$router.go(app.$router.createUrl('creators.search'));
                                            }}
                                            text="Найти новых авторов"
                                            color="primary"
                                        />
                                    </div>
                            }
                        </>
                        : <div className="creators-container">
                            {[1, 2, 3].map((i) => (
                                <div key={i}>
                                    <Skeleton type="circle" />

                                    <br />

                                    <Skeleton
                                        height={45}
                                        type="text"
                                        width={200}
                                    />
                                </div>
                            ))}
                        </div>
                }

                <br />
            </div>
        );
    }

    async created () {
        if (!user.user) return app.$router.go('/signin');

        this.state.user = Object.assign(user.user);
        try {
            this.state.creators = await api.subscriptions();
        } catch {
            this.state.errorFirstLoading = true;
        }
    }
}

export default ProfileView;
