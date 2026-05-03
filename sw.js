const CACHE_NAME = 'asmak-menu-v1';
// الملفات الأساسية التي نريد تخزينها في ذاكرة الجوال
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './لوقو اسماك المحيط.jpeg',
  './icon-192.png',
  './icon-512.png'
];

// تنصيب عامل الخدمة وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// استدعاء الملفات من الكاش لسرعة الفتح
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش، اعرضه. وإلا، اطلبه من الإنترنت
        return response || fetch(event.request);
      })
  );
});