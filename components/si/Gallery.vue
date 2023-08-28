<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>

    <div
      v-if="!loading && cards != null"
      class="container mx-auto px-5 py-8 lg:px-12 lg:pt-24"
    >

    
      <div class="font-semibold  mb-12">
        <div class="flex justify-between w-full">
          <h1 class="block justify-start text-sm">
            <span class="text-orange-600 tracking-wide">OUR SPACES</span>
          </h1>
          <nuxt-link class=" block items-center justify-end rounded-md  bg-amber-600 text-white font-light text-sm p-2" :to="`/shop`">Explore more</nuxt-link>
        </div>
        <p class=" text-4xl font-normal w-full md:w-full">
          Our newest items<br />for your team to explore
        </p>
      </div>

     
      
      <div class="-m-1 flex flex-wrap md:-m-2">
        <div class="flex w-full md:w-1/2 flex-wrap">
          <nuxt-link :to="`/spaces/${cards[0].slug}`" class="p-1 relative w-full lg:w-1/2 transition-all duration-300 group overflow-hidden ">
            <img
              alt="gallery"
              class="block h-full w-full object-cover object-center group-hover:h-3/4 transition-all duration-300 overflow-hidden"
              :src="cards[0].images[0].src"
            />
            <div class="m-1 absolute w-full p-2 bottom-0 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-white overflow-hidden">
                          <h2>{{cards[0].name}}</h2>
                          <p>lorem ipsum</p>
            </div>
          </nuxt-link>

          <nuxt-link :to="`/spaces/${cards[1].slug}`" class="p-1 relative w-1/2 lg:w-1/2 transition-all duration-300 group overflow-hidden ">
            <img
              alt="gallery"
              class="block h-full w-full object-cover object-center group-hover:h-3/4 transition-all duration-300 overflow-hidden"
              :src="cards[1].images[0].src"
            />
            <div class="m-1 absolute w-full p-2 bottom-0 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-white overflow-hidden">
                          <h2>{{cards[0].name}}</h2>
                          <p>lorem ipsum</p>
            </div>
          </nuxt-link>

          <nuxt-link :to="`/spaces/${cards[2].slug}`" class="p-1 relative w-full transition-all duration-300 group overflow-hidden ">
            <img
              alt="gallery"
              class="block h-full w-full object-cover object-center group-hover:h-4/5 transition-all duration-300 overflow-hidden"
              :src="cards[2].images[0].src"
            />
            <div class="m-1 absolute w-full h-1/5 p-2 bottom-0 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-white overflow-hidden">
                          <h2>{{cards[0].name}}</h2>
                          <p>lorem ipsum</p>
            </div>
          </nuxt-link>
        </div>

        <div class="flex w-full md:w-1/2 flex-wrap">
          <nuxt-link :to="`/spaces/${cards[0].slug}`" class="p-1 relative w-full transition-all duration-300 group overflow-hidden ">
            <img
              alt="gallery"
              class="block h-full w-full object-cover object-center group-hover:h-4/5 transition-all duration-300 overflow-hidden"
              :src="cards[0].images[2].src"
            />
            <div class="m-1 absolute w-full h-1/5 p-2 bottom-0 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-white overflow-hidden">
                          <h2>{{cards[0].name}}</h2>
                          <p>lorem ipsum</p>
            </div>
          </nuxt-link>

          <nuxt-link :to="`/spaces/${cards[3].slug}`" class="p-1 relative w-full lg:w-1/2 transition-all duration-300 group overflow-hidden ">
            <img
              alt="gallery"
              class="block h-full w-full object-cover object-center group-hover:h-3/4 transition-all duration-300 overflow-hidden"
              :src="cards[3].images[0].src"
            />
            <div class="m-1 absolute w-full p-2 bottom-0 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-white overflow-hidden">
                          <h2>{{cards[0].name}}</h2>
                          <p>lorem ipsum</p>
            </div>
          </nuxt-link>

          <nuxt-link :to="`/spaces/${cards[0].slug}`" class="p-1 relative w-full lg:w-1/2 transition-all duration-300 group overflow-hidden ">
            <img
              alt="gallery"
              class="block h-full w-full object-cover object-center group-hover:h-3/4 transition-all duration-300 overflow-hidden"
              :src="cards[1].images[0].src"
            />
            <div class="m-1 absolute w-full p-2 bottom-0 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-white overflow-hidden">
                          <h2>{{cards[1].name}}</h2>
                          <p>lorem ipsum</p>
            </div>
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
      } catch (e) {
        console.log({ e });
      }
      this.loading = false;
    },
  },
};
</script>
