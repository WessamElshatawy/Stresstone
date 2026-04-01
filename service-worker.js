self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("stresstone").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "app.js",
        "audio.js",
        "quiz.js",
        "recorder.js",
        "dictionary.js"
      ]);
    })
  );
});
