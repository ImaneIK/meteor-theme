<!-- components/BottomBar.vue -->
<template>
    <div :style="`background: ${$settings.mobilenav.background}`" class=" fixed bottom-0 left-0 right-0 bg-white text-gray-600 text-xs text-center shadow-md p-4 flex justify-around items-center">
      <!-- Bottom navigation links/icons -->
      <nuxt-link :style="`color:${$settings.mobilenav.link.color}; `"  :to= $settings.mobilenav.home.link class="">
        <span :style="`fill:${$settings.mobilenav.link.color};`" v-html= $settings.mobilenav.home.icon></span>
        <span >{{$settings.mobilenav.home.label}}</span>
      </nuxt-link>

      <nuxt-link :style="`color:${$settings.mobilenav.link.color}; `"  :to= $settings.mobilenav.settings.link class="text-gray-600">
        <siBottomDropDown></siBottomDropDown>
      </nuxt-link>

      <nuxt-link :style="`color:${$settings.mobilenav.link.color}; `"  :to= $settings.mobilenav.explore.link class="text-gray-600">
        <span class="text-gray-500" v-html= $settings.mobilenav.explore.icon></span>
        <span>{{$settings.mobilenav.explore.label}}</span>
      </nuxt-link>

      <nuxt-link  :style="`color:${$settings.mobilenav.link.color}; `" :to= $settings.mobilenav.wishlist.link class="text-gray-600">
        <span class="text-gray-500" v-html= $settings.mobilenav.wishlist.icon></span>
        <span>{{$settings.mobilenav.wishlist.label}}</span>
      </nuxt-link>

      <nuxt-link :style="`color:${$settings.mobilenav.link.color}; `" :to= $settings.mobilenav.explore.link  @click="openModal" class=" text-gray-600">
        <span class="text-gray-500" v-html= $settings.mobilenav.search.icon></span>
        <span>{{$settings.mobilenav.search.label}}</span>
      </nuxt-link>
        
    </div>
</template>
  
<script>
  export default {
    props:{
      openModal:Function,
    },
    name: 'BottomBar',
  };
</script>

  