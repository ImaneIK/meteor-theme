<template>
    <div
      id="image-track"
      :data-mouse-down-at="mouseDownAt"
      :data-prev-percentage="prevPercentage"
      class="flex gap-4"
      :style="{ transform: `translate(${percentage}%, 0%)` }"
    >
      <nuxt-img
      v-for="(item,i) in items" :key='i' :src="`${item.src}`"
      class="image transition-object duration-500 ease-in-out"
      draggable="false"
      :style="{ objectPosition: `${100 + percentage}% center` }"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
          title: { type: String, default: '' },
          list: { type: Array, default: [] },
          component: { type: String, default: null },
          itemClass: { type: String, default: " " },
      },
   
    data() {
      return {
        loading: true,
        items: this.list,
        mouseDownAt: 0,
        prevPercentage: 0,
        percentage: 0,
       
      };
    },
    methods: {
      onMouseDown(e) {
        this.mouseDownAt = e.clientX;
      },
      onMouseUp(e) {
        this.mouseDownAt = 0;
        this.prevPercentage = this.percentage ;
      },
      onMouseMove(e) {
        if (this.mouseDownAt === 0) return;
  
        const mouseDelta = this.mouseDownAt - e.clientX;
        const maxDelta = window.innerWidth / 2;
        const percentage = (mouseDelta / maxDelta) * -100;
        const nextPercentage = this.prevPercentage + percentage;
      
        this.percentage = Math.min(nextPercentage, 0);
        this.percentage = Math.max(this.percentage, -100);

      

      },
    },
    mounted() {
      window.addEventListener('mousedown', this.onMouseDown);
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('mousemove', this.onMouseMove);
    },
    beforeDestroy() {
      window.removeEventListener('mousedown', this.onMouseDown);
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('mousemove', this.onMouseMove);
    },
  };
  </script>
  
  <style scoped>
  #image-track > img {
    width: 65vmin;
    height: 56vmin;
    object-fit: cover;
  }
  </style>
  