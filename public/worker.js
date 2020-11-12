let CACHE_NAME = "monda-meet"

let urlsToCache = [
    '/',
    '/room'
];

// install a service worker
self.addEventListener('install', event => {
    //Perform install steps
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        console.log("Open cache");
        return cache.addAll(urlsToCache);
    }));
});

// Cache and return request
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
        // cache hit - return response
        if (response)
            return response
        return fetch(event.request)
    }));
});

// Update a service worker
self.addEventListener('activate', event => {
    let cacheWhiteList = ['monda-meet']
    event.waitUntil(caches.keys().then(cachesNames => {
        return Promise.all(
            cachesNames.map(cacheName => {
                if (cacheWhiteList.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName)
                }
            }));
    }));
});