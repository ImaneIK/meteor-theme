<!-- components/BottomBar.vue -->
<template>
   <!-- Bottom navigation links/icons -->
  <div 

    :style="`background: ${this.$settings.sections.mobilenav.styles.background}`"
     class=" fixed bottom-0 left-0 right-0 bg-white text-gray-600 text-xs text-center shadow-md p-4 flex justify-around items-center">
      
      <!-- home page -->
      <nuxt-link
          v-if="$settings.sections.mobilenav.link_1.active"
          class="block flex flex-col justify-center items-center"
          :style="this.$route.path == this.$settings.sections.mobilenav.link_1.url ? `fill:${this.$settings.sections.styles.colors.primary}; color:${this.$settings.sections.styles.colors.primary};` : `fill:${this.$settings.sections.mobilenav.styles.foreground}; color:${this.$settings.sections.mobilenav.styles.foreground};  `" 
          :to= this.$settings.sections.mobilenav.link_1.url>
          <div  v-html= this.$settings.sections.mobilenav.link_1.icon  ></div>
          <span >{{this.$settings.sections.mobilenav.link_1.label}}</span>
      </nuxt-link>

      <!-- search function -->
      <div @click="openModal(); toggleColor()" v-if="$settings.sections.mobilenav.link_2.active">
      <nuxt-link 
        class="block flex flex-col justify-center items-center"
        :style="clicked || $route.path == this.$settings.sections.mobilenav.link_2.url ? `fill:${this.$settings.sections.styles.colors.primary}; color:${this.$settings.sections.styles.colors.primary};` : `fill:${this.$settings.sections.mobilenav.styles.foreground}; color:${this.$settings.sections.mobilenav.styles.foreground};  `" 
        :to= this.$settings.sections.mobilenav.link_2.url>
        <div v-html= this.$settings.sections.mobilenav.link_2.icon  ></div>
        <span >{{this.$settings.sections.mobilenav.link_2.label}}</span>
      </nuxt-link>
      </div>

      <!-- shop -->
      <nuxt-link 
      v-if="$settings.sections.mobilenav.link_3.active"
      class="block flex flex-col justify-center items-center"
        :style="this.$route.path == this.$settings.sections.mobilenav.link_3.url ? `fill:${this.$settings.sections.styles.colors.primary}; color:${this.$settings.sections.styles.colors.primary};` : `fill:${this.$settings.sections.mobilenav.styles.foreground}; color:${this.$settings.sections.mobilenav.styles.foreground};  `" 
        :to= this.$settings.sections.mobilenav.link_3.url >
        <div v-html= this.$settings.sections.mobilenav.link_3.icon></div>
        <span>{{this.$settings.sections.mobilenav.link_3.label}}</span>
      </nuxt-link>
    
      <!-- wishlist -->
      <nuxt-link 
      v-if="$settings.sections.mobilenav.link_4.active"
      class="block flex flex-col justify-center items-center"
        :style="this.$route.path == this.$settings.sections.mobilenav.link_4.url ? `fill:${this.$settings.sections.styles.colors.primary}; color:${this.$settings.sections.styles.colors.primary};` : `fill:${this.$settings.sections.mobilenav.styles.foreground}; color:${this.$settings.sections.mobilenav.styles.foreground};  `" 
        :to= this.$settings.sections.mobilenav.link_4.url >
        <div v-html= this.$settings.sections.mobilenav.link_4.icon></div>
        <span>{{this.$settings.sections.mobilenav.link_4.label}}</span>
      </nuxt-link>

      <!-- settings -->
      <nuxt-link v-if="$settings.sections.mobilenav.link_5.active"
      :to= this.$settings.sections.mobilenav.link_5.url >
        <siBottomDropDown></siBottomDropDown>
      </nuxt-link>
         
    </div>
</template>

<script>
  export default {
    props:{
      openModal:Function,
    },

    data() {
      return {
        clicked: false,
      }
    },

    methods: {
    toggleColor() {
      this.clicked = !this.clicked
    },
  },

  };
</script>