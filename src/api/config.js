const config = {
    basename: 'https://api.pyaterochka-team.site/api/v1',
    imageBasename: 'https://api.pyaterochka-team.site/api/v1',
    fallback: {
        avatar: 'https://www.vtp-club.ru/img/user.png',
        cover: 'https://tub.avatars.mds.yandex.net/i?id=6ba16db8f8a59eb8740ae862e5d080c9-5221613-images-thumbs&n=13&exp=1'
    }
};
export default config;

console.log((v) => { config.basename = v; config.imageBasename = v; });
