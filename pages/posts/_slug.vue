<template>
  <div  class="">
    <si-SearchPost v-if="$settings.sections.post.banner.background.active"
        :image="$settings.sections.post.banner.background.image"
        :title="$settings.sections.post.banner.title"
        :searchbar="$settings.sections.post.banner.searchbar.active"
        :placeholder="$settings.sections.post.banner.searchbar.placeholder"
    />

    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-loader />
    </div>

    <div v-if="!loading " class="flex flex-col-reverse lg:flex-row justify-between mx-2  lg:mx-12 divide-x">
      

      <!-- left Column - Additional Information Blocks -->
      <div class="w-full lg:w-1/3  divide-y px-4">
        <!-- About Page Block -->
        <div  class="lg:m-8 bg-neutral-100 p-8 text-center">
          <h2 v-if="$settings.sections.post.blocks.about.active" class="text-xl font-semibold mb-2">
          {{$settings.sections.post.blocks.about.title}}
          </h2>
          <nuxt-img v-if="$settings.sections.header.logo" :src="$settings.sections.header.logo.src" />
          <p>
          {{$settings.sections.post.blocks.about.description}}
          </p>
          <nuxt-link
            to="/about"
            class="block m-4 bg-black text-white text-xs p-2 rounded-md mt-2"
          >
            
            {{$settings.sections.post.blocks.about.button}}
          </nuxt-link>
        </div>

        <!-- related articles -->
        <sections-RelatedPosts v-if="$settings.sections.post.blocks.related.active" />

        <!-- Social Media Links Block -->
        <div v-if="$settings.sections.post.blocks.social.active" class="p-8 text-center items-center">
          <h2 class="text-xl font-semibold mb-4">
          {{ $settings.sections.post.blocks.social.title }}
          </h2>
       
          <template v-if="$settings.sections.social">
      <ul v-if="$settings.sections.post.blocks.social.active && $settings.sections.social.item !== null" class="mx-auto justify-center flex gap-4 items-center text-sm font-medium text-black sm:mb-0 lg:mx-12">
        <li v-for="link in $settings.sections.social.item" class="items-center">
          <nuxt-link :to="link.url" class="mr-4 fill-black hover:underline md:mr-6 " v-html="link.icon"></nuxt-link>
        </li>
      </ul>
    </template>
    <template v-else>
      <!-- You can place a loader or placeholder content here -->
      <p>Add your social media here</p>
    </template>
        </div>

      </div>

      <!-- right Column - post Content -->
      <div class="w-full lg:w-2/3 p-8 w-full">
        <!-- post Title -->
        <h1 class="text-3xl font-semibold text-center mb-2">
        <!-- {{ post.title }} -->
        </h1>

        <!-- Date -->
        <div class="text-center text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>
          {{ formatDate(post.createdAt) }}
        </div>
        <!-- post Image -->
        <nuxt-img v-if="post.image.url" class="mx-auto mb-4" :src="post.image.url" :alt="post.title" />

        <!-- post Content -->
        <div v-if="expanded" class="text-center">
          <p v-html="post.content" class="text-md font-light text-justify"></p>
        </div>
        <div v-else class="flex flex-col justify-center">
          <p v-html="limitedContent" class="text-md font-light text-justify"></p>
          <button @click="expandContent" class="text-xs text-white bg-amber-600 p-2 rounded-md cursor-pointer my-4 mx-auto" >
            {{$settings.sections.buttons.readmore.text}}
          </button>
        </div>
      </div>
    </div>
    

    <sections-blog v-if="$settings.sections.post.blogSection.active" />
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
      const maxLength = 200;
      return this.post.content.slice(0, maxLength) + "...";
    },
  },

  methods: {
    expandContent() {
      this.expanded = true;
      localStorage.setItem("expandedContent", true);
    },

    formatDate(timestamp) {
    const date = new Date(timestamp);
    // Use the toLocaleDateString method with appropriate options to format the date
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
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
