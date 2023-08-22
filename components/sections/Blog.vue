<template>
  <div class="mx-12 my-24">
    <div class="font-semibold mb-12">
      <h1 class="text-sm">
        <span class="text-orange-600 tracking-wide">BLOG NEWS</span>
      </h1>
      <p class="pt-6 text-4xl font-normal w-full md:w-full">
        Latest Articles From METEOR
      </p>
    </div>


    <div class="flex flex-col lg:flex-row justify-center">

    
      <article 
      v-for="post in posts"
        :key="post.id"
      class="relative m-2 overflow-hidden rounded-md shadow transition hover:shadow-lg">
      <nuxt-link :to="`/posts/${post.slug}`">
      <img
        alt="Office"
        :src="post.image.url"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="relative h-full bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64"
      >
        <div class="p-4 sm:p-6"  v-if="post.categories && post.categories.length > 0"
            v-for="(category, categoryIndex) in post.categories">
          <nuxt-link :to="category.slug">
          <p class="block text-xs text-white/90">
            {{ category.name }}
          </p>
        </nuxt-link>
          <nuxt-link :to="`/posts/${post.slug}`">
            <h3 class="mt-0.5 text-lg text-white">
              {{post.title}}
            </h3>
          </nuxt-link>

          <p class="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
            {{ post.excerpt }}  
          </p>
        </div>
      </div>
    </nuxt-link>
    </article>
    
     
    </div>
   
  </div>
</template>
<style>
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 3 columns */
  grid-template-rows: repeat(2, auto);
  /* 2 rows */
  gap: 20px;
  /* Adjust the gap between blogs as needed */
}
</style>
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

<style scoped></style>
