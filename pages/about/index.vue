<template>
  <div>
    <sections-banner v-if="$settings.sections.shopBanner.active" />
    <sections-about v-if="$settings.sections.aboutSection.active"></sections-about>
    <sections-Features v-if="$settings.sections.features.active"/>
    <sections-Team v-if="$settings.sections.teamSection.active"></sections-Team>
    <sections-Faq v-if="$settings.sections.faqSection.active"/>
    <sections-blog v-if="$settings.sections.blogSection.active"/>
  </div>
</template>

<script>
export default {
  
};
</script>

