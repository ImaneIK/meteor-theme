<template>
  <div  class="mb-8 text-center p-2 ">
    <h2 class="text-xl font-semibold mb-4 p-2">Categories</h2>
    <div v-for="category in posts.flatMap((post) => post.categories)" :key="category.id">
      <nuxt-link :to="`/categories/${category.slug}`">
        <div 
          class="p-2 text-xs text-neutral-400 hover:underline">
          {{ category.name }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      posts: [],
      loading: true,
    };
  },
  async fetch() {
    let filter = { status: "PUBLISH" };
    await this.getPosts(filter);
  },
  methods: {
    async getPosts(filter) {
      this.loading = true;
      try {
        const { data } = await this.$storeino.pages.search(filter);
        this.posts = data.results.slice(0, 3);
        // console.log(this.posts[0]);
      } catch (e) {
        console.log(this.$settings.header.menu);
      }
      this.loading = false;
    },
  },
};
</script>
