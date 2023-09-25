<template>
  <div v-if="$settings.sections.space.featured.active" class="">
    <div v-if="cards.length != 0" class="bg-white">
      <div
        class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <div
          class="flex flex-col gap-4 md:flex-row justify-start md:justify-between items-center"
        >
          <div>
            <h1
              class="text-2xl font-normal text-gray-800 capitalize lg:text-3xl"
            >
              {{ $settings.sections.space.featured.title }}
            </h1>

            <div class="mt-2">
              <span
                class="inline-block w-40 h-1 bg-amber-500 rounded-full"
              ></span>
              <span
                class="inline-block w-3 h-1 ml-1 bg-amber-500 rounded-full"
              ></span>
              <span
                class="inline-block w-1 h-1 ml-1 bg-amber-500 rounded-full"
              ></span>
            </div>
          </div>
          <nuxt-link
            :to="`/shop`"
            class="text-sm text-amber-500 underline decoration-amber-500 p-2"
          >
            {{ $settings.sections.buttons.explore.text }}
          </nuxt-link>
        </div>

        <div class="mt-6 flex ">
          <div
            class="flex flex-row md:grid md:grid-cols-2 lg:flex lg:flex-row gap-x-6 xl:gap-x-8"
          >
            <div
              v-for="card in cards"
              :key="card.slug"
              class="relative group "
            >
              <div

                class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
              >
                <nuxt-img
                  v-if="card.images.length > 0"
                  :src="card.images[0].src"
                  class="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <a :href="`/spaces/${card.slug}`">
                      <span aria-hidden="true" class="absolute inset-0" />
                      {{ card.name }}
                    </a>
                  </h3>
                  <p
                    v-for="collection in getCollectionsForSpace(card)"
                    class="rounded-full px-1 text-xs text-gray-500 font-light"
                  >
                    {{ collection.name }}
                  </p>
                  <p
                    v-if="getCollectionsForSpace(card).length === 0"
                    class="px-1 text-gray-400 text-xs font-light"
                  >
                    no collection allocated
                  </p>
                </div>
                <p class="text-sm font-medium text-gray-900">
                  {{ card.price.salePrice }}{{ $store.state.currency.symbol }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- if the store if empty -->
    <div
      v-if="cards.length == 0"
      class="my-6 h-72 flex justify-center text-center items-center bg-gray-200"
    >
      <p>No products found</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
      loading: true,
      collections: this.$settings.sections.collections,
    };
  },
  async fetch() {
    let filter = { status: "PUBLISH" };
    await this.getCards(filter);
  },
  methods: {
    async getCards(filter) {
      this.loading = true;
      try {
        const { data } = await this.$storeino.products.search(filter);
        this.cards = data.results;
      } catch (e) {
        console.log({ e });
      }
      this.loading = false;
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
  },
};
</script>
