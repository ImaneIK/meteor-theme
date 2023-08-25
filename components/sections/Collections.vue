<template>
  <div class="py-16">
    
    <div class="blur-fade-dark" :style="`background-image:url(${$settings.sections.collections[currentIndex].image.src}); `">
      <section 
       >
        <div 
          class="mx-24 max-w-[1340px] px-4 sm:px-6 sm:py-24 lg:me-0 lg:pe-0 lg:ps-8"
        >
          <div
            class="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:items-center lg:gap-x-16"
          >
            <div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <div class="font-semibold">
                <h1 class="text-sm">
                  <span class="text-orange-600 tracking-wide">BLOG NEWS</span>
                </h1>
                <p class=" text-4xl font-normal w-full md:w-full">
                  Choose the space that suits<br />
                  you and your team
                </p>
              </div>

              <div class="flex  justify-center gap-8">
                <button
                  @click="prevItem"
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
                  @click="nextItem"
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

            <div class=" ">
              <div class="swiper-container !overflow-hidden">
                <div class="carousel">
                  <div
                    class="carousel-inner"
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
                  >
                    <div
                      v-for="item in $settings.sections.collections"
                      class="carousel-item py-6 flex items-center justify-center flex-wrap"
                    >
                    
                      <Nuxt-link class="swiper-slide" :to="`collections/${item.slug}`">
                        <div class="bg-white w-56 h-96 shadow-md rounded-md mx-2">
                          <div class="h-3/4 w-full">
                            <img
                              class="w-full h-full object-cover rounded-t"
                              :src="item.image.src"
                            />
                          </div>
                          <div class="w-full h-1/4 p-3 bg-black text-white">
                            <a href="#" class="hover:text-yellow-600">
                              <span
                                class="text-lg font-semibold uppercase tracking-wide"
                                >{{ item.name }}</span
                              >
                            </a>
                            <p class="text-sm leading-5 mt-1">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                          </div>
                        </div>
                      </Nuxt-link>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
      loading: true,
      items: [],
      width: 33.33,
      screenWidth: 1200,
    };
  },

  computed: {
    innerStyle() {
      const transform = `translateX(-${this.currentIndex * 100}%)`;
      return {
        transform,
      };
    },
  },
  watch: {
    screenWidth(val) {
      if (val < 640) this.width = 100;
      if (val >= 640 && val < 768) this.width = 50;
      if (val >= 768 && val < 1024) this.width = 33.33;
      if (val >= 1024) this.width = 25;
    },
  },
  async fetch() {
    try {
      const filter = { status: "PUBLISH" };
      if (this.$settings.sections.collections.length > 0) {
        this.items = this.$settings.sections.collections;
        // console.log(this.items[0]);
      } else {
        const { data } = await this.$storeino.collections.search(filter);
        this.items = data;
        // console.log("sections here");
        // console.log(this.items[0]);
      }
    } catch (e) {
      console.log({ e });
    }
    this.loading = false;
    if (process.client) {
    }
  },
  methods: {
    nextItem() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },

    prevItem() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    },
    move(n) {
      if (!document.querySelector(".carousel-item")) return;
      var get = "pop",
        set = "unshift",
        width = document.querySelector(".carousel-item").offsetWidth;
      if (n == 1) {
        (get = "shift"), (set = "push"), (width = `-${width}`);
      }
      document.querySelector(".carousel").style.transform = `translateX(${width}px)`;
      document.querySelector(".carousel").style.transition = `500ms`;
      setTimeout(() => {
        document.querySelector(".carousel").style.transform = `translateX(0px)`;
        document.querySelector(".carousel").style.transition = `none`;
        const el = this.items[get]();
        this.items[set](el);
      }, 500);
    },
  },
  mounted() {
    this.screenWidth = window.innerWidth;
    window.onresize = (ev) => {
      this.screenWidth = window.innerWidth;
    };
  },
};
</script>

<style>



.blur-fade-dark::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(8px); /* Apply a blur effect */
  opacity: 0.6; /* Apply a faded effect */
}

.blur-fade-dark > .content {
  z-index: 1; /* Place the content above the pseudo-element */
}

.blur-fade-dark > .content img {
  /* Reset any filters applied to images inside the content */
  filter: none;
}


.carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  flex: 0 0 100%;
  text-align: center;
  padding: 10px;
 
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}

.carousel-button:hover {
  background-color: #555;
}

@keyframes slideLoop {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(0);
  }
  25%,
  45% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(-100%);
  }
  70%,
  100% {
    transform: translateX(0);
  }
}
</style>
