import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _239ba8ba = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _02b22aeb = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _8fe839d2 = () => interopDefault(import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _793c558d = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _b261e6ae = () => interopDefault(import('..\\pages\\categories\\_slug.vue' /* webpackChunkName: "pages/categories/_slug" */))
const _36e59eaa = () => interopDefault(import('..\\pages\\collections\\_slug.vue' /* webpackChunkName: "pages/collections/_slug" */))
const _7ad7e76c = () => interopDefault(import('..\\pages\\posts\\_slug.vue' /* webpackChunkName: "pages/posts/_slug" */))
const _a7ccb110 = () => interopDefault(import('..\\pages\\spaces\\_slug.vue' /* webpackChunkName: "pages/spaces/_slug" */))

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
    component: _239ba8ba,
    name: "about"
  }, {
    path: "/blog",
    component: _02b22aeb,
    name: "blog"
  }, {
    path: "/shop",
    component: _8fe839d2,
    name: "shop"
  }, {
    path: "/",
    component: _793c558d,
    name: "index"
  }, {
    path: "/categories/:slug?",
    component: _b261e6ae,
    name: "categories-slug"
  }, {
    path: "/collections/:slug?",
    component: _36e59eaa,
    name: "collections-slug"
  }, {
    path: "/posts/:slug?",
    component: _7ad7e76c,
    name: "posts-slug"
  }, {
    path: "/spaces/:slug?",
    component: _a7ccb110,
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
