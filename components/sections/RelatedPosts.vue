<template>
  <div class=" p-8">
    <div>
      <div v-if="loading" class="flex justify-center items-center h-full">
        <si-loader />
      </div>

      <div v-if="!loading">
        <h2 class="text-xl font-semibold mb-4 text-center ">{{$settings.sections.posts.relatedposts}}</h2>
        <ul v-for="post in posts">
          <li class="p-2">
            <NuxtLink :to="`/posts/${post.slug}`" class="text-xs text-left text-neutral-400 hover:underline"> > {{
              post.title
            }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // cards: [],
      loading: true,
      posts: [],
    };
  },

  async fetch() {
    this.loading = true;

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
