export { default as SectionsApplication } from '../..\\components\\sections\\Application.vue'
export { default as SectionsBanner } from '../..\\components\\sections\\Banner.vue'
export { default as SectionsBlog } from '../..\\components\\sections\\Blog.vue'
export { default as SectionsCollections } from '../..\\components\\sections\\Collections.vue'
export { default as SectionsFaq } from '../..\\components\\sections\\Faq.vue'
export { default as SectionsFeatures } from '../..\\components\\sections\\Features.vue'
export { default as SectionsFetch } from '../..\\components\\sections\\Fetch.vue'
export { default as SectionsFooter } from '../..\\components\\sections\\Footer.vue'
export { default as SectionsHeader } from '../..\\components\\sections\\Header.vue'
export { default as SectionsNavbar } from '../..\\components\\sections\\Navbar.vue'
export { default as SectionsRelatedPosts } from '../..\\components\\sections\\RelatedPosts.vue'
export { default as SectionsSettings } from '../..\\components\\sections\\Settings.vue'
export { default as SectionsSpaces } from '../..\\components\\sections\\Spaces.vue'
export { default as SectionsTest } from '../..\\components\\sections\\Test.vue'
export { default as SiAppLoader } from '../..\\components\\si\\AppLoader.vue'
export { default as SiCarousel } from '../..\\components\\si\\carousel.vue'
export { default as SiCollection } from '../..\\components\\si\\collection.vue'
export { default as SiLoader } from '../..\\components\\si\\Loader.vue'
export { default as SiSearchBar } from '../..\\components\\si\\SearchBar.vue'
export { default as SiStatisticBlock } from '../..\\components\\si\\StatisticBlock.vue'
export { default as SiVariantes } from '../..\\components\\si\\Variantes.vue'

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
