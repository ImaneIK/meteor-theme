<template>
  <div class="w-full mb-24">
    <div v-if="this.$settings.sections.home.hero.background.active"
      class="relative bg-cover bg-fixed bg-no-repeat"
      :style=" this.$settings.sections.home.hero.background.image ? {
        'background-position': '50%', 'background-image': `url(${this.$settings.sections.home.hero.background.image.src})`, 'height': '110vh', } : {'background':'grey'}" >

        <!-- the content nd search bar -->
        <div
          class="`relative bottom-0 left-0 right-0 top-0 w-full bg-fixed inset-0`"
          :class="this.$settings.sections.home.hero.background.image ?  `h-full` : `h-screen`"
          :style="this.$settings.sections.home.hero.background.image ? { 'background-color': 'rgba(0, 0, 0, 0.5)' } : { } "
        >
          <div class="flex lg:px-24 my-0 md:my-24 lg:my-0 px-8 h-full items-center">
            <div class="text-white">
              
              <div class="w-full text-center lg:text-start">
                <h1 v-if="this.$settings.sections.home.hero.title.third.active"  class="text-xs md:text-sm pb-4">
                <!--   -->
                  <span class="tracking-wide">
                  {{ this.$settings.sections.home.hero.title.third.text }}
                  </span>
                </h1>
                <!--  -->
                <h1 v-if="this.$settings.sections.home.hero.title.main.active" class="mb-6 text-4xl lg:text-5xl lg:w-2/3">
                  {{ this.$settings.sections.home.hero.title.main.text }}
                </h1>
                <!--  -->
                <h3  v-if="this.$settings.sections.home.hero.title.sub.active"  class=" mb-8 text-sm md:text-lg">
                  {{ this.$settings.sections.home.hero.title.sub.text }}
                </h3>
                </div>
                <si-searchBar v-if="this.$settings.sections.home.hero.searchbar.active" class="bg-opacity-20 backdrop-blur-lg backdrop-filter"/>
              </div>
          </div>
        </div>


        <!-- the stats -->
        <div v-if="this.$settings.sections.home.stats.active"
          class="relative grid grid-cols-1 lg:grid-cols-3 gap-8 my-12 mx-8"
          :style="{ marginTop: '-50px' }"
          style="z-index: 1"
        >
          <si-statisticBlock
            :title="this.$settings.sections.home.stats.stat1.text"
            :startValue="0"
            :endValue="parseInt(this.$settings.sections.home.stats.stat1.value)"
            :duration="2000"
          />
          <si-statisticBlock
            :title="this.$settings.sections.home.stats.stat2.text"
            :startValue="0"
            :endValue="parseInt(this.$settings.sections.home.stats.stat2.value)"
            :duration="2500"
          />
          <si-statisticBlock
            :title="this.$settings.sections.home.stats.stat3.text"
            :startValue="0"
            :endValue="parseInt(this.$settings.sections.home.stats.stat3.value)"
            :duration="1500"
          />
        </div> 

     </div>
     </div>
</template>