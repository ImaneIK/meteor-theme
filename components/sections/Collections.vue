<template>
  <div class="py-16 mx-12">
    <h2 class="text-3xl font-semibold mb-8">Explore Our Collections</h2>
    <div class="flex flex-wrap justify-center">
      <div
        v-for="item in $settings.sections.collections"
        class=" py-6 flex items-center justify-center flex-wrap"
      >
        <Nuxt-link :to="`collections/${item.slug}`">
          <div class="bg-white w-64 h-96 shadow-md rounded m-3">
            <div class="h-3/4 w-full">
              <img
                class="w-full h-full object-cover rounded-t"
                :style="`background-image: url(${item.image.src}); height:100%; `"
              />
            </div>
            <div class="w-full h-1/4 p-3">
              <a href="#" class="hover:text-yellow-600 text-gray-700">
                <span class="text-lg font-semibold uppercase tracking-wide">{{
                  item.name
                }}</span>
              </a>
              <p class="text-gray-600 text-sm leading-5 mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </Nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      items: [],
      width: 33.33,
      screenWidth: 1200,
    };
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
