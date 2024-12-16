const CACHE_NAME = "tet-cache-v1";
const BASE_PATH = self.location.pathname.replace(/\/$/, ""); // Loại bỏ dấu "/" cuối

const urlsToCache = [
  "/tet/",
  "/tet/manifest.json",
  "/tet/app.css",
  "/tet/app.js",
  "/tet/tet.mp3",
  "/tet/icons/icon-192x192.png",
  "/tet/icons/icon-512x512.png",
  "/tet/source/acr.png",
];
const fullUrlsToCache = urlsToCache.map(
  (url) => self.location.origin  + url
);
console.log(fullUrlsToCache);

// Cài đặt Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(fullUrlsToCache).catch((error) => {
        console.error("Error caching files:", error);
      });
    })
  );
});

// Xóa cache cũ khi cập nhật Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Xử lý fetch request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Trả về từ cache nếu có
      }

      return fetch(event.request)
        .then((fetchResponse) => {
          if (!fetchResponse.ok) {
            throw new Error(
              `Network response was not ok: ${fetchResponse.status}`
            );
          }

          // Bỏ qua cache nếu response có mã trạng thái 206 (Partial Content)
          if (fetchResponse.status === 206) {
            console.warn(
              "Partial response (206) not cached:",
              event.request.url
            );
            return fetchResponse;
          }

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
