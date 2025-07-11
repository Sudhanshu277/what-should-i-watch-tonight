
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/search"
  },
  {
    "renderMode": 1,
    "route": "/movie/*"
  },
  {
    "renderMode": 2,
    "route": "/watchlist"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5374, hash: '553ce68cf1a5c7e7152789f0d68e9be2d6f87ec37aba564c86ee8f581cca4829', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1347, hash: '64444104b6f381f74e590be5cc1519009bfeac8abd8f9fe282e405b034f74b95', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'search/index.html': {size: 31523, hash: 'b5cb8fe9e2db5eda4f87a3ac2424d49429c64b367da501c90f1d99bec67b9d1a', text: () => import('./assets-chunks/search_index_html.mjs').then(m => m.default)},
    'watchlist/index.html': {size: 29874, hash: 'e0e27092405c704d77526e9e68da5683fff306f85f7994ada3505085a7c91a6c', text: () => import('./assets-chunks/watchlist_index_html.mjs').then(m => m.default)},
    'index.html': {size: 67201, hash: '7743a79447c7b3d3da2a4a4105ec991b670910b8586fbf262e865c63159666d1', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-LUQ2EOK6.css': {size: 231668, hash: '4TeFcYEoGQM', text: () => import('./assets-chunks/styles-LUQ2EOK6_css.mjs').then(m => m.default)}
  },
};
