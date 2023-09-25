// components/BottomBarDropdown.vue

<template>
  <div class="bottom-bar-dropdown" :class="{ 'open': isOpen }">
    <!-- Dropdown trigger button -->
    <div @click="toggleDropdown" class="trigger-button block flex flex-col justify-center items-center"
      :style=" isOpen || this.$route.path == this.$settings.sections.mobilenav.link_5.url ? `fill:${this.$settings.sections.styles.color.primary}; color:${this.$settings.sections.styles.color.primary}; ` : `color:${this.$settings.sections.mobilenav.styles.foreground}; fill:${this.$settings.sections.mobilenav.styles.foreground}; `">
      <span
        v-html= $settings.sections.mobilenav.link_5.icon></span>
      <span>{{ $settings.sections.mobilenav.link_5.label }}</span>
    </div>

    <!-- Dropdown content -->
    <div :style="`background: ${this.$settings.sections.mobilenav.styles.background}`"
      class="dropdown-content bg-white p-2 divide-y rounded-md flex flex-column justify-center">
      <!-- Dropdown menu items -->
      <div class="select-wrapper flex flex-no-wrap gap-2 m-1 items-center p-2">
        <label for="language" class="block text-gray-600 ">{{ $settings.sections.mobilenav.link_5.language.label }}</label>
        <select id="language" class="p-1">
          <option v-for="(l, i) in $settings.store_languages" :key="i" @click="changeLanguage(l.code)">
            {{ l.code }}
          </option>
        </select>
      </div>
      <div class="select-wrapper flex flex-no-wrap gap-2 m-1 items-center p-2">
        <label for="currency" class="block text-gray-600">{{ $settings.sections.mobilenav.link_5.currency.label }}</label>
        <select id="currency" class="p-1">
          <option v-for="(l, i) in $settings.store_currencies" :key="i" @click="changeCurrency(l.code)" class="w-full">
            {{ l.code }}
          </option>
        </select>
      </div>
    </div>

  </div>
</template>

<script>
export default {

  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    changeLanguage(code) {
      window.location.href = `?lang=${code}`;
    },
    changeCurrency(code) {
      window.location.href = `?cur=${code}`;
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
/* Define styles for the dropdown */
.bottom-bar-dropdown {
  position: relative;
}

.trigger-button {
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  bottom: 3em;
  right: 0;
  display: none;
  border: 1px solid #ccc;

}

.bottom-bar-dropdown.open .dropdown-content {
  display: block;
}
</style>
