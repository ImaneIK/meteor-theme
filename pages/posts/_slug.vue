<template>
  <div  class="">
    <si-SearchPost v-if="$settings.sections.blogBanner.active"></si-SearchPost>

    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-loader />
    </div>

    <div v-if="!loading && $settings.sections.article.active" class="flex flex-col-reverse lg:flex-row justify-between mx-2  lg:mx-12 divide-x">
      

      <!-- left Column - Additional Information Blocks -->
      <div class="w-full lg:w-1/3  divide-y px-4">
        <!-- About Page Block -->
        <div v-if="$settings.sections.post.about.active" class="lg:m-8 bg-neutral-100 p-8 text-center">
          <h2 class="text-xl font-semibold mb-2">{{$settings.sections.about.heading}}</h2>
          <nuxt-img :src="$settings.header.logo.src" />
          <p>{{$settings.sections.about.excerpt}}</p>
          <nuxt-link
            to="/about"
            class="block m-4 bg-black text-white text-xs p-2 rounded-md mt-2"
          >
            {{$settings.sections.posts.button.text}}
          </nuxt-link>
        </div>

        <!-- related articles -->
        <sections-RelatedPosts v-if="$settings.sections.post.relatedarticles.active" />

        <!-- Social Media Links Block -->
        <div v-if="$settings.sections.post.socialmedia.active"  class="p-8 text-center items-center">
          <h2 class="text-xl font-semibold mb-4">{{ $settings.sections.posts.followus }}</h2>
          <ul class="mx-auto justify-center flex gap-4 items-center text-sm font-medium text-black sm:mb-0 lg:mx-12">
                <li v-for="link in $settings.social" class="items-center">
                    <nuxt-link :to= link.url class="mr-4 fill-black hover:underline md:mr-6 " v-html= link.icon></nuxt-link>
                </li>
            </ul>
        </div>

      </div>

      <!-- right Column - post Content -->
      <div class="w-full lg:w-2/3 p-8 w-full">
        <!-- post Title -->
        <h1 class="text-3xl font-semibold text-center mb-2">{{ post.title }}</h1>

        <!-- Date -->
        <div class="text-center text-gray-400 mb-4">
          
                {{$settings.sections.posts.createdat}}: {{ formatDate(post.createdAt) }}
        </div>
        <!-- post Image -->
        <nuxt-img class="mx-auto mb-4" :src="post.image.url" :alt="post.title" />

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
          {{$settings.sections.posts.button.text}}
          </button>
        </div>
      </div>
    </div>
    

    <sections-blog />
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
