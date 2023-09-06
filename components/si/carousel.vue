<template>
    <div class="container overflow-hidden mx-auto">
      <div class="flex flex-no-wrap overflow-x-scroll scrolling-touch py-2">
        <img  v-for="item in items" :src="`${item.src}`" class="mx-2 lg:h-80" >
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