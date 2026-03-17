const CACHE = 'thai-flashcards-v3-app';
const ASSETS = [
  '/thai-flashcards-v3/',
  '/thai-flashcards-v3/index.html',
  '/thai-flashcards-v3/words.js',
  '/thai-flashcards-v3/sentences.js',
  '/thai-flashcards-v3/a1.js',
  '/thai-flashcards-v3/a2.js',
  '/thai-flashcards-v3/manifest.json',
  '/thai-flashcards-v3/icon-192.png',
  '/thai-flashcards-v3/icon-512.png',
  '/thai-flashcards-v3/how-to-use.html'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
