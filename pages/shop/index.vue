<template>
  <div>
    <sections-banner />

    <!-- loader -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>

    <!-- the content -->
    <div
      v-if="!loading && filteredProducts != null"
      class="flex flex-col my-16 mx-24 divide-y"
    >
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

      <!-- the route like heading -->
      <div class="flex justify-center py-4">
        <div v-if="filteredProducts" class="flex justify-start items-center w-full">
          <div class="flex flex-col lg:flex-row">
            <p class="text-xs font-light">
              <nuxt-link to="/">Home</nuxt-link> >
              <nuxt-link :to="`/shop`">All spaces</nuxt-link>
            </p>
          </div>
        </div>

        <div class="w-full items-end">
          <div class="flex items-center space-x-4 justify-end">
            <label for="sortOptions" class="text-gray-600 text-xs font-light"
              >Sort By:</label
            >
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

            <!-- toggle -->
            <div class="xl:hidden">
              <button @click="drawer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <style>
                    svg {
                      fill: #d4d4d4;
                    }
                  </style>
                  <path
                    d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
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

        <div class="w-full lg:w-3/5">
          <h2 class="text-sm font-light">{{ cards.length }} properties found</h2>

          <!-- the cards -->
          <div
            v-for="(card, i) in filteredProducts"
            :key="i"
            class="flex flex-col lg:flex-row max-w-2xl mx-auto my-4 w-full bg-white rounded-sm shadow-md"
          >
            
            <div class="" style="flex: 0 0 40%">
              <img
                class="h-full w-full object-cover object-center"
                :src="card.images[0].src"
                :alt="card.title"
              />
            </div>

            <div class="pt-4 flex-1">
              <div class="flex flex-row justify-between px-4">
                <p class="ounded-full py-1 text-xs text-gray-500 font-light">
                  {{ card.collections[0].name }}
                </p>

                <div class="">
                  <span
                    class="bg-black rounded-full px-4 py-1 text-sm text-white font-semibold"
                  >
                    {{ card.price.salePrice }}$/Day
                  </span>
                </div>
              </div>

              <p class="text-lg font-normal px-4">{{ card.name }}</p>

              <div class="flex items-center px-4 my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <style>svg {fill: #ff9831;}</style>
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                </svg>
                <span class="rounded-full px-1 text-xs text-gray-500 font-light">{{card.collections[1].name}}</span>
              </div>

              <div class="flex flex-col px-4">
                <div class="grid grid-cols-2">
                  <div v-for="(collection, index) in card.collections.slice(2)">
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
                class="block w-full text-right text-xs bg-gray-100 p-2 mt-4 w-fit"
                :to="`/spaces/${card.slug}`"
                >Book Now <fa class="" :icon="['fas', 'arrow-right']"
              /></NuxtLink>
            </div>
          </div>

          <!-- there should be paginations in here... -->
          <div class="text-center font-light text-xs my-6">you've reached the end</div>
        </div>
      </div>
    </div>
    <sections-spaces />
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
      },
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
