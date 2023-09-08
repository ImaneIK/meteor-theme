<template>
    <div>
        <nuxt-link :to="`/spaces/${card.slug}`"
            v-for="(card, i) in filteredProducts"
            :key="i"
            class="flex flex-col sm:flex-row max-w-2xl mx-auto my-4 w-full bg-white rounded-sm shadow-md"
          >

          <!-- <si-ProductCard  
          :card="selectedCard"
      :image="selectedCard.images[0].src"
      :alt="selectedCard.title"
      :collections="getCollectionsForSpace(selectedCard)"
      :price="selectedCard.price.salePrice"
      :title="selectedCard.name"
      :locations="getLocationsForSpace(selectedCard)"

          ></si-ProductCard> -->
            <!-- space image -->
            <div class="" style="flex: 0 0 40%">
              <nuxt-img
                class="h-full w-full object-cover object-center"
                :src="card.images[0].src"
                :alt="card.title"
              />
            </div>
            <div class="pt-4 flex flex-col flex-1 justify-between">
              <div class="flex flex-row justify-between px-4">

                <!-- collection -->
                <p v-for="collection in getCollectionsForSpace(card)" class="ounded-full py-1 text-xs text-gray-500 font-light">
                  {{ collection.name }}
                </p>
                
                  <!-- price -->
                <div class="">
                  <span
                    class="bg-black rounded-full px-4 py-1 text-sm text-white font-semibold"
                  >
                    {{ card.price.salePrice }}$
                  </span>
                </div>
              </div>

              <!-- space name -->
              <p class="text-lg font-normal px-4">{{ card.name }}</p>

              <!-- LOCATION -->
              <div class="flex items-center px-4 my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  class="fill-amber-600"
                  viewBox="0 0 384 512"
                >
                  
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                </svg>
                <span v-for="location in getLocationsForSpace(card)" class="rounded-full px-1 text-xs text-gray-500 font-light">{{location.name}}</span>
              </div>

              <!-- rating -->
              <div class="flex items-center text-xs text-yellow-500">
                <p class="flex items-center gap-1 mx-4"><svg stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="fill-yellow-500 w-4 h-4" viewBox="0 0 24 24"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    {{ card.review.rating.toFixed(1) }} 
                </p>
              </div>
            
              <!-- SERVICES -->
              <div class="flex flex-col px-4">
                <div class="grid grid-cols-2">
                  <div v-for="(collection, index) in getServicesForSpace(card)">
                    <span
                      :key="index"
                      class="block rounded-md m-1 justify-center border-gray-300 border px-3 py-1 text-gray-400 text-xs font-light">
                      {{ collection.name }}
                    </span>
                    
                  </div>
                  <span
                      class="flex block rounded-md m-1 justify-center border-gray-300 border px-3 py-1 text-gray-400 text-xs font-light">
                      <svg class="fill-gray-300" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>                    </span>

                </div>
              </div>

              <NuxtLink
                class="block justify-end items-center flex w-full text-right text-xs bg-gray-100 p-2 mt-4 w-fit"
                :to="`/spaces/${card.slug}`"
                >
                Book Now 
                <svg class="fill-gray-600" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>             
              </NuxtLink>
            </div>
          </nuxt-link>
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


    props: {
      image: String,
      alt: String,
      collections: Array,
      price: Number,
      title: String,
      locations: Array,
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
        getServicesForSpace(space) {
          try{
            return this.$settings.sections.services.filter(service => {
            return space.collections.some(item => item.slug === service.slug);
            }).slice(0,3); //displaying only 3 results to avoid differnt card scales
          }catch(e){
            console.log(e);
            return e;
            
          }
        },

        getLocationsForSpace(space) {
          try{
            return this.$settings.sections.locations.filter(location => {
            return space.collections.some(item => item.slug === location.slug);
            });
          }catch(e){
            console.log(e);
            return e;
            
          }
        },

        getCollectionsForSpace(space) {
          try{
            return this.$settings.sections.collections.filter(location => {
            return space.collections.some(item => item.slug === location.slug);
            });
          }catch(e){
            console.log(e);
            return e;
            
          }
        },

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

  };
  </script>
  