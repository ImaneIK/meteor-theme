<template>
  <div>

    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>
  
    <div v-if="!loading" class="my-12 px-2 lg:px-24 py-4 bg-black flex flex-col lg:gap-16 lg:flex-row items-center text-white ">
      
      <div >
        <h1 class="text-2xl font-normal text-white capitalize lg:text-3xl text-center lg:text-left">
          
          {{ $settings.sections.heading.locations }}
          
        </h1>
  
        <div class="mt-2">
          <span class="inline-block w-40 h-1 bg-amber-500 rounded-full"></span>
          <span class="inline-block w-3 h-1 ml-1 bg-amber-500 rounded-full"></span>
          <span class="inline-block w-1 h-1 ml-1 bg-amber-500 rounded-full"></span>
        </div>
      </div>
  
  
        <div class="w-8/12 flex flex-col mx-auto">          
          <div id="sliderContainer" class=" overflow-hidden">
              <ul  ref="slider" id="slider" class="flex  overflow-hidden items-center">
                  
                  <li v-for="(item, index) in items" :key="index"  class=" p-5 overflow-hidden" >
                      <nuxt-link :to="`/collections/${item.slug}`" class="block relative rounded-lg transition-all duration-300 group overflow-hidden ">
                         
                         <div class=" rounded-md overflow-hidden h-full group-hover:h-3/4 transition-all duration-300 ">
                            <img class=" image h-72 w-full object-cover rounded-md hover:transition-all duration-300" :src="item.image.src"  alt="" />                         
                         </div> 
                          
                         <div
                  class="absolute w-full p-2 bottom-0 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-white overflow-hidden"
                >
                  <h2 class="flex items-center">
                    <svg class="block items-center" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ff8000}</style><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                   <span class="block px-2"> {{ item.name }}</span>
                  </h2>
                  <p class="text-xs font-light text-gray-500"> {{ itemCount[index] }} items</p>
                  <!-- {{ itemCount[index] }} -->
                </div>
                          
                      </nuxt-link>
                  </li>


                  <li class="p-5">
            <nuxt-link
              :to="`/shop`"
              class="border h-full py-16 flex flex-col items-center gap-8 rounded-md overflow-hidden"
            >
             
                <svg
                  class="block fill-gray-600 p-4 w-1/3 h-1/3 object-cover rounded-md"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
                  />
                </svg>
                <h2 class="block text-gray-500 text-center">{{$settings.sections.posts.button.text}}</h2>
            
            </nuxt-link>
          </li>
                  
  
              </ul>
          </div>
  
          <div class=" flex gap-8 mx-8 justify-center lg:justify-end">
              <button
              @click="prev"
                class="rounded-full border border-amber-600 p-3 text-amber-600 hover:bg-amber-600 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 rtl:rotate-180"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
              @click="next"
                class="rounded-full border border-amber-600 p-3 text-amber-600 hover:bg-amber-600 hover:text-white"
              >
                <svg
                  class="h-5 w-5 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </button>
          </div>
        </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      items:[],
      itemCount:[],
      slider: null,
      cards: [],
      elementsToShow: 3,
      cardWidth: 0,
      loading:false,
    };
  },

  async fetch() {
  try {
    const filter = { status: "PUBLISH" };
    if (this.$settings.sections.locations.length > 0) {
      // Fetch locations from settings
      this.items = this.$settings.sections.locations;
      const searchData = await this.$storeino.products.search(filter);

      // Initialize an array to store the counts
      this.itemCount = this.items.map((item) => {
        // Count the number of matches between item.name and collection names
        return searchData.data.results.reduce((count, result) => {
          return count + result.collections.filter((collection) => {
            return collection.slug === item.slug;
          }).length;
        }, 0);
      });

      // Now 'counts' is an array of counts, where each count represents matches for the corresponding item in 'items'
      // console.log(this.itemCount);
    } else {
      const { data } = await this.$storeino.collections.search(filter);
      this.items = data;
    }
  } catch (e) {
    console.log({ e });
  }
  this.loading = false;
},


  mounted() {
    this.slider = this.$refs.slider;
    this.cards = this.slider.getElementsByTagName('li');
    this.initCarousel();
  },
  methods: {
    
    initCarousel() {
      let sliderContainerWidth = this.slider.clientWidth;

      if (document.body.clientWidth < 1000) {
        this.elementsToShow = 1;
      } else if (document.body.clientWidth < 1500) {
        this.elementsToShow = 2;
      }

      this.cardWidth = sliderContainerWidth / this.elementsToShow;

      this.slider.style.width = this.cards.length * this.cardWidth + 'px';
      this.slider.style.transition = 'margin';
      this.slider.style.transitionDuration = '1s';

      for (let index = 0; index < this.cards.length; index++) {
        const element = this.cards[index];
        element.style.width = this.cardWidth + 'px';
      }
    },
    prev() {
      if (+this.slider.style.marginLeft.slice(0, -2) !== -this.cardWidth * (this.cards.length - this.elementsToShow)) {
        this.slider.style.marginLeft = (+this.slider.style.marginLeft.slice(0, -2) - this.cardWidth) + 'px';
      }
      if (+this.slider.style.marginRight.slice(0, -2) !== -this.cardWidth * (this.cards.length - this.elementsToShow)) {
        this.slider.style.marginRight = (+this.slider.style.marginRight.slice(0, -2) - this.cardWidth) + 'px';
      }
    },
    next() {
      if (+this.slider.style.marginLeft.slice(0, -2) !== 0) {
        this.slider.style.marginLeft = (+this.slider.style.marginLeft.slice(0, -2) + this.cardWidth) + 'px';
      }
      if (+this.slider.style.marginRight.slice(0, -2) !== 0) {
        this.slider.style.marginRight = (+this.slider.style.marginLeft.slice(0, -2) + this.cardWidth) + 'px';
      }
    },
  },
};
</script>

<style>
  /* Hide the description by default */
.group .absolute {
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}

/* Show the description when hovering over the card */
.group:hover .absolute {
  opacity: 1;
}

/* Expand the card when hovering */
.group .relative {
  height: auto;
  transition: height 0.4s ease-in-out;
}

.group:hover .relative {
  height: 100%;
}

/* Apply image transition on hover */
.group .rounded-md:hover .image {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
}

/* Lift the card on hover */
.group .relative:hover {
  transform: translateY(-2px);
}
</style>