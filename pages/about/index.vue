<template>
  <div>
    <div
      v-if="$settings.sections.about.banner.active"
      class="mt-12 object-center relative w-full px-6 sm:px-12 lg:px-24 py-12 bg-cover bg-center overflow-hidden"
      :style="
        $settings.sections.about.banner.active &&
        $settings.sections.about.banner.background
          ? ` background-image: url('${$settings.sections.sections.about.banner.background.src}');`
          : `background:grey;`
      "
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>

      <div
        class="relative flex flex-col inset-0 flex items-center justify-center"
      >
        <h1
          class="text-sm lg:text-3xl m-8 w-full lg:w-1/2 opacity-75 text-center text-white"
        >
          {{ this.$settings.sections.about.banner.title }}
        </h1>
        <si-SearchBar
          v-if="$settings.sections.about.banner.search.active"
          class="mx-12"
          style="z-index: 1"
        />
      </div>
    </div>
    <sections-about
      v-if="$settings.sections.about.aboutSection.active"
    ></sections-about>
    <sections-Features v-if="$settings.sections.about.servicesSection.active" />
    <sections-Culture
      v-if="$settings.sections.about.cultureSection.active"
    ></sections-Culture>
    <sections-Faq v-if="$settings.sections.about.faq.active" />
    <sections-blog v-if="$settings.sections.about.blog.active" />
  </div>
</template>
<script></script>
