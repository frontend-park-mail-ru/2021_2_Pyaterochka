import api from '../../api/index';
import Component from 'irbis/component';
import Button from 'ui-library/button';
import CreatorCard from 'ui-library/creator-card';
import ProfileCard from 'ui-library/profile-card';
import Skeleton from 'ui-library/skeleton';
import consts from '../../consts';
import app from 'irbis';
import user from '../../storage/user';
import ErrorPage from '../errorpage';

import './style.scss';

class ProfileView extends Component {
    constructor () {
        super();
        this.attributes.user = null;
        this.attributes.creators = null;

        this.attributes.errorFirstLoading = false;
    }

    render () {
        if (!this.attributes.user) return null;

        // if (this.attributes.errorFirstLoading) {
        //     return <ErrorPage desc="Нет соединения с интернетом" />;
        // }

        if (!navigator.onLine) {
            return <ErrorPage desc="Нет соединения с интернетом" />;
        }

        return (
            <div>
                <div className="profile-block shadow">
                    <ProfileCard
                        avatar={this.attributes.user.avatar}
                        supportCount={
                            this.attributes.creators
                                ? this.attributes.creators.length
                                : '?'
                        }
                        username={this.attributes.user.username}
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
                    this.attributes.creators
                        ? <>

                            <div className="creators-container">
                                {this.attributes.creators.map((creator) => {
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
                                !this.attributes.creators.length
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

        this.attributes.user = Object.assign(user.user);
        try {
            this.attributes.creators = await api.subscriptions();
        } catch {
            this.attributes.errorFirstLoading = true;
        }
    }
}

export default ProfileView;
