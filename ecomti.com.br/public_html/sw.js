/**
 * ECOM TI - Service Worker (PWA Offline-First)
 * Gerencia cache de shell e contingência offline para aplicação SPA.
 */

const CACHE_NAME = 'ecomti-cache-v1';
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
  '/assets/index-kzACFt43.js'
];

// Instalação do Service Worker e pré-cache dos recursos essenciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pré-carregando recursos críticos no cache');
        return cache.addAll(PRECACHE_RESOURCES).catch((err) => {
          console.warn('[SW] Aviso ao pré-carregar recursos parciais:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Removendo cache legado:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia de Fetch:
// 1. Navegação (HTML): Network-first com fallback para o cache (offline)
// 2. Recursos estáticos (assets, imagens, css, js): Cache-first / Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Apenas intercepta requisições HTTP/HTTPS no mesmo escopo
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Requisição de navegação principal (página HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Atualiza o cache da raiz se online
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Fallback offline para a página principal
          const cachedResponse = await caches.match('/index.html') || await caches.match('/');
          return cachedResponse || new Response('<h1>Você está offline</h1><p>Conecte-se à internet para acessar o site da ECOM TI.</p>', {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        })
    );
    return;
  }

  // Recursos estáticos (CSS, JS, imagens, fontes)
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/lovable-uploads/') ||
    /\.(css|js|svg|png|jpg|jpeg|webp|ico|woff2?)$/.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Busca em background para atualizar o cache (Stale-While-Revalidate)
          fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          }).catch(() => {/* Silencioso se offline */});
          return cachedResponse;
        }

        // Se não estiver em cache, busca na rede e guarda
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

  // Demais requisições: padrão de rede com fallback em cache
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
