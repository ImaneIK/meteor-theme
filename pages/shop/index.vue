<template>
  <div>
    <sections-banner />

    <!-- loader -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>

    <!-- list of spaces and the filters -->
    <div v-if="!loading && filteredProducts != null" class="flex flex-col m-16">
      <!-- the route like heading -->
      <div v-if="filteredProducts" class="flex items-center bg-white mb-10">
        <div class="flex flex-col lg:flex-row justify-center items-start">
          <p class="text-xs font-light">
            <nuxt-link to="/">Home</nuxt-link> >
            <nuxt-link :to="`/shop`">All spaces</nuxt-link>
          </p>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row justify-center lg:flex-row">
        <!-- the filters -->
        <si-Filters
          :selectedFilters="selectedFilters"
          @apply-filters="applyFilters"
          @reset-filters="resetFilters"
          class=""
        ></si-Filters>

        <div class="">
          <!-- <h2 class="block mb-4">{{ item.slug }}: {{ items.length }} properties found</h2> -->

          <!-- the cards -->
          <div
            v-for="(card, i) in filteredProducts"
            :key="i"
            class="flex max-w-2xl mx-auto my-4 w-full bg-white rounded-sm shadow-md"
          >
            <div class="w-2/5">
              <img
                class="object-cover w-full h-full"
                :src="card.images[0].src"
                :alt="card.title"
              />
            </div>

            <div class="p-6">
              {{ card.name }}

              <div class="md:pr-4 my-2 md:my-0">
                <span class="rounded-full px-3 py-1 text-xs font-normal">{{
                  card.collections[1].name
                }}</span>
              </div>

              <!-- <p
                class="mt-2 text-xs text-gray-400 text-slate-500 hidden sm:block md:block lg:block"
              >
                {{ card.description }}
              </p> -->

              <div class="flex flex-col md:flex-row py-4">
                <div class="md:pr-4 my-2 md:my-0">
                  <span
                    class="bg-black rounded-full px-3 py-1 text-xs text-white font-semibold"
                    >{{ card.collections[0].name }}</span
                  >
                </div>

                <div class="md:pl-4">
                  <span
                    class="bg-black rounded-full px-3 py-1 text-sm text-white font-semibold"
                  >
                    {{ card.price.salePrice }}$
                  </span>
                </div>
              </div>

              <div class="md:pr-4 my-4 text-xs font-light">
                <template v-for="(collection, index) in card.collections.slice(2)">
                  <span :key="index" class="rounded-full px-3 py-1 text-xs font-normal">
                    {{ collection.name }}
                  </span>
                </template>
              </div>

              <NuxtLink
                class="block underline underline-offset-4 px-3 text-xs font-semibold mb-4"
                :to="`/spaces/${card.slug}`"
                >Book Now <fa class="text-amber-600" :icon="['fas', 'arrow-right']"
              /></NuxtLink>
            </div>
          </div>

          <!-- there should be paginations in here... -->
          <div class="text-center font-light text-xs my-6">you've reached the end</div>
        </div>
      </div>
    </div>

    <sections-blog />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
      collections: [],
      loading: true,
      filteredProducts: [],
      selectedFilters: {
        priceFrom: null,
        priceTo: null,
        attributes: [],
        services:[]
      },
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
        services: [],
      };
      this.filteredProducts = [...this.cards]; // Reset filteredProducts to all products
    },
  },
};
</script>
