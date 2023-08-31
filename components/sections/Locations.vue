<template>
    <div class="mx-12">
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>
    <div v-if="!loading" class="bg-white">
    <div class="mx-auto max-w-2xl px-4 sm:px-6 py-4 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Our collections</h2>

      <div  class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="card in cards" :key="card.slug" class="group rounded-md relative">
          <nuxt-link :to="`/collections/${card.slug}`" class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img :src="card.image.src" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </nuxt-link>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <nuxt-link :to="`/collections/${card.slug}`">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ card.name }}
                </nuxt-link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default{
    data() {
    return {
      loading: false,
      cards: [],
    };
  },

  async fetch() {
    try {
      const filter = { status: "PUBLISH" };
      if (this.$settings.sections.collections.length > 0) {
        this.cards = this.$settings.sections.collections;
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