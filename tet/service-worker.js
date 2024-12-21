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
  startPeriodicSync();

});

// Listen for background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'send-notification') {
    
    event.waitUntil(
      handlerNotification()  // Function to send a notification
    );
  }
});

self.addEventListener("fetch", (event) => {
  event.repondWith(
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
const tetDate = new Date("2025-01-29T00:00:00+07:00");

function calculateTimeToTet() {
  const now = new Date();
  const timeDiff = tetDate - now; // Khoảng thời gian còn lại (ms)

  if (timeDiff <= 0) {
    return "Chúc mừng năm mới! 🎉";
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `Còn ${days > 0 && `${days} ngày`}  ${hours > 0 && `${hours} giờ`} ${
    minutes > 0 && `${minutes} phút`
  } ${seconds > 0 && `${seconds} giây`} nữa là đến Tết!`;
}
function handlerNotification() {
  if (Notification.permission === "granted") {
    const message = calculateTimeToTet();
    self.registration?.showNotification("Tết Nguyên Đán 2025 🎉🎉🎉", {
      body: message,
      icon: "icons/icon-48x48.png", // Đường dẫn tới icon của bạn
      tag: "tet-countdown",
    });
  } else {
    console.warn("Không có quyền thông báo.");
  }
}

// Function to start the periodic sync every 10 seconds
function startPeriodicSync() {
  // Register the sync event initially
  self.registration.sync.register('send-notification').then(() => {
    console.log('Sync event registered');
  });

  // Trigger a sync every 10 seconds
  setTimeout(() => {
    self.registration.sync.register('send-notification').then(() => {
      console.log('Sync event re-registered');
      startPeriodicSync();  // Re-register after the sync completes
    });
  }, 10000);  // 10 seconds
}
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  clients.openWindow("/tet"); // Mở trang chính khi người dùng nhấp vào thông báo
});
