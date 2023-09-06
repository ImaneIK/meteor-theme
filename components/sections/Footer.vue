<template>
<div class=" bg-black text-white w-screen">

    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>

    <div v-if="!loading" class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="flex flex-wrap gap-6 items-center justify-center lg:justify-between">
            <a href="/" class="lg:mx-12 items-center mb-4 sm:mb-0">
              <img :src= image  class="h-16 mr-3" alt="meteor Logo" />
            </a>
            <ul class="flex  gap-8 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 lg:mx-12 dark:text-gray-400">
                <li v-for="link in $settings.footer">
                    <nuxt-link :to= link.url class="mr-4 hover:underline md:mr-6 ">{{link.text}}</nuxt-link>
                </li>
            </ul>
            <ul class="flex gap-4 items-center text-sm font-medium text-gray-500 sm:mb-0 lg:mx-12 dark:text-gray-400">
                <li v-for="link in $settings.social">
                    <nuxt-link :to= link.url class="mr-4 hover:underline md:mr-6 " v-html= link.icon></nuxt-link>
                </li>
            </ul>
        </div>
        
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 text-center dark:text-gray-400">©{{$settings.sections.footer.rights.year}} <a href="/" class="hover:underline">{{$settings.store_name}}™ </a>. {{$settings.sections.footer.rights.text}}.</span>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            image: '',
            loading:true,
        }
    },

    async fetch(){
        this.image=this.$settings.header.logo.src;
        this.loading=false;
    }
}
</script>