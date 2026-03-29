const CACHE_NAME = "bus-tmsa-cache-v1";
const urlsToCache = [
  "/bus-basha-tmsa-v72ultra-/",
  "/bus-basha-tmsa-v72ultra-/index.html",
  "/bus-basha-tmsa-v72ultra-/manifest.json"
];

// Instalar y cachear archivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar y limpiar caché antiguo
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Interceptar peticiones y servir desde caché si no hay internet
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
