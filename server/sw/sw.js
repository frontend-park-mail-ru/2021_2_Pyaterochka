/* global cacheName, contentToCache */

const hostUrl = location.protocol + '//' + location.host;

const clearCache = async () => {
    const installed = await caches.keys();

    await Promise.all(installed.map(async (e) => {
        await caches.delete(e);
    }));
};
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        await clearCache();

        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching all: app shell and content to cache '${cacheName}'`);
        await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const url = e.request.url;

        const r = await caches.match(e.request);
        if (r) {
            return r;
        }

        if (e.request.mode === 'navigate' && !url.endsWith('.css') && !url.endsWith('.js')) {
            const r = await caches.match('/');
            if (r) {
                return r;
            }
        }

        const response = await fetch(e.request);

        if (url.endsWith('.js') && url.startsWith(hostUrl)) {
            const cache = await caches.open(cacheName);
            console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
            cache.put(e.request, response.clone());
        }

        return response;
    })());
});

self.addEventListener('message', async ev => {
    if (ev.data === 'skipWaiting') {
        console.log('[Service Worker] skipWaiting');
        await self.skipWaiting();
        console.log('[Service Worker] skipped');
    }
});
