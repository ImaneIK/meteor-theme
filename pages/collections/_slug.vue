<template>
  <div>
    <sections-banner v-if="$settings.sections.shopBanner.active"/>

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
        <div v-if="filteredProducts" class="flex justify-start items-center w-full">
          <div class="flex flex-col lg:flex-row">
            <p class="text-xs font-light flex gap-2">
              <nuxt-link class="block" to="/"><svg class=" fill-gray-500" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg></nuxt-link> >
              <nuxt-link class="block" :to="`/collections/${
                item.locations ? item.locations.slug : item.collections.slug
              }`">{{
                item.locations ? item.locations.name : item.collections.name
              }}</nuxt-link>
            </p>
          </div>

        </div>

        <h2 class="block text-end w-full text-xs font-light">{{ filteredProducts.length }} {{$settings.sections.productdescription.items.label}}</h2>
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
        <div class="w-full flex flex-col">
          <nuxt-link :to="`/spaces/${card.slug}`"
            v-for="(card, i) in filteredProducts"
            :key="i">
            <si-ProductCard 
              :card="card"
              :src="card.images[0].src" 
              :title="card.name" 
              :rating="card.review.rating.toFixed(1)"
              :price="card.price.salePrice" />
          </nuxt-link>

          <!-- there should be paginations in here... -->
          <!-- <div class="text-center font-light text-xs my-6">you've reached the end</div> -->
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

      <sections-spaces v-if="$settings.sections.relateditems.active"/>

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
