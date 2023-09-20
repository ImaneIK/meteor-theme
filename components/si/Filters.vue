<template>
  <!-- the filters -->
  <div class=" flex flex-col mr-2 text-xs text-gray-600 font-light  ">



    <div class="flex justify-between block pb-4 px-4">
      {{$settings.sections.filter.filterby}}
      <button
        type="button"
        @click="resetFilters"
        class=" block text-sm text-gray-900 underline underline-offset-4"
      >
      <svg class="fill-gray-500" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
      </button>
    </div>

    <div class="flex flex-col items-center gap-8 divide-y">
      
      <!-- sorting radiobox -->
      <div
       v-if="$settings.sections.sortfilter.active"
        class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2" >
        <div class="w-96 rounded bg-white">
         

          <ul class="space-y-1 border-t border-gray-200 p-4">
            <li v-for="option in filterOptions" :key="option.value">
              <label for="FilterInStock" class="inline-flex items-center gap-2">
                <input
                  @change="applyFilters"
                  type="radio"
                  :id="option.value"
                  :value="option.value"
                  v-model="selectedFilters.sortOrder"
                  class="h-5 w-5 rounded border-gray-300"
                />

                <span class="text-gray-700 text-xs font-light">
                  {{ option.label }}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- the price range filter -->
        <div
        v-if="$settings.sections.pricefilter.active"
          class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
        >
          <div class="w-96 rounded bg-white">
            <header class="flex items-center justify-between p-4">
              <span class="text-sm text-gray-700"> {{$settings.sections.filter.price}} </span>

              <button
              type="button"
              @click=""
              class="text-sm text-gray-900"
            >
              +
            </button>
            </header>

            <div class="border-t border-gray-200 p-4">
              <div class="flex justify-between gap-4">
                <label for="FilterPriceFrom" class="flex items-center gap-2">
                  <span class="text-sm text-gray-600">{{ $store.state.currency.code }}</span>

                  <input
                    @change="applyFilters"
                    type="number"
                    id="FilterPriceFrom"
                    :placeholder = $settings.header.searchbar.fromdate.label
                    v-model="selectedFilters.priceFrom"
                    class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </label>

                <label for="FilterPriceTo" class="flex items-center gap-2">
                  <span class="text-sm text-gray-600">{{ $store.state.currency.code }}</span>

                  <input
                    @change="applyFilters"
                    type="number"
                    id="FilterPriceTo"
                    :placeholder = $settings.header.searchbar.todate.label
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
      v-if="$settings.sections.collectionfilter.active"
        class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
      >
        <div class="w-96 rounded bg-white">
          <header class="flex items-center justify-between p-4">
            <span class="text-sm text-gray-700"> {{$settings.sections.filter.collection}} </span>

            <button
              type="button"
              @click=""
              class="text-sm text-gray-900"
            >
              +
            </button>
          </header>

          <ul class="space-y-1 border-t border-gray-200 p-4">
            <li v-for="item in $settings.sections.collections">
              <label for="FilterInStock" class="inline-flex items-center gap-2">
                <input
                  @change="applyFilters"
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
      v-if="$settings.sections.locationfilter.active"
        class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
      >
        <div class="w-96 rounded bg-white">
          <header class="flex items-center justify-between p-4">
            <span class="text-sm text-gray-700"> {{ $settings.sections.filter.location }} </span>

            <button
              type="button"
              @click=""
              class="text-sm text-gray-900"
            >
              +
            </button>
          </header>

          <ul class="space-y-1 border-t border-gray-200 p-4">
            <li v-for="item in $settings.sections.locations">
              <label for="FilterInStock" class="inline-flex items-center gap-2">
                <input
                  @change="applyFilters"
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
      v-if="$settings.sections.servicesfilter.active"
        class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
      >
        <div class="w-96 bg-white">
          <header class="flex items-center justify-between p-4">
            <span class="text-sm text-gray-700"> {{$settings.sections.filter.services}} </span>

            <button
              type="button"
              @click=""
              class="text-sm text-gray-900"
            >
              +
            </button>
          </header>

          <ul class="space-y-1 border-t border-gray-200 p-4">
            <li v-for="item in $settings.sections.services">
              <label for="FilterInStock" class="inline-flex items-center gap-2">
                <input

                  @change="applyFilters"
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

  data(){
    return{
      filterOptions: [
        { label: this.$settings.sections.filter.default, value: 'default' },
        { label: this.$settings.sections.filter.popularity, value: 'popular' },
        { label: this.$settings.sections.filter.price, value: 'price' },
      ],
    };
  },
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
