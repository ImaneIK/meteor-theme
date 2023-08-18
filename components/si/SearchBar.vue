<template>
  <div
    class="flex-col shadow-md rounded-md search-bar  flex justify-center items-center gap-10 p-5 lg:flex-row"
  >
    <div
      class="search-field bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center gap-5 w-full"
    >
      <label for="from-date" class="text-white">From:</label>
      <input
        type="date"
        id="from-date"
        v-model="fromDate"
        class=" text-white border-none p-2 rounded bg-transparent focus:ring-2 focus:ring-amber-400 w-full"
      />
    </div>

    <div
      class="search-field bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center gap-5 w-full"
    >
      <label for="to-date" class="text-white">To:</label>
      <input
        type="date"
        id="to-date"
        v-model="toDate"
        class=" text-white border-none p-2 rounded bg-transparent focus:ring-2 focus:ring-amber-400 w-full"
      />
    </div>

    <div
      class="search-field bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center gap-5 w-full"
    >
      <label for="category" class="text-white">Category:</label>
      <select v-model="selectedCategory" class= "text-white border-none p-2 rounded bg-transparent focus:ring-2 focus:ring-amber-400"
      >
        <option class="text-black bg-gray-200" value="">All Categories</option>
        <option class="text-black bg-gray-200"
          v-for="collection in collections"
          :key="collection.slug"
          :value="collection.slug"
        >
          {{ collection.name }}
        </option>
      </select>
    </div>



    <nuxt-link :to="`/collections/${selectedCategory}`">
    
    <button 
      @click="search"
      class="bg-amber-500 bg-opacity-70 text-white px-4 py-2 rounded hover:bg-opacity-80 backdrop-blur w-full"
    >
    Search
    </button>
    
    </nuxt-link>



    <!-- Search results section -->
    <div v-if="filteredProducts.length > 0">
      <div v-for="product in filteredProducts" :key="product._id">
        {{ product.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "",
      filteredProducts: [],
      collections: [],
    };
  },

  async mounted() {
    this.collections = this.$settings.sections.collections;
  },

  methods: {
    async search() {
      const { data: productData } = await this.$storeino.products.search({
        status: "PUBLISH",
      });

      if (!this.selectedCategory) {
        // If no category is selected, show all products
        this.filteredProducts = productData.results;
      } else {
        // Filter products based on selected category
        this.filteredProducts = productData.results.filter((product) => {
          return product.collections.some(
            (category) => category.slug === this.selectedCategory
          );
        });
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
