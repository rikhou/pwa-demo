if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (err) {
        console.warn("ServiceWorker registration failed: ", err);
      });
  });

  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
  });

  document
    .getElementById("addToHomeScreen")
    .addEventListener("click", function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
      }
    });
}
