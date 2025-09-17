//dando nome pro cache
const cacheName = "Jogo-da-velha-v1";
//instalando o servidor de service worker
self.addEventListener("install", (event) => {
  //esperando o cache abrir
  event.waitUntil(
    //abrindo o cache
    caches.open(cacheName).then((cache) => {
      //retornando o cache
      return cache.addAll([
        //colocando os arquivos que quero que sejam salvos no cache
        //lembra de começar com a barra "./"
        "./",
        "/index.html",
      "/style.css",
      "/index.js",
      "/appstore.png",
        "/playstore.png",
        "/sw.js",
        "/manifest.json",
      ]);
    })
  );
  
  return self.skipWaiting();
});

    self.addEventListener("activate", (event) => {
      self.clients.claim();
    });
     self.addEventListener("fetch", async (event) => {
      const req = event.request;
      const url = new URL(req.url);
      if(url.login === location.origin){
        event.respondWith(cacheFirst(req));
      }else {
        event.respondWith(networkAndCache(req));
      }
    })
    async function cacheFirst(req){
      //vai esperar o cache abrir dentro do console
      const cache = await caches.open(cacheName);
      //conferindo de o cache bate com a requisição
      const cached = await cache.match(req);}
      //retornando o cache o fetch
      return cached || fetch(req);

      async function networkAndCache(req){
        //abir o cache
        const cache = await caches.open(cacheName);
        try{
          const fresh = await fetch(req);
          //atualizando o cache
          cache.put(req, refresh.clone());
          return refresh;
        } catch (e) {
          const cached = await cache.match(req);
          return cached;
        }
      }
