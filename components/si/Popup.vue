<template>
    <div>
      <section class="rounded-3xl shadow-2xl bg-white" v-if="isPopupVisible">
        <div class="p-8 text-center sm:p-12">
          <span @click="closePopup">Close</span>
          <p class="text-sm font-semibold uppercase tracking-widest text-pink-500">{{ title }}</p>
          <h2 class="mt-2 text-3xl font-bold">{{ message }}</h2>
          <si-SearchBar></si-SearchBar>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      message: String,
    },
    data() {
      return {
        isPopupVisible: false,
      };
    },
    methods: {
      closePopup() {
        // Emit an event to signal that the popup should be closed
        this.$emit("close");
      },
    },
  };
  </script>
  