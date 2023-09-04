<template>
   <div class="mt-12 object-center relative w-screen px-6 sm:px-12  lg:px-24 py-12 bg-cover bg-center overflow-hidden" style="background-image: url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdevx.work%2Fblog%2Fwp-content%2Fuploads%2F2021%2F03%2FLOUNGE-01-1920x1024.jpg&f=1&nofb=1&ipt=bc89ea53d39a8da6df1ca59ed5daba3155d44fa3627e5071448aecd5da8be808&ipo=images')">
  <div class="absolute inset-0 bg-black opacity-50"></div>
  

  <div class="relative flex flex-col inset-0 flex items-center justify-center">
  <h1 class="text-3xl m-8 w-full lg:w-1/2 opacity-75 text-center text-white ">{{ $settings.sections.spaces.heading }}</h1>
    <si-SearchBar class="mx-12"  style="z-index: 1"/>
    
  </div>
</div>

</template>

<script>
    export default {
        name:'Banner'
    }
</script>