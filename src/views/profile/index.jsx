import api from '../../api/index';
import Component from '../../components/basecomponent';
import Button from '../../components/button';
import CreatorCard from '../../components/creator-card';
import ProfileCard from '../../components/profile-card';
import Skeleton from '../../components/skeleton';
import consts from '../../consts';
import app from '../../core/app';
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

        if (this.attributes.errorFirstLoading) {
            return <ErrorPage desc="Ошибка загрузки" />;
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
                                color="primary"
                                onClick={
                                    () => {
                                        app.$router.go(app.$router.createUrl('profile.edit'));
                                    }
                                }
                                text="Редактировать профиль"
                            />

                            {user.user.haveCreator
                                ? <div style="margin-top:10px;">

                                    <Button
                                        color="primary"
                                        onClick={
                                            () => {
                                                app.$router.go(app.$router.createUrl('creator.panel'));
                                            }
                                        }
                                        text="Перейти в панель автора"
                                    />
                                </div>
                                : ''}
                        </>
                    </ProfileCard>
                </div>

                <h1 className="text-center">
                    {consts.subscriptions + ':' }
                </h1>

                {
                    this.attributes.creators
                        ? <>

                            <div className="creators-container">
                                {this.attributes.creators.map((creator) => {
                                    return (new CreatorCard(creator)).renderReactive();
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
