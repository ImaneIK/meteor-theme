<template>
  <div class="">
    <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="flex flex-col gap-4 md:flex-row justify-start md:justify-between items-center">
        <div>
              <h1 class="text-2xl font-normal text-gray-800 capitalize lg:text-3xl">
                {{ $settings.sections.related.heading}}
              </h1>

              <div class="mt-2">
                <span class="inline-block w-40 h-1 bg-amber-500 rounded-full"></span>
                <span class="inline-block w-3 h-1 ml-1 bg-amber-500 rounded-full"></span>
                <span class="inline-block w-1 h-1 ml-1 bg-amber-500 rounded-full"></span>
              </div>
        </div>
        <nuxt-link :to="`/shop`" class="text-sm text-amber-500 underline decoration-amber-500 p-2 ">{{$settings.sections.posts.button.text}}</nuxt-link>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="card in cards" :key="card.slug" class="group relative">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <nuxt-img :src="card.images[0].src" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="`/spaces/${card.slug}`">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ card.name }}
                </a>
              </h3>
              <p v-for="collection in getCollectionsForSpace(card)" class="text-xs title-font text-gray-500 tracking-widest">
                {{ collection.name }}
              </p>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ card.price.salePrice }}{{ $store.state.currency.symbol }}</p>
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
        // console.log("jsdkze");
        console.log(this.cards);
        // console.log("jsdkze");
      } catch (e) {
        console.log({ e });
      }
      this.loading = false;
    },

    getCollectionsForSpace(space) {
      try {
        return this.collections.filter((collection) => {
          return space.collections.some((item) => item.slug === collection.slug);
        });
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
</script>
