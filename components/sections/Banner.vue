<template>
  <div v-if="this.$settings.sections.shop.banner.active"
    class="mt-12 object-center relative w-full px-6 sm:px-12  lg:px-24 py-12 bg-cover bg-center overflow-hidden"
    :style="this.$settings.sections.shop.banner.background.active && this.$settings.sections.shop.banner.background.image ? ` background-image: url('${$settings.sections.shop.banner.background.image.src}');` : `background:grey;`">
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <div class="relative flex flex-col inset-0 flex items-center justify-center">
      <h1 class="text-sm lg:text-3xl m-8 w-full lg:w-1/2 opacity-75 text-center text-white ">
        {{ this.$settings.sections.shop.banner.content.title }}
      </h1>
      <si-SearchBar v-if="this.$settings.sections.shop.banner.content.searchbar.active" class="mx-12"
        style="z-index: 1" />

    </div>
  </div>
</template>
<script>
export default {

}
</script>