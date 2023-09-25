<template>
    <div class="zoom relative w-full flex flex-col h-full bg-white overflow-hidden">
        <nuxt-link class="flex pb-full relative" :to="item.childrens.length > 0 ? `/collections/${item.slug}` : `/shop/${item.slug}`">
            <si-image v-if="item.image" width="400" height="400" class="image_zoom h-full w-full absolute inset-0 object-cover" :src="item.image.src" :alt="item.name"/>
        </nuxt-link>
        <div class="text_card">
          <nuxt-link :to="item.childrens.length > 0 ? `/collections/${item.slug}` : `/shop/${item.slug}`">
              <div class="text_name">{{ item.name }} <span v-if="item.childrens.length > 0">({{ item.childrens.length }})</span></div>
          </nuxt-link>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    }
}
</script>

<style scoped>
.image_zoom {
transition: transform 3s;
}

.image_zoom:hover{
transform: scale(1.5);
}

.text_card {
  position: absolute;
bottom: 20px;
left: 50%;
font-size: 12px;
font-weight: 600;
background: #fff;
color: #222;
padding: 12px 20px;
box-shadow: 1px 1px 0 0 rgb(0 0 0 / 10%);
min-width: 150px;
text-align: center;
-webkit-transform: translateX(-50%);
transform: translateX(-50%);
}
.text_card .text_name {
  font-weight: 600;
  color: #222;
  letter-spacing: 0px;
  line-height: 1.428;
}
</style>

