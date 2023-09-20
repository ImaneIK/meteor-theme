<template>
  <div>
    <sections-banner v-if="$settings.sections.shopBanner.active" />

    <!-- loader -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>

    <!-- the content -->
    <div
      v-if="!loading && filteredProducts != null && $settings.sections.shopContent.active"
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
              <nuxt-link class="block" :to="`/shop`">{{ $settings.sections.productdescription.all.label }}</nuxt-link>
            </p>
          </div>

        </div>

        <h2 class="block text-end w-full text-xs font-light">{{ cards.length }} {{ $settings.sections.productdescription.items.label }}</h2>
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
      cards: [],
      collections: [],
      locations: [],
      loading: true,
      filteredProducts: [],
      selectedFilters: {
        priceFrom: null,
        priceTo: null,
        attributes: [],
        locations: [],
        services: [],
        sortOrder: 'default',
      },
      servicesOn:[],
      isOpen: false,
      
    };
  },

  async fetch() {
    let filter = { status: "PUBLISH" };
    await this.getCards(filter);
  },

  computed: {

    // Create a computed property to filter cards based on selected filters
    filteredCards() {
      let filtered = this.cards;
      // Apply price filter if selected
      if (
        this.selectedFilters.priceFrom !== null &&
        this.selectedFilters.priceTo !== null
      ) {
        filtered = filtered.filter((card) => {
          const price = parseFloat(card.price.salePrice);
          return (
            price >= this.selectedFilters.priceFrom &&
            price <= this.selectedFilters.priceTo
          );
        });
      }

      // Apply attribute filters if selected
      if (this.selectedFilters.attributes.length > 0) {
        filtered = filtered.filter((card) => {
          return card.collections.some((collection) => {
            return this.selectedFilters.attributes.includes(collection.slug);
          });
        });
      }

      // Apply locations filters if selected
      if (this.selectedFilters.locations.length > 0) {
        filtered = filtered.filter((card) => {
          return card.collections.some((collection) => {
            return this.selectedFilters.locations.includes(collection.slug);
          });
        });
      }

      // Apply services filters if selected
      if (this.selectedFilters.services.length > 0) {
        filtered = filtered.filter((card) => {
          return card.collections.some((collection) => {
            return this.selectedFilters.services.includes(collection.slug);
          });
        });
      }

      return filtered;
    },
  },

  methods: {

        drawer() {
          this.isOpen = !this.isOpen;
        },
    
        async getCards(filter) {
      this.loading = true;
      try {
        const { data } = await this.$storeino.products.search(filter);
        const { data2 } = await this.$storeino.collections.search(filter);
        this.cards = data.results;
        this.collections = data2;
        this.filteredProducts = [...this.cards]; // Initialize filteredProducts with all products
        // console.log(this.filteredProducts);
      } catch (e) {
        console.log({ e });
      }
      this.loading = false;
        },

        async applyFilters() {
          const filtered = this.cards.filter((product) => {
            const price = parseFloat(product.price.salePrice);
            const { priceFrom, priceTo } = this.selectedFilters;

            // Apply price filter if selected
            if (priceFrom !== null && priceTo !== null) {
              if (!(price >= priceFrom && price <= priceTo)) {
                return false; // Exclude the product if price filter doesn't match
              }
            }

            // Apply attribute filters
            const selectedAttributes = this.selectedFilters.attributes;
            if (selectedAttributes.length > 0) {
              const attributeMatch = selectedAttributes.some((attribute) => {
                return product.collections.some((col) => col.slug === attribute);
              });

              if (!attributeMatch) {
                return false; // Exclude the product if attribute filter doesn't match
              }
            }

            // Apply locations filters
            const selectedLocations = this.selectedFilters.locations;
            if (selectedLocations.length > 0) {
              const attributeMatch = selectedLocations.some((attribute) => {
                return product.collections.some((col) => col.slug === attribute);
              });

              if (!attributeMatch) {
                return false; // Exclude the product if attribute filter doesn't match
              }
            }

            // Apply services filters
            const selectedServices = this.selectedFilters.services;
            if (selectedServices.length > 0) {
              const attributeMatch = selectedServices.some((attribute) => {
                return product.collections.some((col) => col.slug === attribute);
              });

              if (!attributeMatch) {
                return false; // Exclude the product if attribute filter doesn't match
              }
            }

            return true; // Include the product if all filters match
          });

            // console.log(filtered)
          // Sort the filtered products based on the selected sorting order
          if (this.selectedFilters.sortOrder === 'popular') {
          filtered.sort((a, b) => b.review.rating - a.review.rating);
          console.log(this.filteredProducts.sort((a, b) => parseFloat(b.review.rating)  - parseFloat(a.review.rating) ));
          
          } else if (this.sortOrder === 'price') {
          filtered.sort((a, b) => a.price.salePrice - b.price.salePrice);
          console.log(this.filteredProducts.sort((a, b) => b.price.salePrice - a.price.salePrice))

      }

          this.filteredProducts = filtered;
        },
        // Reset filters
        resetFilters() {
          this.selectedFilters = {
            priceFrom: null,
            priceTo: null,
            attributes: [],
            locations: [],
            services: [],
          };
          this.filteredProducts = [...this.cards]; // Reset filteredProducts to all products
        },
  },

  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  transition: background-color 0.3s;
  z-index: 1000;
}

.navbar-transparent {
  background-color: transparent;
  border-bottom: solid 1px gray;
}

.navbar-white {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-scroll {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
