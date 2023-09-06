<template>
<section class=" bg-black text-white my-8" >
  <div class="mx-4 md:mx-12 max-w-screen-xl py-8 sm:py-12 lg:px-8 lg:py-16">
    <div
      class="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16"
    >
      <div
        class="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right"
      >
        <h2 class="text-3xl font-bold sm:text-4xl">{{ $settings.sections.heading.services.title}}</h2>

        <p class="mt-4 text-gray-400">
         {{$settings.sections.heading.services.excerpt}}
        </p>

        <a
          href="/shop"
          class="mt-8 w-1/2 px-3 lg:w-auto text-center inline-block rounded bg-amber-600 py-3 text-sm font-medium text-white transition hover:bg-amber-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >

        {{ $settings.sections.heading.services.cta }}
          
        </a>
      </div>

      <div  class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="(card,i) in cards"
          class="block rounded-xl border border-gray-100 p-3 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
        >
          <span class="inline-block rounded-lg ">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ff8000}</style><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg>          
          </span>

          <h2 class="mt-2 font-semibold text-xs">{{card.name}}</h2>
          <p class="text-xs font-light py-1">{{ itemCount[i] }} items</p>
        </div>



      </div>
    </div>
  </div>
</section>

</template>


<script>
export default{
    data() {
    return {
      loading: false,
      itemCount:[],
      cards: [],
    };
  },

  async fetch() {
  try {
    const filter = { status: "PUBLISH" };
    if (this.$settings.sections.services.length > 0) {
      // Fetch locations from settings
      this.cards = this.$settings.sections.services;
      const searchData = await this.$storeino.products.search(filter);

      // Initialize an array to store the counts
      this.itemCount = this.cards.map((item) => {
        // Count the number of matches between item.name and collection names
        return searchData.data.results.reduce((count, result) => {
          return count + result.collections.filter((collection) => {
            return collection.slug === item.slug;
          }).length;
        }, 0);
      });

      // Now 'counts' is an array of counts, where each count represents matches for the corresponding item in 'cards'
      // console.log(this.itemCount);
    } else {
      const { data } = await this.$storeino.collections.search(filter);
      this.cards = data;
    }
  } catch (e) {
    console.log({ e });
  }
  this.loading = false;
},
    }
</script>