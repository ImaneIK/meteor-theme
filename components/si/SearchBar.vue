<template>
  <div
    class="flex-col shadow-md rounded-md search-bar flex justify-center items-center gap-4 p-5 w-full xl:flex-row"
  >
  <div class="flex flex-col md:flex-row justify-center gap-4 w-full ">
    <div
      class="search-field bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center w-full"
    >
      <label for="from-date" class="text-white ">From:</label>
      <input
        type="date"
        id="from-date"
        class="text-white border-none p-2 rounded bg-transparent focus:ring-2 focus:ring-amber-400 "
      />
    </div>

    <div
      class="search-field bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center w-full"
    >
      <label for="from-date" class="text-white">To:</label>
      <input
        type="date"
        id="to-date"
        class="text-white border-none p-2 rounded bg-transparent focus:ring-2 focus:ring-amber-400"
      />
    </div>
  </div>
   
  <div class="flex flex-col md:flex-row justify-center gap-4 w-full ">
    <div
      class="search-field bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center w-full"
    >
      <label for="location" class="text-white">Location:</label>
      <select
        v-model="selectedLocation"
        class="text-white border-none p-2 rounded bg-transparent focus:ring-2 focus:ring-amber-400"
      >
        <option class="text-black bg-gray-200" value="">All Categories</option>
        <option
          class="text-black bg-gray-200"
          v-for="location in locations"
          :key="location.slug"
          :value="location.slug"
        >
          {{ location.name }}
        </option>
      </select>
    </div>

    <div
      class="search-field bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center w-full"
    >
      <label for="category" class="text-white">Category:</label>
      <select
        v-model="selectedCategory"
        class="text-white border-none p-2 rounded bg-transparent focus:ring-2 focus:ring-amber-400"
      >
        <option class="text-black bg-gray-200" value="">All Categories</option>
        <option
          class="text-black bg-gray-200"
          v-for="collection in collections"
          :key="collection.slug"
          :value="collection.slug"
        >
          {{ collection.name }}
        </option>
      </select>
    </div>
  </div>


    <nuxt-link :to="generateSearchLink" class="w-full text-center">
      <button
        @click="search"
        class=" bg-amber-500 bg-opacity-70 text-white px-4 py-4 rounded hover:bg-opacity-80 backdrop-blur  w-full"
      >
      <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>      </button>
    </nuxt-link>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "",
      selectedLocation: "",
      filteredProducts: [],
      collections: [],
      locations: [],
    };
  },

  async mounted() {
    this.collections = this.$settings.sections.collections;
    this.locations = this.$settings.sections.locations;
  },

  computed: {
    generateSearchLink() {
      if (this.selectedCategory && this.selectedLocation) {
        return `/collections/${this.selectedLocation}`;
      } else if (this.selectedCategory) {
        return `/collections/${this.selectedCategory}`;
      } else if (this.selectedLocation) {
        return `/collections/${this.selectedLocation}`;
      } else {
        return '/shop';
      }
    },
  },

  methods: {
    async search() {
      const { data: productData } = await this.$storeino.products.search({
        status: "PUBLISH",
      });

      if (!this.selectedLocation && !this.selectedCategory) {
        // If no category is selected, show all products
        this.filteredProducts = productData.results;
      } else {
        // Filter products based on selected category
        this.filteredProducts = productData.results.filter((product) => {
          return product.collections.some(
            (category) => category.slug === (this.selectedLocation || this.selectedCategory)
          );
        });
        console.log(this.filteredProducts)
      }
    },
  },
};
</script>

<style>
.search-bar {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
