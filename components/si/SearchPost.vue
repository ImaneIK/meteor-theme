<template>
  <div
    class="mt-12 object-center relative w-screen p-24 bg-cover bg-center"
    style="
      background-image: url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdevx.work%2Fblog%2Fwp-content%2Fuploads%2F2021%2F03%2FLOUNGE-01-1920x1024.jpg&f=1&nofb=1&ipt=bc89ea53d39a8da6df1ca59ed5daba3155d44fa3627e5071448aecd5da8be808&ipo=images');
    "
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <div class="relative flex inset-0 flex items-center justify-center">
      <div
        class="flex-col shadow-md rounded-md search-bar flex justify-center items-center gap-10 p-5 lg:flex-row"
      >
        <div
          class="search-field bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center gap-5 w-full"
        >
          <input
            placeholder="Search posts..."
            v-model.trim="searchQuery"
            type="search"
            id="post"
            @input="handleInput"
            class="text-white border-none p-2 rounded bg-transparent focus:ring-2 focus:ring-amber-400 w-full"
          />
        </div>

        <button
          @click="search"
          class="bg-amber-500 bg-opacity-70 text-white px-4 py-2 rounded hover:bg-opacity-80 backdrop-blur w-full"
        >
          Search
        </button>
      </div>
      <div class="autocomplete">
        <ul v-if="showAutocomplete">
          <li v-for="(result, index) in posts" :key="result">
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
