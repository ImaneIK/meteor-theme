<template>
<div class=" bg-black text-white w-screen">

    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>

    <div v-if="!loading" class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="lg:mx-12 w-1/2 items-center mb-4 sm:mb-0">
              <img :src= image  class="h-16 mr-3" alt="meteor Logo" />
            </a>
            <ul class="flex w-1/2 gap-8 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 lg:mx-12 dark:text-gray-400">
                <li>
                    <a href="/about" class="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="/" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="/" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
                </li>
                <li>
                    <a href="/#contact" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" class="hover:underline">METEOR™</a>. All Rights Reserved.</span>
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