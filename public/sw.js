self.addEventListener("install", function (e) {
  console.log("SW Install");
});

self.addEventListener("activate", function (e) {
  console.log("SW Activate");
});

self.addEventListener("fetch", function (e) {
  console.log("SW Fetch", e.request.url);
});
