<template>
  <div class="fixed w-full bg-white z-10" style="padding: 0 16px" :class="[
    'navbar',
    {
      'navbar-transparent': $route.path === '/' && !scrolled,
      'navbar-white': $route.path !== '/' || scrolled,
    },
  ]">
    <div class="flex items-center justify-center md:justify-between">
      <!-- Header logo -->
      <div class="p-4">
        <template v-if="logo != null">
          <a href="/"><nuxt-img class="w-24" :src="logo.src" /></a>
        </template>
        <template v-else>
          <span>No_logo</span>
        </template>
      </div>

      <!-- Mobile toggle -->
      <!-- <div class="md:hidden">
        <button @click="drawer">
          <svg
            class="h-8 w-8 fill-current text-black"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div> -->

      <!-- Navbar -->
      <div class="hidden md:block" style="padding: 0 3rem">
          <ul class="capitalize flex gap-6 text-xs justify-center">
            <template v-if="menu">
              <li
                v-for="(item, i) in $settings.sections.header.menu.items"
                :key="i"
                :class="{
                  'text-amber-500 underline decoration-solid decoration-amber underline-offset-4 decoration-2': $route.path === item.url,
                  'text-gray-400 font-light': $route.path !== item.url,
                }" >
                <a :href="item.url">{{ item.text }}</a>
              </li>
            </template>

              <template v-else>
                <p>No_menu</p>
              </template>

          <!-- language -->
          <li v-if="$settings.sections.header.icons.language.active">
            <div class="relative">
              <div class="flex gap-2 cursor-pointer" @click="toggleLanguageDropdown">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
                  :class="isLanguageDropdownVisible ? 'fill-amber-500' : 'fill-gray-400'">
                  <path
                    d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                </svg>
                <p :class="isLanguageDropdownVisible ? 'text-amber-500' : 'text-gray-400'">
                  {{ this.$store.state.language.code }}
                </p>
              </div>
              <div v-if="isLanguageDropdownVisible"
                class="absolute top-full left-0 min-w-full z-10 transition-transform transform">
                <ul class="bg-white border rounded shadow p-2">
                  <li v-for="(l, i) in $settings.store_languages" :key="i" @click="changeLanguage(l.code)"
                    class="cursor-pointer hover:bg-gray-100 p-2">
                    {{ l.name }}
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <!-- currency -->
          <li>
            <div v-if="$settings.sections.header.icons.currency.active" class="relative">
              <div class="flex gap-2 cursor-pointer" @click="toggleCurrencyDropdown">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
                  :class="isCurrencyDropdownVisible ? 'fill-amber-500' : 'fill-gray-400'">
                  <path
                    d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
                <p :class="isCurrencyDropdownVisible ? 'text-amber-500' : 'text-gray-400'">
                  {{ this.$store.state.currency.code }}
                </p>
              </div>
              <div v-if="isCurrencyDropdownVisible"
                class="absolute top-full left-0 min-w-full z-10 transition-transform transform">
                <ul class="bg-white border rounded shadow p-2">
                  <li v-for="(l, i) in $settings.store_currencies" :key="i" @click="changeCurrency(l.code)"
                    class="cursor-pointer hover:bg-gray-100 p-2">
                    {{ l.name }}
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <!-- search icon -->
          <li v-if="$settings.sections.header.icons.search.active" @click="showPopup">
            <svg :class="isPopupVisible ? 'fill-amber-500' : 'fill-gray-400'" xmlns="http://www.w3.org/2000/svg"
              height="1em" viewBox="0 0 512 512">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com -->
              <!-- License - https://fontawesome.com/license (Commercial License) -->
              <!-- Copyright 2023 Fonticons, Inc. -->
              <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </li>
        </ul>
      </div>


      <!-- Dark Background Transition -->
      <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium" enter-to-class="opacity-100"
        leave-class="opacity-100" leave-active-class="ease-out transition-medium" leave-to-class="opacity-0">
        <div @keydown.esc="isOpen = false" v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
          <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
        </div>
      </transition>

      <si-BottomNav @change-color="changeLinkColor" :openModal="showPopup"  class="md:hidden"></si-BottomNav>

      <!-- Drawer Menu -->
      <!-- <aside
        class="p-4 transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="close">
          <button class="absolute top-0 right-0 mt-4 mr-4" @click="isOpen = false">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <ul class="divide-y py-8 font-sans capitalize text-md items-center">
          <li v-for="link in $settings.header.menu.items">
            <NuxtLink
              :to="link.url"
              class="m-8"
              :class="{
                'block text-amber-500 my-2': $route.path === link.url,
                'block text-gray-400 font-light my-2': $route.path !== link.url,
              }"
              >{{ link.text }}</NuxtLink
            >
          </li>
        </ul>

        <div class="follow">
          <p class="italic font-sans text-sm">follow us:</p>
          <div class="social flex space-x-5 mt-4">
            <a href="#">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="twitter"
                class="h-5 w-5 fill-current text-gray-600"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                ></path>
              </svg>
            </a>
            <a href="#">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook-f"
                class="h-5 w-5 fill-current text-gray-600"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                ></path>
              </svg>
            </a>
            <a href="#">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="instagram"
                class="h-5 w-5 fill-current text-gray-600"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                ></path>
              </svg>
            </a>
            <a href="#">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="youtube"
                class="h-5 w-5 fill-current text-gray-600"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </aside> -->
    </div>


      <!-- popup -->
      <div 
        v-if="$settings.sections.popup.active" 
        class="fade-in-element sticky rounded-md shadow-2xl lg:mx-12"
        :style="$settings.sections.popup.background ?
          { //condition on active
            'background-position': '50%',
            'background-image': `url(${$settings.sections.popup.background.src})`,
            'background-color': 'gray',
            'background-blend-mode': 'multiply'
          }
          : { 'background': 'gray' }">

        <section class="" v-if="isPopupVisible" :class="{ 'visible': isPopupVisible }">
          <div class="p-8 text-center sm:p-12">
            <span class="text-white" @click="closePopup"><svg xmlns="http://www.w3.org/2000/svg" height="2em"
                viewBox="0 0 512 512">
                <path
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
              </svg></span>
            <p class="text-sm font-semibold uppercase tracking-widest text-amber-500">{{ $settings.sections.popup.title }}
            </p>

            <h2 
              v-if="$settings.sections.popup.message.active" 
              class="my-2 text-2xl text-white font-medium">
                {{ $settings.sections.popup.message.text }}
            </h2>

            <si-SearchBar @search-submit="closePopup"></si-SearchBar>
          </div>
        </section>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      scrolled: false,
      logo: this.$settings.sections.header.logo,
      menu:this.$settings.sections.header.menu,
      isLanguageDropdownVisible: false,
      isCurrencyDropdownVisible: false,
      isPopupVisible: false,
      popupTitle: 'Popup Title',
      popupMessage: 'This is a sample popup message.',
      otherMenu: [
        {
          _id: "lang",
          text: this.$store.state.language.code,
          //active: this.$settings.sections.header.icons.header_language,
          childrens: this.$settings.store_languages.map((l) => {
            return {
              _id: l.code,
              text: l.name,
              url: `?lang=${l.code}`,
            };
          }),
        },
        {
          _id: "currency",
          text: this.$store.state.currency.code,
          //active: this.$settings.sections.header.icons.header_currency,
          childrens: this.$settings.store_currencies.map((c) => {
            return {
              _id: c.code,
              text: c.name,
              url: `?cur=${c.code}`,
            };
          }),
        },
      ],
      //.filter(item=> item.active)
    };
  },
  methods: {
    changeLinkColor() {
      // Update the linkStyle object to change the color
      this.linkStyle = {
        fill: this.$settings.sections.styles.color.primary,
        color: this.$settings.sections.styles.color.primary
      };
    },

    showPopup() {
      this.isPopupVisible = !this.isPopupVisible;
      // console.log("this.isPopupVisible:", this.isPopupVisible)
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    toggleLanguageDropdown() {
      this.isLanguageDropdownVisible = !this.isLanguageDropdownVisible;
      // Hide the currency dropdown
      this.isCurrencyDropdownVisible = false;
    },
    toggleCurrencyDropdown() {
      this.isCurrencyDropdownVisible = !this.isCurrencyDropdownVisible;
      // Hide the language dropdown
      this.isLanguageDropdownVisible = false;
    },

    changeLanguage(code) {
      window.location.href = `?lang=${code}`;
    },

    changeCurrency(code) {
      window.location.href = `?cur=${code}`;
    },

    drawer() {
      this.isOpen = !this.isOpen;
      // console.log(this.otherMenu[0].childrens[0].text);
    },

    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.popup.visible {
  display: block;
  /* Add your CSS styles for the visible popup here */
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  transition: background-color 0.3s;
  z-index: 1000;
}

.navbar-transparent {
  background-color: transparent;
  border-bottom: solid 1px gray;
}

.navbar-white {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-scroll {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fade-in-element {
  animation: fadeIn 1s ease-in-out;
  /* You can adjust the duration and timing function */
  /* Other styles for your element */
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
