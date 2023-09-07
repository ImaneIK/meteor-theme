<template>
    <div class="py-12 px-4 ">
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>
    <div v-if="!loading" class="bg-white">
    <div class="mx-auto py-4 lg:max-w-7xl lg:px-8 ">

      <div class="flex flex-col gap-4 md:flex-row justify-start md:justify-between items-center">
        <div>
              <h1 class="text-2xl font-normal text-gray-800 capitalize lg:text-3xl">
                {{ $settings.sections.heading.collections}}
              </h1>

              <div class="mt-2">
                <span class="inline-block w-40 h-1 bg-amber-500 rounded-full"></span>
                <span class="inline-block w-3 h-1 ml-1 bg-amber-500 rounded-full"></span>
                <span class="inline-block w-1 h-1 ml-1 bg-amber-500 rounded-full"></span>
              </div>
        </div>
        <nuxt-link :to="`/shop`" class="text-sm text-amber-500 underline decoration-amber-500 p-2 ">{{$settings.sections.posts.button.text}}</nuxt-link>
      </div>
      
<div class="overflow-hidden sm:overflow-auto ">
<div  class="w-screen lg:w-full flex flex-no-wrap overflow-x-scroll scrolling-touch lg:overflow-x-auto lg:scrolling-auto mt-6 lg:grid gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="(card,index) in cards" :key="card.slug" class="group flex-shrink-0 w-full sm:w-1/2 lg:w-auto relative lg:transition-transform lg:duration-300 lg:ease-in-out lg:transform hover:-translate-y-2">
          <nuxt-link :to="`/collections/${card.slug}`" class="block rounded-md aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-gray-200 lg:aspect-none  lg:h-80">
            <nuxt-img :src="card.image.src" class="h-80 w-full object-cover object-center lg:h-full lg:w-full brightness-75 lg:group-hover:brightness-50" />
            <p aria-hidden="true" class="lg:absolute lg:inset-0 p-4 bg-black lg:bg-transparent text-white font-medium" >{{ card.name }} <br/>{{ itemCount[index] }} items</p>
            
          </nuxt-link>
        
        
        </div>
      </div></div>
      
    </div>
  </div>
  </div>
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
    if (this.$settings.sections.locations.length > 0) {
      // Fetch locations from settings
      this.cards = this.$settings.sections.collections;
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