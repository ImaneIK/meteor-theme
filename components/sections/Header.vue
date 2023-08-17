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
            
            <div class="w-full lg:w-1/2">
            <h1 class="text-xs md:text-sm pb-2">
              <span class="tracking-wide">WELCOME TO SPACEHUB</span>
            </h1>
            <h1 class="mb-6 text-3xl md:text-5xl">
              The Workplace Will Not Feel Like a Place of Work
              Anymore.
            </h1>
            <h3 class="mb-8 text-sm md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </h3>
            </div>
            <si-searchBar />
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
        title="Active members"
        :startValue="0"
        :endValue="100"
        :duration="2000"
      />
      <si-statisticBlock
        title="Available spaces"
        :startValue="0"
        :endValue="20"
        :duration="2500"
      />
      <si-statisticBlock
        title="Positive reviews"
        :startValue="0"
        :endValue="10"
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
