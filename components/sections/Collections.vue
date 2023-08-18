<template>
  <div class="py-16 px-4 md:px-8 lg:px-16">
    <h2 class="text-3xl font-semibold mb-8">Explore Our Collections</h2>
    <div class="flex flex-col md:flex-row">
    
      <div
    v-for="item in $settings.sections.collections"
      class="w-full m-2"
    >

      <div :style="`background-image: url(${item.image.src}); height:100%; `" class="block object-cover bg-white shadow-md p-6">
        <h3 class="text-lg font-semibold mb-2">{{ item.name }}</h3>
        <!-- <p class="text-gray-600">{{ item }}</p> -->
        <Nuxt-link class="text-xs" :to="`collections/${item.slug}`"
          >view spaces</Nuxt-link>
      </div>

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
