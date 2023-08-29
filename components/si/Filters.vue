<template>
  <!-- the filters -->
  <div class=" flex flex-col mr-2 text-xs text-gray-600 font-light  ">
    <div class="flex justify-between block pb-4 px-4 mb-4 border-b-2 ">
      Filter by:
      <button
        type="button"
        @click="resetFilters"
        class=" block text-sm text-gray-900 underline underline-offset-4"
      >
        Reset
      </button>
    </div>

    <div class="flex flex-col items-center gap-8 divide-y">
      <!-- the price range filter -->
        <div
          class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
        >
          <div class="w-96 rounded bg-white">
            <header class="flex items-center justify-between p-4">
              <span class="text-sm text-gray-700"> Price </span>

              <button
                type="button"
                @click="applyFilters"
                class="text-sm text-gray-900 underline underline-offset-4"
              >
                Done
              </button>
            </header>

            <div class="border-t border-gray-200 p-4">
              <div class="flex justify-between gap-4">
                <label for="FilterPriceFrom" class="flex items-center gap-2">
                  <span class="text-sm text-gray-600">$</span>

                  <input
                    type="number"
                    id="FilterPriceFrom"
                    placeholder="From"
                    v-model="selectedFilters.priceFrom"
                    class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </label>

                <label for="FilterPriceTo" class="flex items-center gap-2">
                  <span class="text-sm text-gray-600">$</span>

                  <input
                    type="number"
                    id="FilterPriceTo"
                    placeholder="To"
                    v-model="selectedFilters.priceTo"
                    class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

      <!-- the collection filter selector -->
      <div
        class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
      >
        <div class="w-96 rounded bg-white">
          <header class="flex items-center justify-between p-4">
            <span class="text-sm text-gray-700"> Categories </span>

            <button
              type="button"
              @click="applyFilters"
              class="text-sm text-gray-900 underline underline-offset-4"
            >
              Done
            </button>
          </header>

          <ul class="space-y-1 border-t border-gray-200 p-4">
            <li v-for="item in $settings.sections.collections">
              <label for="FilterInStock" class="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  :id="item.slug"
                  :value="item.slug"
                  v-model="selectedFilters.attributes"
                  class="h-5 w-5 rounded border-gray-300"
                />

                <span class="text-gray-700 text-xs font-light">
                  {{ item.name }}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>


      <!-- the location filter selector -->
      <div
        class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
      >
        <div class="w-96 rounded bg-white">
          <header class="flex items-center justify-between p-4">
            <span class="text-sm text-gray-700"> Locations </span>

            <button
              type="button"
              @click="applyFilters"
              class="text-sm text-gray-900 underline underline-offset-4"
            >
              Done
            </button>
          </header>

          <ul class="space-y-1 border-t border-gray-200 p-4">
            <li v-for="item in $settings.sections.locations">
              <label for="FilterInStock" class="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  :id="item.slug"
                  :value="item.slug"
                  v-model="selectedFilters.attributes"
                  class="h-5 w-5 rounded border-gray-300"
                />

                <span class="text-gray-700 text-xs font-light">
                  {{ item.name }}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <!-- the Services filter selector -->
      <div
        class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
      >
        <div class="w-96 bg-white">
          <header class="flex items-center justify-between p-4">
            <span class="text-sm text-gray-700"> Facilities </span>

            <button
              type="button"
              @click="applyFilters"
              class="text-sm text-gray-900 underline underline-offset-4"
            >
              Done
            </button>
          </header>

          <ul class="space-y-1 border-t border-gray-200 p-4">
            <li v-for="item in $settings.sections.services">
              <label for="FilterInStock" class="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  :id="item.slug"
                  :value="item.slug"
                  v-model="selectedFilters.services"
                  class="h-5 w-5 rounded border-gray-300"
                />

                <span class="text-gray-700 text-xs font-light">
                  {{ item.name }}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedFilters"],

  methods: {
    handlePriceInput() {
      // Remove non-numeric characters and format as number with 2 decimal places
      if (this.selectedFilters.priceFrom) {
        this.selectedFilters.priceFrom = parseFloat(
          this.selectedFilters.priceFrom.replace(/[^\d.]/g, "")
        ).toFixed(2);
      }
      if (this.selectedFilters.priceTo) {
        this.selectedFilters.priceTo = parseFloat(
          this.selectedFilters.priceTo.replace(/[^\d.]/g, "")
        ).toFixed(2);
      }
    },

    applyFilters() {
      // Emit an event to parent component with selectedFilters data
      this.$emit("apply-filters");
    },

    resetFilters() {
      this.$emit("reset-filters");
    },
  },
};
</script>
