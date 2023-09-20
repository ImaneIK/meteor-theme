export const SectionsAbout = () => import('../..\\components\\sections\\about.vue' /* webpackChunkName: "components/sections-about" */).then(c => wrapFunctional(c.default || c))
export const SectionsBanner = () => import('../..\\components\\sections\\Banner.vue' /* webpackChunkName: "components/sections-banner" */).then(c => wrapFunctional(c.default || c))
export const SectionsBlog = () => import('../..\\components\\sections\\Blog.vue' /* webpackChunkName: "components/sections-blog" */).then(c => wrapFunctional(c.default || c))
export const SectionsCategories = () => import('../..\\components\\sections\\Categories.vue' /* webpackChunkName: "components/sections-categories" */).then(c => wrapFunctional(c.default || c))
export const SectionsCollections = () => import('../..\\components\\sections\\Collections.vue' /* webpackChunkName: "components/sections-collections" */).then(c => wrapFunctional(c.default || c))
export const SectionsContact = () => import('../..\\components\\sections\\Contact.vue' /* webpackChunkName: "components/sections-contact" */).then(c => wrapFunctional(c.default || c))
export const SectionsFaq = () => import('../..\\components\\sections\\Faq.vue' /* webpackChunkName: "components/sections-faq" */).then(c => wrapFunctional(c.default || c))
export const SectionsFeatures = () => import('../..\\components\\sections\\Features.vue' /* webpackChunkName: "components/sections-features" */).then(c => wrapFunctional(c.default || c))
export const SectionsFooter = () => import('../..\\components\\sections\\Footer.vue' /* webpackChunkName: "components/sections-footer" */).then(c => wrapFunctional(c.default || c))
export const SectionsHeader = () => import('../..\\components\\sections\\Header.vue' /* webpackChunkName: "components/sections-header" */).then(c => wrapFunctional(c.default || c))
export const SectionsLocations = () => import('../..\\components\\sections\\Locations.vue' /* webpackChunkName: "components/sections-locations" */).then(c => wrapFunctional(c.default || c))
export const SectionsNavbar = () => import('../..\\components\\sections\\Navbar.vue' /* webpackChunkName: "components/sections-navbar" */).then(c => wrapFunctional(c.default || c))
export const SectionsRelatedPosts = () => import('../..\\components\\sections\\RelatedPosts.vue' /* webpackChunkName: "components/sections-related-posts" */).then(c => wrapFunctional(c.default || c))
export const SectionsReviews = () => import('../..\\components\\sections\\Reviews.vue' /* webpackChunkName: "components/sections-reviews" */).then(c => wrapFunctional(c.default || c))
export const SectionsSpaces = () => import('../..\\components\\sections\\Spaces.vue' /* webpackChunkName: "components/sections-spaces" */).then(c => wrapFunctional(c.default || c))
export const SectionsTeam = () => import('../..\\components\\sections\\Team.vue' /* webpackChunkName: "components/sections-team" */).then(c => wrapFunctional(c.default || c))
export const SiAppLoader = () => import('../..\\components\\si\\AppLoader.vue' /* webpackChunkName: "components/si-app-loader" */).then(c => wrapFunctional(c.default || c))
export const SiBottomDropDown = () => import('../..\\components\\si\\BottomDropDown.vue' /* webpackChunkName: "components/si-bottom-drop-down" */).then(c => wrapFunctional(c.default || c))
export const SiBottomNav = () => import('../..\\components\\si\\BottomNav.vue' /* webpackChunkName: "components/si-bottom-nav" */).then(c => wrapFunctional(c.default || c))
export const SiCarousel = () => import('../..\\components\\si\\carousel.vue' /* webpackChunkName: "components/si-carousel" */).then(c => wrapFunctional(c.default || c))
export const SiCollection = () => import('../..\\components\\si\\collection.vue' /* webpackChunkName: "components/si-collection" */).then(c => wrapFunctional(c.default || c))
export const SiFilters = () => import('../..\\components\\si\\Filters.vue' /* webpackChunkName: "components/si-filters" */).then(c => wrapFunctional(c.default || c))
export const SiFilterToggle = () => import('../..\\components\\si\\FilterToggle.vue' /* webpackChunkName: "components/si-filter-toggle" */).then(c => wrapFunctional(c.default || c))
export const SiGallery = () => import('../..\\components\\si\\Gallery.vue' /* webpackChunkName: "components/si-gallery" */).then(c => wrapFunctional(c.default || c))
export const SiImageTrack = () => import('../..\\components\\si\\ImageTrack.vue' /* webpackChunkName: "components/si-image-track" */).then(c => wrapFunctional(c.default || c))
export const SiLoader = () => import('../..\\components\\si\\Loader.vue' /* webpackChunkName: "components/si-loader" */).then(c => wrapFunctional(c.default || c))
export const SiPopup = () => import('../..\\components\\si\\Popup.vue' /* webpackChunkName: "components/si-popup" */).then(c => wrapFunctional(c.default || c))
export const SiProductCard = () => import('../..\\components\\si\\ProductCard.vue' /* webpackChunkName: "components/si-product-card" */).then(c => wrapFunctional(c.default || c))
export const SiProductPrice = () => import('../..\\components\\si\\ProductPrice.vue' /* webpackChunkName: "components/si-product-price" */).then(c => wrapFunctional(c.default || c))
export const SiProductQuantity = () => import('../..\\components\\si\\ProductQuantity.vue' /* webpackChunkName: "components/si-product-quantity" */).then(c => wrapFunctional(c.default || c))
export const SiProductVariantes = () => import('../..\\components\\si\\ProductVariantes.vue' /* webpackChunkName: "components/si-product-variantes" */).then(c => wrapFunctional(c.default || c))
export const SiSearchBar = () => import('../..\\components\\si\\SearchBar.vue' /* webpackChunkName: "components/si-search-bar" */).then(c => wrapFunctional(c.default || c))
export const SiSearchPost = () => import('../..\\components\\si\\SearchPost.vue' /* webpackChunkName: "components/si-search-post" */).then(c => wrapFunctional(c.default || c))
export const SiStatisticBlock = () => import('../..\\components\\si\\StatisticBlock.vue' /* webpackChunkName: "components/si-statistic-block" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
