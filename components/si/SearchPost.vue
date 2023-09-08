<template>

  <!-- background image -->
  <div
    class="mt-12 object-center relative w-screen px-12 py-12 bg-cover bg-center"
    :style="
     ` background-image: url('${$settings.header.banner.blog.src}');`
    "
  >
    <!-- dark filter -->
    <div class="absolute inset-0 bg-black opacity-50"></div>


    <!-- content -->
    <div class="flex flex-col items-center gap-4">

      <!-- titling -->
      <div class="text-3xl my-4 mx-auto text-center w-full opacity-75 text-white">
        {{$settings.sections.posts.title}}
      </div>

      <!-- search article -->
      <div class="px-8 flex flex-col mx-2 lg:mx-12 lg:w-1/2 inset-0 flex items-center">
            <div
              class="bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center gap-5 w-full"
            >
              <svg class="m-2 fill-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg> 

              <input
                v-model.trim="searchQuery"
                type="search"
                id="post"
                @input="handleInput"
                @keypress="search"
                class="relative w-full text-white placeholder-gray-400 border-none bg-transparent focus:outline-none focus:border-transparent"
                :placeholder= $settings.sections.header.searchbar.placeholder
                
              />

            </div>
            <ul
              v-if="showAutocomplete"
              class="bg-white border divide-y w-full mt-2"
            >
              <li
                v-for="(result, index) in posts"
                :key="result"
                class="bg-gray-100 pl-8 pr-2 py-1 relative cursor-pointer hover:bg-gray-200 hover:text-gray-900"
              >
                <svg
                  class="absolute w-4 h-4 left-2 top-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <nuxt-link :to="`/posts/${postSlug[index]}`">{{ result }}</nuxt-link>
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
      loading: true,
      post: null,
      posts: [],
      expanded: false,
      searchQuery: "",
      showAutocomplete: false,
      postSlug: [],
    };
  },

  methods: {
    async search() {
      if (!this.searchQuery) {
        this.posts = [];
        return;
      }

      try {
        const { data } = await this.$storeino.pages.search({ type: "POST" });
        const searchQueryLower = this.searchQuery.toLowerCase().trim();

        const filteredTitles = data.results
          .filter((post) =>
            post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
          .map((post) => post.title);
        this.posts = filteredTitles;

        const filteredSlugs = data.results
          .filter((post) =>
            post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
          .map((post) => post.slug);
        this.postSlug = filteredSlugs;

        console.log(filteredSlugs);
      } catch (e) {
        // Handle error
        console.error("Error searching posts:", e);
      }
    },

    handleInput() {
      this.showAutocomplete = true;
    },
  },
};
</script>

<style>
.search-bar {
  background-color: rgba(255, 255, 255, 0.1);
}

.autocomplete ul {
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  border: 1px solid #ccc;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
}

.autocomplete li {
  padding: 10px;
  cursor: pointer;
}
</style>
