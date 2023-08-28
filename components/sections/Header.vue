<template>
  <div>
    <div
      class="overflow-hidden bg-fixed bg-no-repeat"
      :style="{
        'background-position': '50%',
        'background-image': `url(${$settings.header.background.src})`,
        height: '110vh',
      }"
    >

      <!-- the content nd search bar -->
      <div
        class="relative bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed inset-0"
        style="background-color: rgba(0, 0, 0, 0.5)"
      >
        <div class="flex md:px-24 px-8 h-full items-center">
          <div class="text-white">
            
            <div class="w-full lg:w-2/3">
            <h1 class="text-xs md:text-sm pb-4 text-center lg:text-left">
              <span class="  tracking-wide">{{$settings.header.content.thirdheading}}</span>
            </h1>
            <h1 class="mb-6 text-4xl text-center lg:text-left lg:text-5xl">
              {{$settings.header.content.mainheading}}
            </h1>
            <h3 class=" text-center lg:text-left mb-8 text-sm md:text-lg">
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
      class="relative grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 mx-4"
      :style="{ marginTop: '-50px' }"
      style="z-index: 1"
    >
      <si-statisticBlock
        :title="$settings.stats.firststat.text"
        :startValue="0"
        :endValue="$settings.stats.firststat.number"
        :duration="2000"
      />
      <si-statisticBlock
        :title="$settings.stats.secondstat.text"
        :startValue="0"
        :endValue="$settings.stats.secondstat.number"
        :duration="2500"
      />
      <si-statisticBlock
        :title="$settings.stats.thirdstat.text"
        :startValue="0"
        :endValue="$settings.stats.thirdstat.number"
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
