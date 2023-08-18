<template>
  <div class="">
    <sections-banner />

    <div class="my-12 mx-16">
      <!-- section route -->
      <div v-if="item" class="flex items-center bg-white mb-10">
        <div class="flex flex-1 flex-col justify-start items-start">
          <p class="text-xs font-light">
            <nuxt-link to="/">Home</nuxt-link> >
            <nuxt-link :to="`/collections`">Categories</nuxt-link> >
            <nuxt-link :to="`/collections/${item.slug}`">{{ item.slug }}</nuxt-link> >
            <span>Search Results</span>
          </p>
        </div>
      </div>


      <div class="flex flex-row w-full">

        <!-- les variantes -->
        <div class="flex">
    <div class="w-1/4 bg-gray-100 p-4">
      <div class="w-1/4 bg-gray-100 p-4">
      <!-- Price Range Slider -->
      <div class="mb-4">
        <h2 class="text-lg font-semibold mb-2">Price Range</h2>
        <vue-slider
          v-model="priceRange"
          :lazy="true"
          :tooltip="'always'"
          :tooltip-dir="'bottom'"
          :min="minPrice"
          :max="maxPrice"
        ></vue-slider>
        <div class="flex justify-between">
          <span>{{ minPrice }}</span>
          <span>{{ maxPrice }}</span>
        </div>
      </div>
    </div>
      <!-- Filter options -->
      <div class="mb-4">
        <h2 class="text-lg font-semibold mb-2">Filters</h2>
        <label class="block mb-1">Category:</label>
        <select v-model="selectedCategory" class="w-full p-2 border">
          <option value="">All Categories</option>
          <option v-for="category in categories" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <!-- Variants -->
      <div>
        <h2 class="text-lg font-semibold mb-2">Variants</h2>
        <label class="block mb-1">Color:</label>
        <div class="flex gap-2">
          <label
            v-for="color in colors"
            :key="color"
            class="cursor-pointer"
          >
            <input
              type="checkbox"
              :value="color"
              v-model="selectedColors"
            />
            {{ color }}
          </label>
        </div>
      </div>
    </div>
    <div class="flex-1 p-4">
      <!-- Display products here -->
    </div>
  </div>


        <!-- search results -->
        <div class="flex flex-col my-2 justify-end">
        <div
        v-for="(product, i) in items"
        :key="i"
          class="flex max-w-2xl mx-auto w-full bg-white rounded-sm shadow-md"
        >
          <div class="">
            <img
              class="object-cover w-full h-full"
              :src="product.images[0].src"
              :alt="product.title"
            />
          </div>

          <div class="p-6">
            {{ product.name }}

            <p
              class="mt-2 text-xs text-gray-400 text-slate-500 hidden sm:block md:block lg:block"
            >
              {{ product.description }}
            </p>

            <div class="flex flex-col md:flex-row py-4">
              <div class="md:pr-4 my-2 md:my-0">
                <span
                  class="bg-black rounded-full px-3 py-1 text-xs text-white font-semibold"
                  >{{ product.collections[0].name }}</span
                >
              </div>

              <div class="md:pl-4">
                <span
                  class="bg-black rounded-full px-3 py-1 text-sm text-white font-semibold"
                >
                  {{ product.price.salePrice }}$
                </span>
              </div>
            </div>

            <NuxtLink
              class="block underline underline-offset-4 px-3 text-xs font-semibold mb-4"
              :to="`/spaces/${product.slug}`"
              >Book Now <fa class="text-amber-600" :icon="['fas', 'arrow-right']"
            /></NuxtLink>
          </div>
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
      items: [],
      item: null,
      loading: true,
    };
  },
  async fetch() {
    this.loading = true;

    const { data: productData } = await this.$storeino.products.search({
      status: "PUBLISH",
    });

    try {
      const collectionSlug = this.$route.params.slug;
      const selectedCollection = this.$settings.sections.collections.find(
        (collection) => collection.slug === collectionSlug
      );
      this.item = selectedCollection;

      const selectedProducts = productData.results.filter((product) => {
        return product.collections.some(
          (category) => category.slug === selectedCollection.slug
        );
      });
      this.items = selectedProducts;

      console.log("blablabla");
      console.log(
        productData.results.filter((product) => {
          return product.collections.some((category) => category.slug === "private-desk");
        })
      );

      //const { data: results } = await this.$storeino.products.search({
      //parent: selectedCollection._id,
      //});
      //this.items = results;
    } catch (e) {
      console.log({ e });
    }
    this.loading = false;
  },
  mounted() {
    this.$storeino.fbpx("PageView");
  },
};
</script>
