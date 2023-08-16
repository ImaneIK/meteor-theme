<template>
  <div>
    <sections-banner />
    <sections-spaces />
    <sections-blog />
    <sections-footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
      collections: [],
      loading: true,
    };
  },
  async fetch() {
    let filter = { status: "PUBLISH" };
    await this.getCards(filter);
  },
  methods: {
    async getCards(filter) {
      this.loading = true;
      try {
        const { data } = await this.$storeino.products.search(filter);
        const { data2 } = await this.$storeino.collections.search(filter);
        this.cards = data.results;
        this.collections = data2;
      } catch (e) {
        console.log({ e });
      }
      this.loading = false;
    },
  },
};
</script>
