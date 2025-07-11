
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
    'index.csr.html': {size: 5374, hash: '68c0de1afff6ff99c03bca89798b734eb3655b795310c5fb091d88d720b120e4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1347, hash: 'c1367ce50070833ad5119ea840b9bbf753f2c5dde4a8baf51bba9fffaef66f3a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'watchlist/index.html': {size: 29874, hash: '6ec06c5d346d22531481b1dbea229714ad76b0b3f09493232995a5330f8ef8d2', text: () => import('./assets-chunks/watchlist_index_html.mjs').then(m => m.default)},
    'search/index.html': {size: 31523, hash: '325957f093a41463cf64f2015fa081527083bb226547c798169069097a3ec0bb', text: () => import('./assets-chunks/search_index_html.mjs').then(m => m.default)},
    'index.html': {size: 32308, hash: 'f90fab6c11039999f5ec437a51ee86d68dd1808c68532d338e210cf19df62c7d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-LUQ2EOK6.css': {size: 231668, hash: '4TeFcYEoGQM', text: () => import('./assets-chunks/styles-LUQ2EOK6_css.mjs').then(m => m.default)}
  },
};
