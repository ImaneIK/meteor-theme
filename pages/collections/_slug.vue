<template>
  <div>
    <div v-if="$settings.sections.collection.banner.active" class="mt-12 object-center relative w-full px-6 sm:px-12  lg:px-24 py-12 bg-cover bg-center overflow-hidden" 
        :style="$settings.sections.collection.banner.background.active && $settings.sections.shop.banner.background.image ? ` background-image: url('${this.$settings.sections.shop.banner.background.image.src}');` : `background:grey;`" >
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative flex flex-col inset-0 flex items-center justify-center">
      <h1 class="text-sm lg:text-3xl m-8 w-full lg:w-1/2 opacity-75 text-center text-white ">
        {{ this.$settings.sections.collection.banner.content.title }}
      </h1>
      <si-SearchBar v-if="this.$settings.sections.collection.banner.content.searchbar.active" class="mx-12"  style="z-index: 1"/>
  </div>
</div>

    <!-- loader -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>

    <!-- the content -->
    <div
      v-if="!loading && filteredProducts != null"
      class="flex flex-col m-4 lg:my-8 lg:mx-16 divide-y"
    >
      <!-- toggle -->
      <si-FilterToggle :drawer="drawer"></si-FilterToggle>
      

      <!-- the route like heading -->
      <div class="flex justify-between py-4">
        <div  class="flex justify-start items-center w-full">
          <div class="flex flex-col lg:flex-row">
            <p class="text-xs font-light flex gap-2">
              <nuxt-link class="block" to="/"><svg class=" fill-gray-500" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg></nuxt-link> >
              <nuxt-link v-if="filteredProducts.length > 0" class="block" :to="`/collections/${
                item.locations ? item.locations.slug : item.collections.slug
              }`">{{
                item.locations ? item.locations.name : item.collections.name
              }}</nuxt-link>
            </p>
          </div>

        </div>

        <h2 class="block text-end w-full text-xs font-light">
          {{ filteredProducts.length }} 
          {{$settings.sections.collection.labels.itemsfound.text}}
        </h2>
      </div>

      <!-- list of spaces and the filters -->
      <div class="flex flex-row justify-center pt-8 gap-4">

        <!-- the filters -->
        <si-Filters
          :selectedFilters="selectedFilters"
          @apply-filters="applyFilters"
          @reset-filters="resetFilters"
          class="xl:w-2/5 xl:block hidden"
        ></si-Filters>

        <!-- the cards -->
        <div v-if="filteredProducts.length > 0" class="w-full flex flex-col">
                  <nuxt-link :to="`/spaces/${card.slug}`"
                  v-for="(card, i) in filteredProducts"
                  :key="i">
          <si-ProductCard 
            :card="card"
            :src="card.images ? card.images[0].src : ''"
            :title="card.name" 
            :rating="card.review.rating.toFixed(1)"
            :price="card.price.salePrice" />
        </nuxt-link>

          <!-- there should be paginations in here... -->
          <!-- <div class="text-center font-light text-xs my-6">you've reached the end</div> -->
        </div>

        <div v-if="filteredProducts.length == 0" class="bg-gray-100 h-40 p-12 w-full flex items-center text-center justify-center text-sm font-light">
          <p>no products are aligned to your search query<br> try again </p>
        </div>

        <!-- Drawer filter -->
        <aside
          style="z-index: 10000"
          class="p-5 transform top-0 left-0 w-screen sm:w-1/2 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
          :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
        >
          <div class="block m-12 close">
            <button class="absolute top-0 right-0 mt-4 mr-4" @click="isOpen = false">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <si-Filters
            :selectedFilters="selectedFilters"
            @apply-filters="applyFilters"
            @reset-filters="resetFilters"
            class="w-full"
          ></si-Filters>
        </aside>

      </div>

      <sections-spaces v-if="$settings.sections.collection.spaces.active" />

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      selectedCategory: "",
      selectedLocation: "",
      spaces: [],
      filtred: [],
      filteredProducts: [],
      item: null,
      loading: true,
      selectedFilters: {
        priceFrom: null,
        priceTo: null,
        attributes: [],
        services: [],
      },
    };
  },

  async fetch() {
    this.loading = true;

    const { data: productData } = await this.$storeino.products.search({
      status: "PUBLISH",
    });

    const collectionSlug = this.$route.params.slug;

// Select the collection menu (categories)
if(this.$settings.sections.collections != null){
  this.selectedCategory = this.$settings.sections.collections.find(
  (collection) => collection.slug === collectionSlug
);
}else{
  this.selectedCategory=[];
}


// Select the location menu
if(this.$settings.sections.locations != null){
  this.selectedLocation = this.$settings.sections.locations.find(
  (location) => location.slug === collectionSlug
);
}else{
  this.selectedCategory=[];
}


this.item = {
  collections: this.selectedCategory,
  locations: this.selectedLocation,
};


    // Filter products based on selected location and/or category
    if (!this.selectedLocation && !this.selectedCategory) {
      // If no location or category is selected, show all products
      this.filteredProducts = productData.results;
    } else {
      // Filter products based on selected location and/or category
      this.filteredProducts = productData.results.filter((product) => {
        const categoryMatches =
          !this.selectedCategory ||
          product.collections.some(
            (category) => category.slug === this.selectedCategory.slug
          );

        const locationMatches =
          !this.selectedLocation ||
          product.collections.some(
            (location) => location.slug === this.selectedLocation.slug
          );

        return categoryMatches && locationMatches;
      });
    }

    this.loading = false;
    this.spaces = [...this.filteredProducts];
  },

  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
    applyFilters() {
      this.filtered = this.filteredProducts.filter((product) => {
        const price = parseFloat(product.price.salePrice);
        const { priceFrom, priceTo } = this.selectedFilters;

        // Apply price filter if selected
        if (priceFrom !== null && priceTo !== null) {
          if (!(price >= priceFrom && price <= priceTo)) {
            return false;
          }
        }

        // Apply attribute filters
        const selectedAttributes = this.selectedFilters.attributes;
        if (selectedAttributes.length > 0) {
          const attributeMatch = selectedAttributes.some((attribute) => {
            return product.collections.some((col) => col.slug === attribute);
          });

          if (!attributeMatch) {
            return false;
          }
        }

        // Apply services filters
        const selectedServices = this.selectedFilters.services;
        if (selectedServices.length > 0) {
          const serviceMatch = selectedServices.some((service) => {
            return product.collections.some((col) => col.slug === service);
          });

          if (!serviceMatch) {
            return false;
          }
        }

        return true; // Include the products if all filters match
      });

      this.filteredProducts = this.filtered;
    },

    resetFilters() {
      this.selectedFilters = {
        priceFrom: null,
        priceTo: null,
        attributes: [],
        services: [],
      };
      return (this.filteredProducts = [...this.spaces]);
    },
  },
};
</script>
