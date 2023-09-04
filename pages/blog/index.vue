<template>
  <div>
    <si-SearchPost></si-SearchPost>

    <sections-blog />
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
