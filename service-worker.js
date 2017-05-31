/**
 * Service Worker for installing the app and fetching cached assets offline.
 * https://www.sitepoint.com/offline-web-apps-service-workers-pouchdb/
 */

var cacheName = 'peaksPWA';
var filesToCache = [
  '/',
  'index.html',
  'js/jquery.min.js',
  'js/app.js',
  'js/geodata.js',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // try to find corresponding response in the cache
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          // cache hit: return cached result
          return response;
        }

        // not found: fetch resource from the server
        return fetch(event.request);
      })
  );
});

