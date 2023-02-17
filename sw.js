const cacheName = 'vacache'
const filesToCache = [
  './', /* == index.html */
  'index.html',
  'styles/main.css',
  'scripts/main.js',
  'assets/icons/icons.png',
]

self.addEventListener('install', asynsc e => {
  const cache = await caches.open(cacheName)    // waiting for file open
  await cache.addAll(filesToCache)    // writing to file
  console.log('Installed service worker successfully!')
  return self.skipWaiting()
})

self.addEventListener('activate', async e => {
  const a = await self.caches.keys();
  const 
  ... TODO ...
  return self.clients.claim()    // associates sw w/ site
})

self.addEventListener('fetch', async e => { // intercept file fetch requests
  const req = e.request
  const url = new URL(req.url)

  // if files came from the same place (TODO: idc):
  if (url.origin === location.origin) e.respondWith(cacheFirst(req)) // try fetching from cache
  else e.respondWith(networkAndCache(req))  // fetch over network + update cache
})

async function cacheFirst(req) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(req)  // cached files matching req

  // if cached is null (e.g. missing), load over network instead:
  if (cached == null) console.log('Failed to retrieve ' + req.url + ' from cache')
  else console.log('Fetching ' + req.url + ' from cache')
  return cached || fetch(req)
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName)
  try { // try updating cache
    const fresh = await fetch(req)
    await cache.put(req, fresh.clone())
    console.log('Fetching ' + req.url + ' over network')
    return fresh
  } catch (e) { // otherwise use old cache
    const cached = await cache.match(req)
    console.log('Fetching ' + req.url + ' over network failed. Defaulting to older cache')
    return cached
  }
}