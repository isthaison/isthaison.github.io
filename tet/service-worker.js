(function () {
  (function () {
    (function () {
      (function () {
        (function () {
          // bắt đầu
          (function () {
            const start = new Date();
            debugger;
            const end = new Date();

            if (end - start > 100) {
              // Thời gian tăng bất thường => DevTools mở
              while (true) {
                console.clear();
              }
            }
          })();

          function decodeString(encodedStr) {
            try {
              return decodeURIComponent(atob(encodedStr));
            } catch (error) {
              return null;
            }
          }

          self.addEventListener("install", (event) => {
            event.waitUntil(
              caches.open(decodeString(`dGV0LWNhY2hlLXYx`)).then((cache) => {
                if (!cache) return;
                const urlsToCache = [
                  "/tet/",
                  "/tet/manifest.json",
                  "/tet/app.css",
                  "/tet/app-hash.js",
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
            if (!event.request.url.startsWith(self.location.origin)) return;

            event.respondWith(
              caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                  return cachedResponse; // Trả về từ cache nếu có
                }

                return fetch(event.request).then((fetchResponse) => {
                  if (!fetchResponse.ok) {
                  }

                  if (fetchResponse.status === 206) {
                    return fetchResponse;
                  }

                  return caches
                    .open(decodeString(`dGV0LWNhY2hlLXYx`))
                    .then((cache) => {
                      cache.put(event.request, fetchResponse.clone());
                      return fetchResponse;
                    });
                });
              })
            );
          });
          //kết thúc
        })();
      })();
    })();
  })();
})();
