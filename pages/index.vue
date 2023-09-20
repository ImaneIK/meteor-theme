<template>
  <div>
    <sections-header v-if="$settings.sections.header.active"/>
    <sections-collections v-if="$settings.sections.collectionsSection.active" />
    <sections-Locations  v-if="$settings.sections.locationsSection.active"/>
    <si-Gallery v-if="$settings.sections.gallery.active" ></si-Gallery>
    <sections-Features v-if="$settings.sections.features.active"/>

  
    <sections-blog v-if="$settings.sections.blogSection.active"/>
    <sections-Contact v-if="$settings.sections.contactSection.active"></sections-Contact> 
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods:{
   
  }
}
</script>
