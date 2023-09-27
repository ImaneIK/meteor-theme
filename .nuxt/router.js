import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _bde12dca = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _1f845a6a = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _5643dad4 = () => interopDefault(import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _3a8faf67 = () => interopDefault(import('..\\pages\\wishlist\\index.vue' /* webpackChunkName: "pages/wishlist/index" */))
const _25685f68 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _49c5d24b = () => interopDefault(import('..\\pages\\collections\\_slug.vue' /* webpackChunkName: "pages/collections/_slug" */))
const _0f68b066 = () => interopDefault(import('..\\pages\\posts\\_slug.vue' /* webpackChunkName: "pages/posts/_slug" */))
const _45c41992 = () => interopDefault(import('..\\pages\\spaces\\_slug.vue' /* webpackChunkName: "pages/spaces/_slug" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _bde12dca,
    name: "about"
  }, {
    path: "/blog",
    component: _1f845a6a,
    name: "blog"
  }, {
    path: "/shop",
    component: _5643dad4,
    name: "shop"
  }, {
    path: "/wishlist",
    component: _3a8faf67,
    name: "wishlist"
  }, {
    path: "/",
    component: _25685f68,
    name: "index"
  }, {
    path: "/collections/:slug?",
    component: _49c5d24b,
    name: "collections-slug"
  }, {
    path: "/posts/:slug?",
    component: _0f68b066,
    name: "posts-slug"
  }, {
    path: "/spaces/:slug?",
    component: _45c41992,
    name: "spaces-slug"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
