var cacheName = 'peaksPWA';
var filesToCache = [
  '/',
  '/index.html',
  '/jquery.min.js',
  '/peaks.js',
  '/geodata.js',
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


