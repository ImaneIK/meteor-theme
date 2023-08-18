<template>
  <div>
    <sections-banner />
    <div class="flex flex-col m-12 ">
    
    <!-- section route -->
    <div v-if="cards" class="flex items-center bg-white mb-10">
      <div class="flex flex-1 flex-col justify-start items-start">
        <p class="text-xs font-light">
          <nuxt-link to="/">Home</nuxt-link> >
          <nuxt-link :to="`/shop`">All spaces</nuxt-link> 
        </p>
      </div>
    </div>

    <div class=" flex flex-row">
      <si-variantes class=""></si-variantes>

      <div class="">
        <!-- <h2 class="block mb-4">{{ item.slug }}: {{ items.length }} properties found</h2> -->
        <div
          v-for="(card, i) in cards"
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

            <NuxtLink
              class="block underline underline-offset-4 px-3 text-xs font-semibold mb-4"
              :to="`/spaces/${card.slug}`"
              >Book Now <fa class="text-amber-600" :icon="['fas', 'arrow-right']"
            /></NuxtLink>
          </div>
        </div>

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
        const { data2 } = await this.$storeino.collections.search(filter);
        this.cards = data.results;
        this.collections = data2;
      } catch (e) {
        console.log({ e });
      }
      this.loading = false;
    },
  },
};
</script>
