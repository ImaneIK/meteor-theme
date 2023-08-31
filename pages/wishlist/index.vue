<template>
  <div class="mt-16">
    <div class="header-banner">
      <div class="page-head">
        <div class="text_container">
          <h2 class="text-white">
            wishlist title
            <!-- {{ $settings.sections.wishlist.title }} -->
          </h2>
          <span class="text-white text-sm">View your wishlist products</span>
        </div>
      </div>
    </div>

    <div class="container">

        

      <div class="bg-white my-2 p-3">
        <div v-if="loading.wishlist" class="flex justify-center items-center my-5">
          <si-loader></si-loader>
        </div>
        <div class="flex flex-wrap">
          <div
            v-for="(item, i) in items"
            :key="i"
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
          >
          <div class="" style="flex: 0 0 40%">
              <img
                class="h-full w-full object-cover object-center"
                :src="item.images[0].src"
                :alt="item.title"
              />
            </div>

            <div class="pt-4 flex-1">
              <div class="flex flex-row justify-between px-4">
                <p class="ounded-full py-1 text-xs text-gray-500 font-light">
                  {{ item.collections[0].name }}
                </p>

                <div class="">
                  <span
                    class="bg-black rounded-full px-4 py-1 text-sm text-white font-semibold"
                  >
                    {{ item.price.salePrice }}$/Day
                  </span>
                </div>
              </div>

              <p class="text-lg font-normal px-4">{{ item.name }}</p>

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
                <span class="rounded-full px-1 text-xs text-gray-500 font-light">{{item.collections[1].name}}</span>
              </div>

              <div class="flex flex-col px-4">
                <div class="grid grid-cols-2">
                  <div v-for="(collection, index) in item.collections.slice(2)">
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
                :to="`/spaces/${item.slug}`"
                >Book Now <fa class="" :icon="['fas', 'arrow-right']"
              /></NuxtLink>
            </div>
            <!-- <si-product :item="item"></si-product> -->
          </div>
        </div>
        <div
          v-if="!loading.wishlist && items.length == 0"
          class="flex flex-col items-center py-4"
        >
          <h2 class="w-full text-center py-3">
            some empty text
            <!-- {{ $settings.sections.wishlist.empty_text }} -->
          </h2>
          <nuxt-link
            to="/shop"
            class="flex items-center p-2 justify-center primary text-white"
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
                fill="currentColor"
                d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
              ></path>
            </svg>
            <span>&ensp;</span>
            <span class="w-full">
              back to shop
              <!-- {{ $settings.sections.wishlist.buttons.back_to_shop_text }} -->
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
      console.log("Init");
      this.items = [];
      const ids = this.$store.state.wishlist.map((item) => item._id);
      this.loading.wishlist = true;
      if (ids.length > 0) {
        try {
          const response = await this.$storeino.products.search({
            status:'PUBLISH'
            // "_id-in": ids,
            // limit: 1000,
          });
          const allProducts = response.data.results;
          console.log(allProducts)
          // Filter the products based on matching IDs
          this.items = allProducts.filter((product) => ids.includes(product._id));
          console.log(this.items)
        } catch (e) {
          console.log({ e });
        }
      }
      this.loading.wishlist = false;
    },

    async remove(item) {
      this.$tools.call("REMOVE_FROM_WISHLIST", item);
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
  background-image: url(https://cdn.shopify.com/s/files/1/0616/9480/4174/files/shopping-cart-head_1512x.jpg?v=1652080767);
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
  color: #fff;
  background-color: var(--primary);
  border-color: var(--primary);
}
</style>
