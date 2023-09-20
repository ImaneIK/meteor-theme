<template>
    <div class="container overflow-hidden mx-auto">
      <div class="flex flex-no-wrap overflow-x-scroll snap-x scrolling-touch py-2">
        <nuxt-img  v-for="(item,i) in items" :key='i' :src="`${item.src}`" class="snap-center mx-2 lg:h-80" />
      </div>
    </div>
  </template>
  <script>
  export default {
      props: {
          title: { type: String, default: '' },
          list: { type: Array, default: [] },
          component: { type: String, default: null },
          itemClass: { type: String, default: " " },
      },
    data() {
      return {
        loading: true,
        items: this.list,
      }
    },
  };
  </script>