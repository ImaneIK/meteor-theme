<template>
  <div v-if="$settings.sections.home.blog.active" class="mx-8 lg:mx-24 my-24 overflow-hidden">
    
    <!-- heading -->
    <div class="flex flex-col gap-4 md:flex-row  md:justify-between  items-center">
        <div class="flex flex-col justify-items-center lg:justify-start">
              <h1 class="text-2xl font-normal text-gray-800 lg:text-3xl">
                {{$settings.sections.home.blog.title}}
              </h1>

              <div class="mt-2 mx-auto md:mx-0">
                <span class="inline-block w-40 h-1 bg-amber-500 rounded-full"></span>
                <span class="inline-block w-3 h-1 ml-1 bg-amber-500 rounded-full"></span>
                <span class="inline-block w-1 h-1 ml-1 bg-amber-500 rounded-full"></span>
              </div>
        </div>
        <nuxt-link :to="`/blog`" class="text-sm text-amber-500 underline decoration-amber-500 p-2 ">
        {{$settings.sections.buttons.explore.text}}
        </nuxt-link>
    </div>

        <!-- the articles grid -->
        <div v-if="posts.length > 0" class="flex flex-no-wrap overflow-x-scroll scrolling-touch lg:overflow-x-auto lg:scrolling-auto md:grid md:grid-cols-3 gap-4 my-8">
        <nuxt-link :to="`/posts/${post.slug}`" v-for="post in posts"
              :key="post.id" class="relative shadow-md rounded-md flex-shrink-0 w-full lg:w-auto m-2" >
                   
                    <nuxt-link class="block"  :to="`/posts/${post.slug}`">
                      <nuxt-img v-if="post.image"
                        class="block rounded-t-lg w-full"
                        :src="post.image.url"
                        alt=""
                      />
                    </nuxt-link>

                    <div class="p-5">
                        <!-- <div class="py-1"  v-if="post.categories && post.categories.length > 0"
                            v-for="(category) in post.categories">
                          <nuxt-link :to="category.slug">
                            <span class=" text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-amber-600 bg-amber-200 uppercase last:mr-0 mr-1">#{{ category.name }}</span>
                          </nuxt-link>
                        </div> -->
                        <h5
                          class="text-gray-900 text-md mb-2"
                        >
                        {{post.title}}
                        </h5>
                      <p class="font-normal text-xs text-gray-700 mb-3 dark:text-gray-400">
                        {{ post.excerpt }}  
                      </p>
                      <nuxt-link
                        :to="`/posts/${post.slug}`"
                        class="bg-amber-600 text-white focus:ring-4 font-light rounded-lg text-xs px-3 py-2 text-center inline-flex items-center"
                      >
                       {{$settings.sections.buttons.readmore.text}} 
                        <svg
                          class="fill-white -mr-1 ml-2 h-3 w-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </nuxt-link>
                    </div>
                </nuxt-link>
      </div>

      <div v-else class="my-6 h-72 flex justify-center text-center items-center bg-gray-200">
      <p>No articles found</p>
    </div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      loading: true,
      // isMobile: false,
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
        // console.log(this.$settings.header.menu);
      }
      this.loading = false;
    },
  },

  computed: {
    // isMobile() {
    //   this.isMobile = window.innerWidth < 768;
    //   console.log(this.isMobile);
    // },
  },
};
</script>

<style scoped></style>
