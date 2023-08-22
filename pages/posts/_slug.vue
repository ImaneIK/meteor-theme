<template>
  <div class="pt-24">
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-loader />
    </div>

    <div v-if="!loading" class="flex justify-between mx-16">
      <!-- Left Column - post Content -->
      <div class="w-3/4 p-8">
        <!-- post Image -->
        <img class="mx-auto mb-4" :src="post.image.url" :alt="post.title" />

        <!-- Category -->
        <div class="text-center text-gray-500 mb-2">{{ post.categories[0].name }}</div>

        <!-- post Title -->
        <h1 class="text-3xl font-semibold text-center mb-2">{{ post.title }}</h1>

        <!-- Author and Date -->
        <div class="text-center text-gray-400 mb-4">
          By someone | meteor team | 20 Jul 2023
        </div>

        <!-- post Content -->
        <div v-if="expanded" class="text-center">
          <p v-html="post.content" class="text-md font-light text-justify"></p>
        </div>
        <div v-else class="flex flex-col justify-center">
          <p v-html="limitedContent" class="text-md font-light text-justify"></p>
          <button
            @click="expandContent"
            class="text-xs text-white bg-amber-600 p-2 rounded-md cursor-pointer my-4 mx-auto"
          >
            Read More
          </button>
        </div>
      </div>

      <!-- ############################################################################# -->

      <!-- Right Column - Additional Information Blocks -->
      <div class="w-1/4 py-8 divide-x">
        <sections-RelatedPosts />

        <!-- ############################################################################# -->

        <!-- Categories Block -->
        <div class="mb-8 bg-white text-center p-2 shadow-md rounded-md">
          <h2 class="text-xl font-semibold mb-4 p-2">Categories</h2>

          <sections-test />

          <!-- <div :style="`background-image: url(${post.image.url}); filter: brightness(0.8);`" class="bg-cover bg-center bg-no-repeat p-8 m-2 rounded-md">
              <NuxtLink to="#" class="text-white font-normal text-xs hover:underline">WORKER</NuxtLink>
            </div>
            <div :style="`background-image: url(${post.image.url}); filter: brightness(0.8);`" class="bg-cover bg-center bg-no-repeat p-8 m-2 rounded-md">
              <NuxtLink to="#" class="text-white font-normal text-xs hover:underline">WORKER</NuxtLink>
            </div>
            <div :style="`background-image: url(${post.image.url}); filter: brightness(0.8);`" class="bg-cover bg-center bg-no-repeat p-8 m-2 rounded-md">
              <NuxtLink to="#" class="text-white font-normal text-xs hover:underline">WORKER</NuxtLink>
            </div> -->

          <!-- <ul>
              <li v-for="category in categories" :key="category.id" class="mb-2">
               
               
                <NuxtLink :to="`/category/${category.slug}`" class="text-blue-600 hover:underline">{{ category.name }}
                </NuxtLink>
              </li>
            </ul> -->
        </div>

        <!-- ############################################################################# -->

        <!-- About Page Block -->
        <div class="mb-8 bg-neutral-200 p-8 text-center rounded-md shadow-md">
          <h2 class="text-xl font-semibold mb-2">About Us</h2>
          <img :src="$settings.header.logo.src" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button class="bg-black text-white text-xs p-2 rounded-md mt-2">
            Show more
          </button>
        </div>

        <!-- ############################################################################# -->

        <!-- Social Media Links Block -->
        <div class="mb-8 bg-white text-center p-2 shadow-md rounded-md items-center">
          <h2 class="text-xl font-semibold mb-4">Follow Us</h2>
          <div class="flex space-x-4 flex justify-center">
            <a href="#" class="block text-amber-600 hover:text-amber-800">
              <fa :icon="['fab', 'facebook']" class="text-2xl" />
            </a>
            <a href="#" class="block text-amber-600 hover:text-amber-800">
              <fa :icon="['fab', 'twitter']" class="text-2xl" />
            </a>
            <a href="#" class="block text-amber-600 hover:text-amber-800">
              <fa :icon="['fab', 'instagram']" class="text-2xl" />
            </a>
          </div>
        </div>
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
      post: null,
      posts: [],
      expanded: false,
    };
  },

  async fetch() {
    this.loading = true;

    const { slug } = this.$route.params;
    try {
      const { data } = await this.$storeino.pages.get({ slug });
      this.post = data;
      this.loading = false;
    } catch (e) {
      // Redirect to error page if post not exists
      this.$nuxt.error({ statusCode: 404, message: "post_not_found" });
    }
  },

  computed: {
    limitedContent() {
      const maxLength = 600;
      return this.post.content.slice(0, maxLength) + "...";
    },
  },

  methods: {
    expandContent() {
      this.expanded = true;
      localStorage.setItem("expandedContent", true);
    },
  },
  mounted() {
    const expandedContent = localStorage.getItem("expandedContent");
    if (expandedContent === "true") {
      this.expanded = true;
    }
  },
};
</script>
