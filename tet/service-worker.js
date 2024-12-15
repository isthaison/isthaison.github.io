const CACHE_NAME = "tet-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/styles.css",
  "/script.js",
  "/tet.mp3",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// Cài đặt Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Error caching files:", error);
      });
    })
  );
});

// Xử lý fetch request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Lấy từ cache nếu có
      }
      return fetch(event.request)
        .then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
        .catch((error) => {
          console.error("Fetch failed:", error);
          throw error;
        });
    })
  );
});
