<template>
  <div class="w-full">
    <div
      
      class="relative bg-cover bg-fixed bg-no-repeat"
      :style=" $settings.sections.herobackground.active ? {
        'background-position': '50%',
        'background-image': `url(${$settings.header.background.src})`,
        height: '110vh',
      } : ''"
    >

      <!-- the content nd search bar -->
      <div
        class="relative bottom-0 left-0 right-0 top-0 h-full w-full bg-fixed inset-0"
        style="background-color: rgba(0, 0, 0, 0.5);"
      >
        <div class="flex lg:px-24 my-0 md:my-24 lg:my-0 px-8 h-full items-center">
          <div class="text-white">
            
            <div class="w-full text-center lg:text-start">
            <h1 v-if="$settings.sections.hero.thirdheading.active" class="text-xs md:text-sm pb-4">
              <span class="  tracking-wide">{{$settings.header.content.thirdheading}}</span>
            </h1>
            <h1 v-if="$settings.sections.hero.mainheading.active" class="mb-6 text-4xl lg:text-5xl lg:w-2/3">
              {{$settings.header.content.mainheading}}
            </h1>
            <h3 v-if="$settings.sections.hero.subheading.active" class=" mb-8 text-sm md:text-lg">
              {{$settings.header.content.subheading}}
            </h3>
            </div>
            <si-searchBar class="bg-opacity-20 backdrop-blur-lg backdrop-filter"/>
          </div>
        </div>
      </div>
    </div>

    <!-- the stats -->
    <div
      class="relative grid grid-cols-1 lg:grid-cols-3 gap-8 my-12 mx-8"
      :style="{ marginTop: '-50px' }"
      style="z-index: 1"
    >
      <si-statisticBlock
        :title="$settings.stats.firststat.text"
        :startValue="0"
        :endValue="parseInt($settings.stats.firststat.number)"
        :duration="2000"
      />
      <si-statisticBlock
        :title="$settings.stats.secondstat.text"
        :startValue="0"
        :endValue="parseInt($settings.stats.secondstat.number)"
        :duration="2500"
      />
      <si-statisticBlock
        :title="$settings.stats.thirdstat.text"
        :startValue="0"
        :endValue="parseInt($settings.stats.thirdstat.number)"
        :duration="1500"
      />
    </div>

     </div>
</template>

<script>
export default {};
</script>
<style>
.glass-effect {
  background-color: rgba(255, 255, 255, 0.1); 
  backdrop-filter: blur(5px); 
}
</style>
