(function () {
  (function () {
    (function () {
      (function () {
        (function () {
          const start = new Date();
          debugger; // DevTools sẽ dừng lại ở đây
          const end = new Date();
          if (end - start > 100) {
            // Thời gian tăng bất thường => DevTools mở
            localStorage.clear();
            document.body.innerHTML = ""; // Xóa nội dung trang
            document.head.innerHTML = ""; // Xóa nội dung trang
            console.clear();
            while (c == true) {
              console.clear();
            }
          }

          decodeString = (encodedStr) => {
            try {
              let decoded = decodeURIComponent(atob(encodedStr));
              return decoded;
            } catch (error) {
              console.error("Error decoding string:", error);
              return null;
            }
          };

          // Cài đặt Service Worker
          self.addEventListener("install", (event) => {
            event.waitUntil(
              caches.open(decodeString(`dGV0LWNhY2hlLXYx`)).then((cache) => {
                return cache
                  .addAll(
                    [
                      "/tet/",
                      "/tet/manifest.json",
                      "/tet/app.css",
                      "/tet/app.hash.js",
                      "/tet/tet.mp3",
                      "/tet/icons/icon-192x192.png",
                      "/tet/icons/icon-512x512.png",
                      "/tet/source/acr.png",
                    ].map((url) => self.location.origin + url)
                  )
                  .catch((error) => {});
              })
            );
          });

          // Xóa cache cũ khi cập nhật Service Worker
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
              caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                  return cachedResponse; // Trả về từ cache nếu có
                }

                return fetch(event.request)
                  .then((fetchResponse) => {
                    if (!fetchResponse.ok) {
                    }

                    if (fetchResponse.status === 206) {
                      return fetchResponse;
                    }

                    return caches.open(CACHE_NAME).then((cache) => {
                      cache.put(event.request, fetchResponse.clone());
                      return fetchResponse;
                    });
                  })
                  .catch((error) => {});
              })
            );
          });
        })();
      })();
    })();
  })();
})();
