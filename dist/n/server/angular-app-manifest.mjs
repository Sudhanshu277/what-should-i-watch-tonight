
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
    'index.csr.html': {size: 5374, hash: 'd69fd0e845ce30cf3ab4d75867f3867654aa49de1e2d98961fa48b9703ccbb5f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1347, hash: '8964f4b1d6b9a15b768a7d5f1feedaac4537fc7fc668e0206c05bb71aa65a43e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'search/index.html': {size: 31489, hash: '2e88fd007a47c413c9e95e082381a2d575e013e9bddaf524b02eecf3d0df9940', text: () => import('./assets-chunks/search_index_html.mjs').then(m => m.default)},
    'watchlist/index.html': {size: 29874, hash: '5ab7b2098db7dc7591c44902c52775a5b901b4505fa7abbd9b5849e072de3437', text: () => import('./assets-chunks/watchlist_index_html.mjs').then(m => m.default)},
    'index.html': {size: 68258, hash: '205521c899570225a3f2daf034cc19ceb7c049d21103b0a22f70ff96c4fbba27', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-LUQ2EOK6.css': {size: 231668, hash: '4TeFcYEoGQM', text: () => import('./assets-chunks/styles-LUQ2EOK6_css.mjs').then(m => m.default)}
  },
};
