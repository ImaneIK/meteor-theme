<template>
  <div class="">
    <sections-banner />

    <div class="my-12 mx-4 lg:mx-16">
      <!-- section route -->
      <div v-if="item" class="flex justify-between items-center bg-white lg:mb-10">
        <div class="flex flex-col justify-start items-start">
          <p class="text-xs font-light">
            <nuxt-link to="/">Home</nuxt-link> >
            <nuxt-link
              :to="`/collections/${
                item.locations ? item.locations.slug : item.collections.slug
              }`"
              >{{
                item.locations ? item.locations.name : item.collections.name
              }}</nuxt-link
            >
            
          </p>
        </div>

        <div class="flex justify-center md:py-4">
          <div class="w-full items-end">
            <div class="flex items-center space-x-4 justify-end">
              <label for="sortOptions" class="text-gray-600 text-xs font-light"
                >Sort By:</label>
              <select
                v-model="sortOrder"
                id="sortOptions"
                class="text-xs font-light text-gray-600 px-3 py-2 bg-transparent border rounded"
              >
                <option value="default">Default</option>
                <option value="name">Category</option>
                <option value="name">Location</option>
                <option value="name">price</option>
              </select>

              

            </div>
          </div>
        </div>
      </div>

      <div>
        <div v-if="loading" class="flex justify-center items-center h-screen">
          <si-Loader />
        </div>

        <div v-if="!loading" class="flex flex-row justify-center pt-2 gap-4">
          <!-- toggle -->
          <si-FilterToggle :drawer="drawer"></si-FilterToggle>
          
          <!-- Drawer filter -->
          <aside
            style="z-index: 10000"
            class="p-5 transform top-0 left-0 w-96 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
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

          <!-- the filter on xl -->
          <si-Filters
            :selectedFilters="selectedFilters"
            @apply-filters="applyFilters"
            @reset-filters="resetFilters"
            class="xl:w-2/5 xl:block hidden"
          ></si-Filters>

          <!-- search results -->

          <div class="xl:w-3/5">

            
            <div class="flex flex-col">
              <h2 class="block lg:mb-4">
                {{ item.locations ? item.locations.slug : item.collections.slug }}:
                {{ filteredProducts.length }} properties found
              </h2>

                <!-- if no items found -->
              <div :class="filteredProducts.length>0 ? 'hidden' : ''" class="h-1/2 flex flex-col items-center justify-center m-auto w-full bg-gray-100 p-24 gap-8">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#c0c0c0}</style><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                No Items found
              </div>


              <!-- if results.length > 0 -->
              <div v-if="filteredProducts"
                v-for="(product, i) in filteredProducts"
                :key="i"
                class="flex flex-col lg:flex-row max-w-2xl mx-auto my-4 w-full bg-white rounded-sm shadow-md"
              >

                <div style="flex: 0 0 40%">
                  <nuxt-img
                    class="object-cover w-full h-full"
                    :src="product.images[0].src"
                    :alt="product.title"
                  />
                </div>

                <div class="pt-4 flex-1">
                  <div class="flex flex-row justify-between px-4">
                    <p class="ounded-full py-1 text-xs text-gray-500 font-light">
                      {{ product.collections[0].name }}
                    </p>

                    <div class="">
                      <span
                        class="bg-black rounded-full px-4 py-1 text-sm text-white font-semibold"
                      >
                        {{ product.price.salePrice }}$/Day
                      </span>
                    </div>
                  </div>

                  <div class="">
                    <p class="text-lg font-normal px-4">{{ product.name }}</p>
                    <div class="flex items-center px-4 my-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                      >
                        <style>
                          svg {
                            fill: #ff9831;
                          }
                        </style>
                        <path
                          d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                        />
                      </svg>
                      <span class="rounded-full px-1 text-xs text-gray-500 font-light">{{
                        product.collections[1].name
                      }}</span>
                    </div>

                    <div class="flex flex-col px-4">
                      <div class="grid grid-cols-2">
                        <div v-for="(collection, index) in product.collections.slice(2)">
                          <span
                            :key="index"
                            class="block rounded-md m-1 justify-center border-gray-300 border px-3 py-1 text-gray-400 text-xs font-light"
                          >
                            {{ collection.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <NuxtLink
                class="block justify-end items-center flex w-full text-right text-xs bg-gray-100 p-2 mt-4 w-fit"
                :to="`/spaces/${product.slug}`"
                >
                Book Now 
                <svg class="fill-gray-600" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>             
                </NuxtLink>
                    

                  </div>
                 
                </div>
                
              </div>

            </div>
          </div>
        </div>
      </div>
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
    this.selectedCategory = this.$settings.sections.collections.find(
      (collection) => collection.slug === collectionSlug
    );

    // Select the location menu
    this.selectedLocation = this.$settings.sections.locations.find(
      (location) => location.slug === collectionSlug
    );

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

      console.log("waaaaaaaa", this.spaces);
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
