const SWF_URL = 'electricman-2-hs.swf';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Intercepts network requests to make the media URL identical to the site URL
self.addEventListener('fetch', (event) => {
    // If the page is fetching its own exact URL string, intercept it and serve the SWF binary
    if (event.request.url === self.location.origin + '/sitesource2/') {
        // Only intercept if it's a sub-request (like from Ruffle), not the initial page load
        if (event.request.destination !== 'document') {
            event.respondWith(
                fetch(SWF_URL).then(response => {
                    return response;
                })
            );
        }
    }
});
