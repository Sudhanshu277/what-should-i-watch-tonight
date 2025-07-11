
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
    'index.csr.html': {size: 5374, hash: '5a8ffc1e43e6d29eea962257b3373b05b5f902472dd5a768b31cbb737727378d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1347, hash: 'b8e0439d2e29d79b3536768e1a3cac9d087928a9172ed21573d64a596d03865d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'watchlist/index.html': {size: 30099, hash: '5d4d3d5b12772b3eefe0cd4908241ff400bde423cf21fe9ead386365c4a027d0', text: () => import('./assets-chunks/watchlist_index_html.mjs').then(m => m.default)},
    'search/index.html': {size: 31714, hash: '254265b45828a6cb49770a4b82660d35880898ccd194b67885365ece6dfcf202', text: () => import('./assets-chunks/search_index_html.mjs').then(m => m.default)},
    'index.html': {size: 32164, hash: '7f4c2d41fbfae5b843f096d6fc5d149585d48a088d2799182db1634d2bf09643', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-LUQ2EOK6.css': {size: 231668, hash: '4TeFcYEoGQM', text: () => import('./assets-chunks/styles-LUQ2EOK6_css.mjs').then(m => m.default)}
  },
};
