function decodeString(encodedStr) {
  try {
    return decodeURIComponent(atob(encodedStr));
  } catch (error) {
    return null;
  }
}
const tetDate = new Date("2025-01-29T00:00:00+07:00");

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(decodeString(`dGV0LWNhY2hlLXYx`)).then((cache) => {
      if (!cache) return;
      const urlsToCache = [
        "/tet/",
        "/tet/manifest.json",
        "/tet/app.css",
        "/tet/app.js",
        "/tet/tet.mp3",
        "/tet/icons/icon-192x192.png",
        "/tet/icons/icon-512x512.png",
        "/tet/source/acr.png",
      ].map((url) => self.location.origin + url);

      return Promise.all(
        urlsToCache.map((url) =>
          fetch(url).then((response) => cache.put(url, response))
        )
      ).catch((e) => {});
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== decodeString(`dGV0LWNhY2hlLXYx`)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      const newHeaders = new Headers(response.headers);
      newHeaders.set("X-Content-Type-Options", "nosniff");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    })
  );
});
self.addEventListener("fetch", (event) => {
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Trả về từ cache nếu có
        }

        return fetch(event.request)
          .then((fetchResponse) => {
            if (!fetchResponse.ok) {
              return fetchResponse; // Trả về phản hồi từ mạng nếu không thể lưu cache
            }

            if (fetchResponse.status === 206) {
              return fetchResponse; // Trả về phản hồi một phần
            }

            const cacheName = decodeString(`dGV0LWNhY2hlLXYx`);
            if (!cacheName) {
              console.log("Cache name decoding failed");
              return fetchResponse;
            }

            return caches
              .open(cacheName)
              .then((cache) => {
                // Thêm vào cache và trả về phản hồi
                cache
                  .put(event.request, fetchResponse.clone())
                  .catch((error) => {
                    console.log("Failed to cache request:", error);
                  });
                return fetchResponse;
              })
              .catch((error) => {
                console.log("Failed to open cache:", error);
                return fetchResponse; // Trả về phản hồi nếu không thể mở cache
              });
          })
          .catch((error) => {
            console.log("Network request failed:", error);
          });
      })
      .catch((error) => {
        console.log("Cache match failed:", error);
      })
  );
});

// Lập trình lặp lại thông báo mỗi phút

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  clients.openWindow("/tet"); // Mở trang chính khi người dùng nhấp vào thông báo
});
