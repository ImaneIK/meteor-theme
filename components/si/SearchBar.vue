<template>
  <div
    class="flex-col shadow-md rounded-md search-bar flex justify-center items-center gap-4 p-5 w-full xl:flex-row"
  >

  <!-- from /to date range fields -->
  <div id="date-picker" class="flex flex-col md:flex-row justify-center gap-4 w-full ">
    <div
      class="search-field bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center w-full"
    >
      <label for="from-date" class="text-white ">{{$settings.header.searchbar.fromdate.label}}:</label>
      <input
        type="date"
        id="from-date"
        @change="updateDateRange"
        class="w-full  text-white border-none p-2 rounded bg-transparent focus:ring-2 focus:ring-amber-400 "
      />
    </div>

    <div
      class="search-field bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center w-full"
    >
      <label for="from-date" class="text-white">{{$settings.header.searchbar.todate.label}}:</label>
      <input
        type="date"
        id="to-date"
        @change="updateDateRange"
        class="w-full  text-white border-none p-2 rounded bg-transparent focus:ring-2 focus:ring-amber-400"
      />
    </div>
  </div>
   

   <!-- collection selection -->
  <div class="flex flex-col md:flex-row justify-center gap-4 w-full ">
    <div
      class="search-field bg-white bg-opacity-30 backdrop-blur rounded-lg p-2 flex items-center w-full"
    >
      <!-- <label for="location" class="text-white">{{$settings.header.searchbar.location.label}}:</label> -->
      <select
        v-model="selectedLocation"
        class="w-full text-white border-none p-2 rounded bg-transparent focus:ring-amber-400"
      >
      <option class="text-white text-xs bg-black" value="">{{$settings.header.searchbar.location.label}}</option>

        <option
          class="text-white text-xs bg-black"
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
      <!-- <label for="category" class="text-white">{{$settings.header.searchbar.category.label}}:</label> -->
      <select
        v-model="selectedCategory"
        class="w-full text-white border-none p-2 rounded bg-transparent focus:ring-amber-400"
      >
        <option class="text-white text-xs bg-black" value="">{{$settings.header.searchbar.category.label}}</option>
        <option
          class="text-white text-xs bg-black"
          v-for="collection in collections"
          :key="collection.slug"
          :value="collection.slug"
        >
          {{ collection.name }}
        </option>
      </select>
    </div>
  </div>


    <nuxt-link  :to="generateSearchLink" class="w-full text-center">
      <button
        @click="search"
        class=" bg-amber-500 bg-opacity-70 text-white px-4 py-4 rounded hover:bg-opacity-80 backdrop-blur  w-full"
      >
      <svg class="mx-auto fill-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>      </button>
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



    updateDateRange() {
      const fromDateInput = this.$el.querySelector("#from-date");
      const toDateInput = this.$el.querySelector("#to-date");

      const fromDate = new Date(fromDateInput.value);
      const toDate = new Date(toDateInput.value);

      if (!isNaN(fromDate) && !isNaN(toDate)) {
        const timeDiff = toDate - fromDate;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24) + 1;

        console.log("From Date:", fromDate);
        console.log("To Date:", toDate);
        console.log("Number of days:", daysDiff);
      }
    },


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
      this.$emit("search-submit");
    },
  },
};


</script>

<style>
.search-bar {
  background-color: rgba(255, 255, 255, 0.1);
}


</style>
