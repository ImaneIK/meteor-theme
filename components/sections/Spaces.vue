<template>
  <div class="">
    <div class="mx-6 md:mx-24 my-12">
      <div class="font-semibold mb-12">
        <h1 class="text-sm">
          <span class="text-orange-600 tracking-wide">OUR SPACES</span>
        </h1>
        <p class="pt-6 text-4xl font-normal w-full md:w-full">
          Choose the space that suits <br />
          you and your team.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- v-for="image in card.images" -->
        <div
          v-for="card in cards"
          :key="card.id"
          class="flex max-w-2xl mx-auto bg-white rounded-sm shadow-md"
        >
          <div class="">
          <img class="object-cover w-full h-full" :src="card.images[0].src" :alt="card.title" />
          </div>

          <div class="p-6">

            {{ card.name }}

            <p class="mt-2 text-xs text-gray-400 text-slate-500 hidden sm:block md:block lg:block">
              {{ card.description }}
            </p>

            <div class="flex flex-col md:flex-row py-4 ">
              <div class="md:pr-4 my-2 md:my-0">
                <span class="bg-black rounded-full px-3 py-1 text-xs text-white font-semibold">{{ card.collections[0].name }}</span>
                  
                
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
              class=" block underline underline-offset-4 px-3 text-xs font-semibold mb-4"
              :to="`/spaces/${card.slug}`"
              >Book Now <fa class="text-amber-600" :icon="['fas', 'arrow-right']"
            /></NuxtLink>
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
  },
};
</script>
