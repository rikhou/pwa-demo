const cacheName = "precache";
const filesToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/assets/images/icons/icon_144x144.png",
  "/assets/images/icons/pwa.png",
  "/swRegistration.js",
  "/manifest.json",
];

self.addEventListener("install", function (e) {
  console.log("SW Install");
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("SW precaching");
      // precache
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("SW Activate");
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== cacheName) {
            console.log("SW Removing old cache", key);
            // remove old cache
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function (e) {
  console.log("SW Fetch", e.request.url);
  // get cache
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
