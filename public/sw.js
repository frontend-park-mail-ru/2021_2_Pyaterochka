const cacheName = 'js13kPWA-v1';
const contentToCache = [
    '/',
    '/imgs/favicons/Favicon-16.png',
    '/imgs/favicons/Favicon-32.png',
    '/imgs/favicons/Favicon-96.png',
    '/imgs/favicons/Favicon-128.png',
    '/imgs/favicons/Favicon-192.png',
    '/imgs/favicons/Favicon-512.png',
    '/scripts/index.compiled.js',
    '/styles/index.css',
    '/imgs/error_page.svg'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', (e) => {
    // console.log(`[Service Worker] Fetching resource: ${e.request.url}`);

    e.respondWith((async () => {
        const r = await caches.match(e.request);
        if (r) {
            return r;
        }

        if (e.request.mode === 'navigate' && !e.request.url.endsWith('.css') && !e.request.url.endsWith('.js')) {
            return await caches.match('/');
        }

        const response = await fetch(e.request);

        // const cache = await caches.open(cacheName);
        // console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        // cache.put(e.request, response.clone());
        return response;
    })());
});
