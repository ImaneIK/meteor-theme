<template>
  <div class="mt-12">
    <div
      :style="
        $settings.sections.wishlist.banner.background.active &&
        $settings.sections.wishlist.banner.background.image
          ? `background-image: url('${$settings.sections.wishlist.banner.background.image.src}');`
          : `background: grey;`
      "
      class="header-banner"
      v-if="$settings.sections.wishlist.banner.active"
    >
      <div class="page-head">
        <div class="text_container">
          <h2 class="text-white">
            {{ $settings.sections.wishlist.banner.title }}
          </h2>
          <span class="text-white text-sm">{{
            $settings.sections.wishlist.banner.description
          }}</span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="bg-white my-2 p-3">
        <div
          v-if="loading.wishlist"
          class="flex justify-center items-center my-5"
        >
          <si-loader></si-loader>
        </div>
        <div v-if="!loading.wishlist && items.length > 0" class="flex flex-wrap">
          <div
            v-for="(item, i) in items"
            :key="i"
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 shadow-md"
          >
            <div class="relative" style="flex: 0 0 40%">
              
              <nuxt-img
                v-if="item.images.length > 0"
                class="h-full w-full object-cover object-center"
                :src="item.images[0].src"
                :alt="item.title"
              /> 
              <button @click="remove(item)" class="absolute top-0 left-0 m-2 flex items-center gap-1 bg-black fill-white text-xs p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
              </button>
            </div>

            <div class="pt-4 flex-1">
              <div class="flex flex-row justify-between px-4">
                <!-- collection -->
                <p
                  v-for="collection in getCollectionsForSpace(item)"
                  class="rounded-full px-1 text-xs text-gray-500 font-light"
                >
                  {{ collection.name }}
                </p>
                <p
                  v-if="getCollectionsForSpace(item).length === 0"
                  class="px-1 text-gray-400 text-xs font-light"
                >
                  no collection allocated
                </p>

                <!-- price -->
                <div class="">
                  <span
                    class="bg-black rounded-full px-4 py-1 text-sm text-white font-semibold"
                  >
                    {{ item.price.salePrice }}{{ $store.state.currency.code }}
                  </span>
                </div>
              </div>

              <!-- space name -->
              <p class="text-lg font-normal px-4">{{ item.name }}</p>

              <!-- location -->
              <div class="flex items-center px-4 my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  class="fill-amber-600"
                  viewBox="0 0 384 512"
                >
                  <path
                    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                  />
                </svg>

                <span
                  v-for="location in getLocationsForSpace(item)"
                  class="rounded-full px-1 text-xs text-gray-500 font-light"
                >
                  {{ location.name }}
                </span>
                <span
                  v-if="getLocationsForSpace(item).length === 0"
                  class="px-1 text-gray-400 text-xs font-light"
                >
                  no location allocated
                </span>
              </div>

              
              <NuxtLink
                class="block w-full text-center text-xs bg-gray-100 p-2 mt-4 w-fit"
                :to="`/spaces/${item.slug}`"
                >{{ $settings.sections.buttons.booknow.text }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- if wishlist is empty -->
        <div
          v-if="!loading.wishlist && items.length == 0"
          class="flex flex-col items-center py-4 h-80 justify-center"
        >
          <h2 class="w-full text-center py-3">
            {{ $settings.sections.wishlist.empty_text }}
          </h2>
          <nuxt-link
            to="/shop"
            class="flex items-center p-2 justify-center primary"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="shopping-cart"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="w-5 h-5 translate"
            >
              <path
                d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
              ></path>
            </svg>
            <span>&ensp;</span>
            <span class="w-full">
              {{ $settings.sections.buttons.backtoshop.text }}
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: { wishlist: true },
      items: [],
      services: this.$settings.sections.services,
      locations: this.$settings.sections.locations,
      collections: this.$settings.sections.collections,
    };
  },
  async fetch() {
    //this.$store.state.seo.title = this.$settings.sections.wishlist.title + ' - ' + this.$settings.store_name;
    //this.$store.state.seo.description = this.$settings.sections.wishlist.description || this.$settings.store_description;
    await this.initWishlist();
  },
  watch: {
    async "$store.state.cart.length"() {
      await this.initWishlist();
    },
  },
  methods: {
    async initWishlist() {
      this.items = [];
      const ids = this.$store.state.wishlist.map((item) => item._id);
      this.loading.wishlist = true;
      if (ids.length > 0) {
        try {
          const response = await this.$storeino.products.search({
            status: "PUBLISH",
            // "_id-in": ids,
            // limit: 1000,
          });
          const allProducts = response.data.results;
          // console.log(allProducts);
          // Filter the products based on matching IDs
          this.items = allProducts.filter((product) =>
            ids.includes(product._id)
          );
          // console.log(this.items);
        } catch (e) {
          console.log({ e });
        }
      }
      this.loading.wishlist = false;
    },

    getServicesForSpace(space) {
      try {
        if (this.$settings.sections.services != null) {
          const filteredServices = this.$settings.sections.services
            .filter((service) => {
              return space.collections.some(
                (item) => item.slug === service.slug
              );
            })
            .slice(0, 3); // Displaying only 3 results to avoid different card scales

          if (filteredServices.length === 0) {
            return "[]"; // Return an empty array when no services are found
          }

          return filteredServices;
        } else {
          return [];
        }
      } catch (e) {
        console.error(e);
        return []; // Return an empty array in case of an error
      }
    },
    getLocationsForSpace(space) {
      try {
        if (this.$settings.sections.locations != null) {
          return this.$settings.sections.locations.filter((location) => {
            return space.collections.some(
              (item) => item.slug === location.slug
            );
          });
        } else {
          return [];
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    },
    getCollectionsForSpace(space) {
      try {
        if (this.$settings.sections.collections != null) {
          return this.$settings.sections.collections.filter((collection) => {
            return space.collections.some(
              (item) => item.slug === collection.slug
            );
          });
        } else {
          return []; // Return an empty array or handle it as needed
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    },

    async remove(space) {
      this.$tools.call("REMOVE_FROM_WISHLIST", space);
      const indexToRemove = this.items.findIndex(item => item.id === space.id);
      if (indexToRemove !== -1) {
        this.items.splice(indexToRemove, 1);
      }
    },
  },
};
</script>

<style scoped>
.header-banner {
  position: relative;
  padding: 50px 0 50px;
  background-attachment: scroll;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.page-head {
  text-align: center;
  overflow: hidden;
}
.page-head:before {
  content: "";
  position: absolute;
  background-color: #000000;
  opacity: 0.54;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.text_container {
  position: relative;
  z-index: 2;
}

.text_container h2 {
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  text-transform: uppercase;
}

.primary {
  background-color: var(--primary);
  border-color: var(--primary);
}
</style>
