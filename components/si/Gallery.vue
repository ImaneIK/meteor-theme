<template>
  <div v-if="$settings.sections.home.featured.active">
    
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>

    <!-- if the store has more than 6 spaces -->
    <div v-if="loading && cards.length >= 6" class="container mx-auto px-5 py-8 md:px-12">
      <div
        class="flex flex-col gap-4 md:flex-row justify-start md:justify-between items-center"
      >
        <div>
          <h1 class="text-2xl font-normal text-gray-800 capitalize lg:text-3xl">
            {{ $settings.sections.home.featured.title}}
          </h1>

          <div class="mt-2">
            <span class="inline-block w-40 h-1 bg-amber-500 rounded-full"></span>
            <span class="inline-block w-3 h-1 ml-1 bg-amber-500 rounded-full"></span>
            <span class="inline-block w-1 h-1 ml-1 bg-amber-500 rounded-full"></span>
          </div>
        </div>
        <nuxt-link
          :to="`/shop`"
          class="text-sm text-amber-500 underline decoration-amber-500 p-2"
          >
          {{$settings.sections.buttons.explore.text}}
          </nuxt-link>
      </div>
     
      <div class="flex flex-col lg:flex-row gap-2 my-12">
        <div  class="flex flex-col gap-2 w-full lg:w-1/2  overflow-hidden">
          <div class="flex flex-col md:flex-row gap-2 rounded-bl-md">
            <nuxt-link
            :to="`/spaces/${cards[0].slug}`"
            class="relative rounded-md w-full lg:w-1/2 transition-all duration-300 group overflow-hidden"
          >
            <nuxt-img
              v-if="cards[0].images[0]"
              alt="gallery"
              class="block rounded-tr-md rounded-tl-md h-3/4 lg:h-full w-full object-cover object-center  lg:group-hover:h-3/4 transition-all duration-300 overflow-hidden"
              :src="cards[0].images[0].src"
            />
            <div
              class="p-2 rounded-br-md rounded-bl-md flex flex-col w-full duration-300 bg-black text-white"
            >
              <span class="star-rating">
                {{ displayStars(cards[0].review.rating) }}
              </span>
              <div class="text-xs font-semibold flex justify-between">
                <span class="block">{{ cards[0].name }}</span>
                <span class="block">{{ cards[0].price.salePrice }}{{ $store.state.currency.symbol }}</span>
              </div>
            </div>
            </nuxt-link>

            <nuxt-link
            :to="`/spaces/${cards[1].slug}`"
            class="relative rounded-md w-full lg:w-1/2 transition-all duration-300 group overflow-hidden"
          >
            <nuxt-img v-if="cards[1].images[0]"
              alt="gallery"
              class="block rounded-tr-md rounded-tl-md h-3/4 lg:h-full w-full object-cover object-center  lg:group-hover:h-3/4 transition-all duration-300 overflow-hidden"
              :src="cards[1].images[0].src"
            />
            <div
              class="p-2 rounded-br-md rounded-bl-md flex flex-col w-full duration-300 bg-black text-white"
            >
              <span class="star-rating">
                {{ displayStars(cards[1].review.rating) }}
              </span>
              <div class="text-xs font-semibold flex justify-between">
                <span class="block">{{ cards[1].name }}</span>
                <span class="block">{{ cards[1].price.salePrice }}{{ $store.state.currency.symbol }}</span>
              </div>
            </div>
            </nuxt-link>
          </div>
          
          <nuxt-link
            :to="`/spaces/${cards[2].slug}`"
            class="relative rounded-md w-full transition-all duration-300 group overflow-hidden"
          >
            <nuxt-img
              v-if="cards[2].images[0]"
              alt="gallery"
              class="block lg:h-full w-full h-full object-cover object-center lg:group-hover:h-5/6 transition-all duration-300 overflow-hidden"
              :src="cards[2].images[0].src"
            />
            <div
              class=" p-2 flex flex-col w-full bg-black text-white rounded-br-md rounded-bl-md"
            >
              <span class="star-rating">
                {{ displayStars(cards[2].review.rating) }}
              </span>
              <div class="text-xs font-semibold flex justify-between">
                <span class="block">{{ cards[2].name }}</span>
                <span class="block">{{ cards[2].price.salePrice }}{{ $store.state.currency.symbol }}</span>
              </div>
            </div>
          </nuxt-link>
        </div>

        <div class="flex flex-col gap-2 w-full lg:w-1/2  overflow-hidden">
          <nuxt-link
            :to="`/spaces/${cards[3].slug}`"
            class="relative rounded-md w-full h-full transition-all duration-300 group overflow-hidden"
          >
            <nuxt-img
              v-if="cards[3].images[0]"
              alt="gallery"
              class="block rounded-tr-md rounded-tl-md lg:h-full w-full object-cover object-center  lg:group-hover:h-5/6 transition-all duration-300 overflow-hidden"
              :src="cards[3].images[0].src"
            />
            <div
              class=" p-2 flex flex-col w-full bg-black text-white rounded-br-md rounded-bl-md"
            >
              <span class="star-rating">
                {{ displayStars(cards[3].review.rating) }}
              </span>
              <div class="text-xs font-semibold flex justify-between">
                <span class="block">{{ cards[3].name }}</span>
                <span class="block">{{ cards[3].price.salePrice }}{{ $store.state.currency.symbol }}</span>
              </div>
            </div>
          </nuxt-link>

          <div class="flex flex-col md:flex-row gap-2">
            <nuxt-link
            :to="`/spaces/${cards[4].slug}`"
            class="relative rounded-md w-full lg:w-1/2 transition-all duration-300 group overflow-hidden"
          >
            <nuxt-img
              v-if="cards[4].images[0]"
              alt="gallery"
              class="block rounded-tr-md rounded-tl-md h-3/4 lg:h-full w-full object-cover object-center  lg:group-hover:h-3/4 transition-all duration-300 overflow-hidden"
              :src="cards[4].images[0].src"
            />
            <div
              class="p-2 rounded-br-md rounded-bl-md flex flex-col w-full duration-300 bg-black text-white"
            >
              <span class="star-rating">
                {{ displayStars(cards[4].review.rating) }}
              </span>
              <div class="text-xs font-semibold flex justify-between">
                <span class="block">{{ cards[4].name }}</span>
                <span class="block">{{ cards[4].price.salePrice }}{{ $store.state.currency.symbol }}</span>
              </div>
            </div>
            </nuxt-link>

            <nuxt-link
            :to="`/spaces/${cards[5].slug}`"
            class="relative rounded-md w-full lg:w-1/2 transition-all duration-300 group overflow-hidden" >
            <nuxt-img
              v-if="cards[5].images[0]"
              alt="gallery"
              class="block rounded-tr-md rounded-tl-md h-3/4 lg:h-full w-full object-cover object-center  lg:group-hover:h-3/4 transition-all duration-300 overflow-hidden"
              :src="cards[5].images[0].src" />
            
            <div
              class="p-2 rounded-br-md rounded-bl-md flex flex-col w-full duration-300 bg-black text-white" >
              <span class="star-rating">
                {{ displayStars(cards[5].review.rating) }}
              </span>
              <div class="text-xs font-semibold flex justify-between">
                <span class="block">{{ cards[5].name }}</span>
                <span class="block">{{ cards[5].price.salePrice }}{{ $store.state.currency.symbol }}</span>
              </div>
            </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      
      
    </div>

    <!-- if the store has less than 6 spaces -->
    <sections-Spaces v-if="cards.length >= 1 && cards.length < 6"></sections-Spaces>


    <!-- if the store if empty -->
    <div v-if="cards.length == 0" class="my-6 h-72 flex justify-center text-center items-center bg-gray-200">
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
    };
  },
  async fetch() {
    let filter = { status: "PUBLISH" };
    await this.getCards(filter);
  },

  methods: {
    displayStars(rating) {
      const fullStars = Math.floor(rating); // Get the number of full stars
      const halfStar = rating % 1 >= 0.5; // Check for a half star

      // Create an array with full stars and a half star (if applicable)
      const starArray = Array(fullStars).fill("★");

      if (halfStar) {
        starArray.push("☆"); // Add a half star
      }

      // Fill the remaining space with empty stars (if needed)
      while (starArray.length < 5) {
        starArray.push("☆");
      }

      return starArray.join(""); // Join the stars into a string
    },

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

<style>
/* Define styles for stars and half star */
.star-rating {
  font-size: 18px;
  color: #ffd700;
  display: inline-block;
  white-space: nowrap;
}
</style>
