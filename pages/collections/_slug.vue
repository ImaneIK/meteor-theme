<template>
  <div class="">
    <sections-banner />

    <div class="my-12 mx-16">
      <!-- section route -->
      <div v-if="item" class="flex items-center bg-white mb-10">
        <div class="flex flex-1 flex-col justify-start items-start">
          <p class="text-xs font-light">
            <nuxt-link to="/">Home</nuxt-link> >
            <nuxt-link :to="`/collections`">Categories</nuxt-link> >
            <nuxt-link
              :to="`/collections/${
                item.locations ? item.locations.slug : item.collections.slug
              }`"
              >{{
                item.locations ? item.locations.slug : item.collections.slug
              }}</nuxt-link
            >
            >
            <span>Search Results</span>
          </p>
        </div>
      </div>

      <div>
        <div v-if="loading" class="flex justify-center items-center h-screen">
          <si-Loader />
        </div>

        <div v-if="!loading" class="flex flex-row w-full">
          <!-- les variantes -->
          <si-Filters
            :selectedFilters="selectedFilters"
            @apply-filters="applyFilters"
            @reset-filters="resetFilters"
            class=""
          ></si-Filters>

          <!-- search results -->

          <div >

            <div v-if="!filteredProducts"> no product found </div>

            <div v-else class="flex flex-col">
              <h2 class="block mb-4">
                {{ item.locations ? item.locations.slug : item.collections.slug }}:
                {{ filteredProducts.length }} properties found
              </h2>
              <div
                v-for="(product, i) in filteredProducts"
                :key="i"
                class="flex max-w-2xl mx-auto w-full bg-white rounded-sm shadow-md"
              >
                <div>
                  <img
                    class="object-cover w-full h-full"
                    :src="product.images[0].src"
                    :alt="product.title"
                  />
                </div>

                <div class="p-6">
                  {{ product.name }}

                  <p
                    class="mt-2 text-xs text-gray-400 text-slate-500 hidden sm:block md:block lg:block"
                  >
                    {{ product.collections[1].name }}
                  </p>

                  <div class="flex flex-col md:flex-row py-4">
                    <div class="md:pr-4 my-2 md:my-0">
                      <span
                        class="bg-black rounded-full px-3 py-1 text-xs text-white font-semibold"
                        >{{ product.collections[0].name }}</span
                      >
                    </div>

                    <div class="md:pl-4">
                      <span
                        class="bg-black rounded-full px-3 py-1 text-sm text-white font-semibold"
                      >
                        {{ product.price.salePrice }}$
                      </span>
                    </div>
                  </div>

                  <NuxtLink
                    class="block underline underline-offset-4 px-3 text-xs font-semibold mb-4"
                    :to="`/spaces/${product.slug}`"
                    >Book Now <fa class="text-amber-600" :icon="['fas', 'arrow-right']"
                  /></NuxtLink>
                </div>
              </div>

              <div class="text-center font-light text-xs my-6">
                you've reached the end
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
      selectedCategory: "",
      selectedLocation: "",
      spaces:[],
      filtred:[],
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
    this.spaces=[...this.filteredProducts];
  },

  methods: {
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

      console.log("waaaaaaaa",this.spaces);
      this.filteredProducts = this.filtered;
    },

    resetFilters() {
      this.selectedFilters = {
        priceFrom: null,
        priceTo: null,
        attributes: [],
        services: [],
      };
      return this.filteredProducts = [...this.spaces];
    },
  },
};
</script>
