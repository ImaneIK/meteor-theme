import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f623d550 = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _7130b28d = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _268a6ab9 = () => interopDefault(import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _2c99beaf = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _bc845a6a = () => interopDefault(import('..\\pages\\categories\\_slug.vue' /* webpackChunkName: "pages/categories/_slug" */))
const _cc60c670 = () => interopDefault(import('..\\pages\\collections\\_slug.vue' /* webpackChunkName: "pages/collections/_slug" */))
const _47ab57ec = () => interopDefault(import('..\\pages\\posts\\_slug.vue' /* webpackChunkName: "pages/posts/_slug" */))
const _7514ce9a = () => interopDefault(import('..\\pages\\spaces\\_slug.vue' /* webpackChunkName: "pages/spaces/_slug" */))

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
    component: _f623d550,
    name: "about"
  }, {
    path: "/blog",
    component: _7130b28d,
    name: "blog"
  }, {
    path: "/shop",
    component: _268a6ab9,
    name: "shop"
  }, {
    path: "/",
    component: _2c99beaf,
    name: "index"
  }, {
    path: "/categories/:slug?",
    component: _bc845a6a,
    name: "categories-slug"
  }, {
    path: "/collections/:slug?",
    component: _cc60c670,
    name: "collections-slug"
  }, {
    path: "/posts/:slug?",
    component: _47ab57ec,
    name: "posts-slug"
  }, {
    path: "/spaces/:slug?",
    component: _7514ce9a,
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
