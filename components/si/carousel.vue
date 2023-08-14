<template>
    <div class="container mt-10">
      <!--  -->
      <div class="overflow-hidden carousel-container flex justify-center "   dir="ltr" >
        <div class="flex justify-center carousel mb-6" ref="carouselContainer" :style=" ` width: ${items.length*width*200}% `" >
            <div v-for="(item,i) in items" :key="i" :style="{ backgroundImage: `url(${item.src})` , backgroundSize: 'cover', width: `100%`, height: `15rem`,paddingBottom: `${(item.height / item.width) * 100}%` }"  class="carousel-item p-2" :class="itemClass">
                    <!-- <img
                        :src="item.src"
                        alt="Item Image"
                        class="w-full  shadow-md hover:shadow-lg"
                    /> -->
            </div>
        </div>
      </div>
      <!--  -->
      <div class="m-2 flex justify-center items-center">
        <!-- <div class="flex"> -->
          <button class="p-2 bg-gray-100 rounded-md mx-1 hover:bg-gray-200" @click="move(-1)"><svg class="w-5 h-5 translate" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg></button>
          <div>
            <!-- <h2 class="text-2xl title flex justify-center items-center font-medium">
              <span>{{ this.title }}</span>
            </h2>
            <h4 class="text-center italic">Our collections</h4> -->
          </div>
          <button class="p-2 bg-gray-100 rounded-md mx-1 hover:bg-gray-200" @click="move(1)"><svg class="w-5 h-5 translate" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg></button>
        <!-- </div> -->
      </div>
      <!--  -->
    </div>
  </template>
  <script>
  export default {
      props: {
          title: { type: String, default: '' },
          list: { type: Array, default: [] },
          size: { type: Number, default: 100 },
          component: { type: String, default: null },
          itemClass: { type: String, default: " " },
          defaultWidth: { type: Number, default: 200 },
          defaultHeight: { type: Number, default: 200 }
          
      },
    data() {
      return {
        loading: true,
        items: this.list,
        width: this.defaultWidth,
        parentWidth: 1000,
        height:this.defaultHeight,
      }
    },
    watch: {
      parentWidth(val, oldVal){
        console.log(val, oldVal);
        if(val<640) this.width = 100;
        if(val>=640&&val<768) this.width = 50;
        if(val>=768&&val<1024) this.width = 33.33;
        if(val>=1024) this.width = 25;
      }
    },
    methods: {
      move(n){
        var get = 'pop', set = 'unshift', width = document.querySelector('.carousel-item') ? document.querySelector('.carousel-item').offsetWidth : 360;
        if(n==1){ get='shift', set='push', width =`-${width}` };
        document.querySelector('.carousel').style.transform = `translateX(${width}px)`;
        document.querySelector('.carousel').style.transition = `500ms`;
        setTimeout(() => {
          document.querySelector('.carousel').style.transform = `translateX(0px)`;
          document.querySelector('.carousel').style.transition = `none`;
          const el = this.items[get]();
          this.items[set](el);
        }, 500);
      },

      adjustCarouselHeight() {
      const container = this.$refs.carouselContainer;
      if (container) {
        const children = container.querySelectorAll('.carousel-item');
        let maxHeight = 0;
        children.forEach((child) => {
          const childHeight = child.clientHeight;
          maxHeight = Math.max(maxHeight, childHeight);
        });
        container.style.height = `${maxHeight}px`;
      }
    },
    },
    mounted() {
      this.$nextTick(()=>{
        var element=document.querySelector('.carousel-container')
        if(element) {
          this.parentWidth = element.clientWidth;
          window.onresize = (ev)=>{
            this.parentWidth = element.clientWidth;
          }
        }
      }),
      this.adjustCarouselHeight(); 
    },

   
  };
  </script>
  
  <style scoped>
  .title:before,
  .title:after {
      content: "";
      display: inline-block;
      width: 60px;
      height: 2px;
      background: #222;
      font-weight: 600;
  }
  .title>span {
      margin: 0 30px;
  }
  </style>
  