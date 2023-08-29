<template>
  <section class=" px-2 lg:px-24 py-4 bg-black flex flex-col lg:gap-16 lg:flex-row items-center text-white ">
      
      <div class="w-full lg:w-4/12 flex flex-col text-center lg:text-left items-center lg:items-start justify-center p-8">
        <h4 class="font-normal text-amber-600 text-xs">OUR COLLECTION</h4>
        <h1 class="mt-2 font-semibold text-xl ">Choose the space that suits you and your team</h1>
        <p class="mt-2 text-gray-400 text-xs font-light">Our vareity of spaces are carefully prepared to make you feel more productive and help you acheive your goals.</p>
        <nuxt-link :to="`/shop`" type="button"  class="my-4 p-2 rounded-md text-white text-xs bg-amber-600 w-fit">Explore more</nuxt-link>
      </div>


      <div class="w-8/12 flex flex-col mx-auto">          
        <div id="sliderContainer" class=" overflow-hidden">
            <ul  ref="slider" id="slider" class="flex  overflow-hidden items-center">
                
                <li v-for="(item, index) in items" :key="index"  class=" p-5 overflow-hidden" >
                    <nuxt-link :to="`/collections/${item.slug}`" class="block relative rounded-lg transition-all duration-300 group overflow-hidden ">
                       
                       <div class=" rounded-md overflow-hidden h-full group-hover:h-3/4 transition-all duration-300 ">
                        <img class="h-72 w-full object-cover rounded-md hover:transition-all duration-300" :src="item.image.src"  alt="">
                        
                       </div> 
                        
                       <div class="absolute w-full p-2 bottom-0 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-white overflow-hidden">
                          <h2>{{item.name}}</h2>
                          <p>lorem ipsum</p>
                        </div>
                        
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      items:[],
      slider: null,
      cards: [],
      elementsToShow: 3,
      cardWidth: 0,
    };
  },

  async fetch() {
    try {
      const filter = { status: "PUBLISH" };
      if (this.$settings.sections.locations.length > 0) {
        this.items = this.$settings.sections.locations;
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
    },
    next() {
      if (+this.slider.style.marginLeft.slice(0, -2) !== 0) {
        this.slider.style.marginLeft = (+this.slider.style.marginLeft.slice(0, -2) + this.cardWidth) + 'px';
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
.group .rounded-md:hover img {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
}

/* Lift the card on hover */
.group .relative:hover {
  transform: translateY(-2px);
}
</style>
