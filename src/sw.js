/**
 * ECOM TI - Service Worker (PWA Offline-First) v2
 * Gerencia cache de shell e contingência offline para aplicação SPA.
 */

const CACHE_NAME = 'ecomti-cache-v2';
const PRECACHE_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/favicon.ico',
  '/placeholder.svg',
  '/robots.txt',
  '/assets/favicon.svg',
  '/assets/index-Cli4X1EU.css',
  '/assets/index-ecomti-v2.js'
];

// Instalação do Service Worker e pré-cache dos recursos essenciais
self.addEventListener('install', (event) => {
  console.log('[SW v2] Instalando nova versão...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_RESOURCES).catch((err) => {
          console.warn('[SW v2] Aviso ao pré-carregar recursos parciais:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  console.log('[SW v2] Ativando e limpando caches anteriores...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW v2] Excluindo cache antigo:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia de Fetch
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Navegação: Network-first com fallback para o cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match('/index.html') || await caches.match('/');
          return cachedResponse || new Response('<h1>Você está offline</h1>', {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        })
    );
    return;
  }

  // Assets estáticos
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/lovable-uploads/') ||
    /\.(css|js|svg|png|jpg|jpeg|webp|ico|woff2?)$/.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
