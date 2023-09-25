<template>
  <div
    class="w-full"
    :style="{
      background: background_color ? background_color : 'grey',
      color: text_color ? text_color : 'gray',
    }"
  >
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>

    <div v-if="!loading" class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div
        class="flex flex-col lg:flex-row items-center justify-center lg:justify-between"
      >
        <div class="p-4">
          <template v-if="logo">
            <a href="/"><nuxt-img class="w-24" :src="logo.src" /></a>
          </template>
          <template v-else>
            <span :style="{ color: text_color ? text_color : 'gray' }"
              >No_logo</span
            >
          </template>
          <div
            class="text-xs font-light py-4"
            :style="{ color: text_color ? text_color : 'gray' }"
          >
            {{ $settings.sections.footer.about }}
          </div>
        </div>

        <ul
          class="block flex gap-8 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 lg:mx-12"
        >
          <template v-if="menu">
            <li
              :style="{ color: text_color ? text_color : 'gray' }"
              v-for="(item, i) in menu.items"
              :key="i"
            >
              <a :href="item.url">{{ item.text }}</a>
            </li>
          </template>

          <template v-else>
            <p :style="{ color: text_color ? text_color : 'gray' }">No_menu</p>
          </template>
        </ul>
      </div>

      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />

      <div
        class="px-6 flex gap-6 items-center flex-col-reverse lg:flex-row justify-between"
      >
        <!-- copyrights -->
        <span
          :style="{ color: text_color ? text_color : 'gray' }"
          class="block text-sm text-center"
        >
          <a href="/" class="hover:underline">
            {{ $settings.sections.footer.copyright.store_name }}
            ™ </a
          >.
          {{ $settings.sections.footer.copyright.text }}
        </span>

        <!-- social media -->
        <template v-if="$settings.sections.social">
          <ul
            v-if="
              $settings.sections.footer.social.active &&
              $settings.sections.social.item !== null
            "
            class="mx-auto justify-center flex gap-4 items-center text-sm font-medium text-black sm:mb-0 lg:mx-12"
          >
            <li
              v-for="link in $settings.sections.social.item"
              class="items-center"
            >
              <nuxt-link
                :to="link.url"
                class="mr-4 fill-white hover:underline md:mr-6"
                v-html="link.icon"
              ></nuxt-link>
            </li>
          </ul>
        </template>
        <template v-else>
          <!-- You can place a loader or placeholder content here -->
          <p>Add your social media here</p>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logo: null,
      loading: true,
      background_color: null,
      text_color: null,
      menu: null,
      error: null,
    };
  },

  async fetch() {
    try {
      this.logo = this.$settings.sections.header.logo;
      this.background_color = this.$settings.sections.footer.styles.background;
      this.text_color = this.$settings.sections.footer.styles.fontcolor;
      this.menu = this.$settings.sections.footer.menu;
      this.loading = false;
    } catch (error) {
      console.error("Error fetching data:", error);
      this.error = "An error occurred while fetching data.";
      this.loading = false;
    }
  },
};
</script>
