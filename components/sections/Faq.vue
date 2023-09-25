<template>
  <!--  -->
  <div
    v-if="$settings.sections.about.faq.active" 
    :style="`background:${$settings.sections.styles.colors.secondary}`"
    class="pt-10"
  >
    <div class="mx-auto max-w-6xl">
      <div class="p-2 rounded">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/3 p-4 text-sm" >
            <div class="text-3xl" >
              {{ $settings.sections.about.faq.title }}
            </div>
            <div class="mb-2">
              {{ $settings.sections.about.faq.description }}
            </div>
          </div>
          <div class="md:w-2/3">
            <div class="p-4">
              <!--   -->
              <div
              
                v-for="(item, index) in filteredItems"
                :key="index"
                class="faq-item mb-2" >
                <div
                @click="toggleAccordion(index)"
                  class="font-medium rounded-sm text-lg px-2 py-3 flex text-gray-800 flex-row-reverse mt-2 cursor-pointer text-black bg-white hover:bg-white"
                >
                  <div class="flex-auto">{{ item.question }}</div>
                  <div class="px-2 mt-1">
                    <div class="accordion-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-chevron-down w-5 h-5"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
                <div
                  :class="{ open: item.open }"
                  class="faq-item answer px-2 text-justify text-left text-gray-800 bg-white"
                >
                  {{ item.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleAccordion(index) {
      const item = this.$settings.sections.about.faq.item.filter(item => item !== null)[index];
        this.$set(item, "open", !item.open);
      
    },
  },

  computed: {
    filteredItems() {
      return this.$settings.sections.about.faq.item.filter(item => item !== null);
    },
  },
};
</script>

<style>
.faq-item.answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

.faq-item.answer.open {
  max-height: 100px;
  transition: max-height 0.5s ease-in-out;
}
</style>
