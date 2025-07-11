
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
    'index.csr.html': {size: 5374, hash: '97e67558e2840daae50a772534ac85706f8456005b221f06ce009038cf376781', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1347, hash: 'a74c4ed9a7fba18be3f1dd83f5d90869ce625c82a5fa61df8e8ff3d8c32ca905', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'search/index.html': {size: 31489, hash: 'adbde553c4c7c95b7c2533913e9cfaf203399052e732d607bb177fcc52884c54', text: () => import('./assets-chunks/search_index_html.mjs').then(m => m.default)},
    'watchlist/index.html': {size: 29874, hash: '4ef1041967aadc45e8672df94976aed9ed74a1b563b29973a7dd007807dc0a80', text: () => import('./assets-chunks/watchlist_index_html.mjs').then(m => m.default)},
    'index.html': {size: 67155, hash: '7390d670b26a48be5274a8b46f5607ee81a7710d0b3493a86909cc400507aa74', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-LUQ2EOK6.css': {size: 231668, hash: '4TeFcYEoGQM', text: () => import('./assets-chunks/styles-LUQ2EOK6_css.mjs').then(m => m.default)}
  },
};
