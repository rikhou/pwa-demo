const cacheName = "precache";
const dataCacheName = "data-v1";

const filesToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/assets/images/icons/icon_144x144.png",
  "/assets/images/icons/pwa.png",
  "/index.js",
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
          if (key !== cacheName && key !== dataCacheName) {
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
  const dataUrl = "/mockData/";
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function (cache) {
        return fetch(e.request)
          .then(function (response) {
            cache.put(e.request.url, response.clone());
            return response;
          })
          .catch(function () {
            return caches.match(e.request);
          });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  }
});
