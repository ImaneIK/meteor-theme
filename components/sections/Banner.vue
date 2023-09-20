<template>
   <div class="mt-12 object-center relative w-full px-6 sm:px-12  lg:px-24 py-12 bg-cover bg-center overflow-hidden" 
   :style=" ` background-image: url('${$settings.header.banner.shop.src}');`">
      <div class="absolute inset-0 bg-black opacity-50"></div>
  

  <div class="relative flex flex-col inset-0 flex items-center justify-center">
  <h1 class="text-sm lg:text-3xl m-8 w-full lg:w-1/2 opacity-75 text-center text-white ">{{ $settings.sections.spaces.heading }}</h1>
    <!-- <si-SearchBar class="mx-12"  style="z-index: 1"/> -->
    
  </div>
</div>

</template>

<script>
    export default {
        name:'Banner'
    }
</script>