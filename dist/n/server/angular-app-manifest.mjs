
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
    'index.csr.html': {size: 5374, hash: 'c0725ba6e31775f03c829104e28d47d11096d98edfe2c073402ba15737e188f4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1347, hash: 'a0648702ad658d440dfc534fb9db463c7a815e648ec397b197b436a1c0b64010', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'search/index.html': {size: 31707, hash: '66d78176dcf71eec3bf3a8dfa591ce895748854c848b412d225d01aa15c85f37', text: () => import('./assets-chunks/search_index_html.mjs').then(m => m.default)},
    'watchlist/index.html': {size: 30092, hash: '2ae3708a07665e84e123e270960b51da40b3e210fb2f62c1a823719c4b7bcc7d', text: () => import('./assets-chunks/watchlist_index_html.mjs').then(m => m.default)},
    'index.html': {size: 99790, hash: '81c0745972bbde103d34e2cef6c5af1b6016537f2cdab6df3ba0494241b5a20a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-LUQ2EOK6.css': {size: 231668, hash: '4TeFcYEoGQM', text: () => import('./assets-chunks/styles-LUQ2EOK6_css.mjs').then(m => m.default)}
  },
};
