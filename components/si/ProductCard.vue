<template>
  <div
    class="inline-block flex flex-col sm:flex-row max-w-2xl mx-auto my-4 w-full bg-white rounded-sm shadow-md"
  >
    <!-- space image -->
    <div class="relative" style="flex: 0 0 40%">
      <img class="h-full w-full object-cover" :src="src" :alt="title" />
      <p
        class="absolute top-0 left-0 m-2 flex items-center gap-1 bg-black text-yellow-400 text-xs p-2 rounded-lg"
      >
        <svg
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="fill-yellow-400 w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          ></path>
        </svg>
        {{ rating }}
      </p>
    </div>

    <div class="pt-4 flex flex-col flex-1">
      <div class="flex flex-row justify-between px-4">
        <!-- collection -->
        <p
          v-for="collection in getCollectionsForSpace(card)"
          class="rounded-full px-1 text-xs text-gray-500 font-light"
        >
          {{ collection.name }}
        </p>
        <p
          v-if="getCollectionsForSpace(card).length === 0"
          class="px-1 text-gray-400 text-xs font-light"
        >
          no collection allocated
        </p>

        <!-- price -->
        <div>
          <span class="bg-black rounded-full px-4 py-1 text-sm text-white font-semibold" >
            {{ price }}{{ $store.state.currency.symbol }}
          </span>
        </div>
      </div>

      <!-- space name -->
      <p class="text-lg font-normal px-4">{{ title }}</p>

      <!-- LOCATION -->
      <div class="flex items-center px-4 my-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          class="fill-amber-600"
          viewBox="0 0 384 512"
        >
          <path
            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
          />
        </svg>

        <span
          v-for="location in getLocationsForSpace(card)"
          class="rounded-full px-1 text-xs text-gray-500 font-light"
        >
          {{ location.name }}
        </span>
        <span
          v-if="getLocationsForSpace(card).length === 0"
          class="px-1 text-gray-400 text-xs font-light"
        >
          no location allocated
        </span>
      </div>

      <!-- SERVICES -->
      <div class="flex flex-col px-4">
        <div class="grid grid-cols-2">
          <div v-for="(collection, index) in getServicesForSpace(card)">
            <span
              :key="index"
              class="block rounded-md m-1 justify-center border-gray-300 border px-3 py-1 text-gray-400 text-xs font-light"
            >
              {{ collection.name }}
            </span>
          </div>
          <span
            class="flex block rounded-md m-1 justify-center border-gray-300 border px-3 py-1 text-gray-400 text-xs font-light"
            v-html="
              $settings.sections.services != null
                ? servicesSVG
                : 'no services found'
            "
          >
          </span>
        </div>
      </div>

      <NuxtLink
        class="block justify-end items-center flex w-full text-right text-xs bg-gray-100 gap-2 p-2 mt-4 w-fit"
        :to="`/spaces/${card.slug}`"
      >
        {{ $settings.sections.buttons.booknow.text }}
        <svg
          class="fill-gray-600 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path
            d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
          />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
    src: String,
    title: String,
    rating: Number,
    collectionName: String,
    price: Number,
    locationName: String,
  },

  data() {
    return {
      servicesSVG: `<svg class="fill-gray-300" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" ><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /> </svg>`,
    };
  },

  methods: {
    getServicesForSpace(space) {
      try {
        if (this.$settings.sections.services != null) {
          const filteredServices = this.$settings.sections.services
            .filter((service) => {
              return space.collections.some(
                (item) => item.slug === service.slug
              );
            })
            .slice(0, 3); // Displaying only 3 results to avoid different card scales

          if (filteredServices.length === 0) {
            return "[]"; // Return an empty array when no services are found
          }

          return filteredServices;
        } else {
          return [];
        }
      } catch (e) {
        console.error(e);
        return []; // Return an empty array in case of an error
      }
    },

    getLocationsForSpace(space) {
      try {
        if (this.$settings.sections.locations != null) {
          return this.$settings.sections.locations.filter((location) => {
            return space.collections.some(
              (item) => item.slug === location.slug
            );
          });
        } else {
          return [];
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    },

    getCollectionsForSpace(space) {
      try {
        if (this.$settings.sections.collections != null) {
          return this.$settings.sections.collections.filter((collection) => {
            return space.collections.some(
              (item) => item.slug === collection.slug
            );
          });
        } else {
          return []; // Return an empty array or handle it as needed
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
</script>
