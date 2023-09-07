<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center h-screen px-6">
      <si-Loader />
    </div>

    <!-- CONTENT -->
    <section
      v-if="!loading && space != null"
      class="flex flex-col pt-16 px-4 md:px-20 text-gray-700 body-font overflow-hidden"
    >
      <!-- <sections-banner /> -->
      <div class="flex justify-start py-1 items-center w-full">
          <p class="text-xs font-light">
            <nuxt-link to="/">Home</nuxt-link> >
            <nuxt-link :to="`/spaces/${space.slug}`">{{ space.name }}</nuxt-link>
          </p>
      </div>

      <div>
         <!-- product details -->
        <div class="container mx-auto flex flex-col md:flex-row justify-center items-center md:gap-4">

          <!--the product details section-->

          <!-- product images -->
          <div class="w-full lg:w-2/5 flex flex-col py-4 md:py-0">
            <!-- Main image -->
            <div class="mb-4" style="flex: 0 0 40%">
              <nuxt-img
                alt="Main Image"
                class="w-full object-cover object-center rounded border border-gray-200"
                :src="space.images[selectedImageIndex].src"
              />
            </div>

            <!-- Grouping of other images -->
            <div class="flex flex-row">
              <div
                v-for="(image, index) in space.images"
                :key="index"
                @click="selectImage(index)"
                :class="`w-1/${space.images.length} p-1`"
              >
                <!-- Looping on every image -->
                <nuxt-img
                  :src="image.src"
                  :alt="`Thumbnail ${index + 1}`"
                  :class="{
                    'border-amber-600 border-2': selectedImageIndex === index,
                  }"
                  class="w-full h-full object-cover object-center rounded border border-gray-200 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <!-- product details -->
          <div class="w-full lg:w-2/5">
            
            <!-- location -->
            <div class="flex text-sm title-font text-gray-500 tracking-widest">
              <svg
                class="fill-amber-500"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <style>
                  svg {
                    fill: #ff8000;
                  }
                </style>
                <path
                  d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                />
              </svg>
              <p v-for="location in getLocationsForSpace(space)" class="block mx-4">
                {{ location.name }}
              </p>
            </div>

            <!-- product name -->
            <h1 class="text-gray-900 text-2xl lg:text-3xl title-font font-medium mb-1">
              {{ space.name }}
            </h1>

            <!-- category and reviews -->
            <div class="flex flex-wrap mb-2 items-center gap-2">
              
              <!-- product category -->
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                {{ space.collections[0].name }}
              </h2>

              <!-- Reviews -->
              <div class="flex items-center text-sm text-yellow-500">
                <p class="flex items-center gap-1 mx-1"><svg stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="fill-yellow-500 w-5 h-5" viewBox="0 0 24 24"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    {{ space.review.rating.toFixed(1) }} 
                    ({{ space.review.reviews.length }} <span>Reviews</span>)
                </p>
              </div>

              <!-- social media share -->
              <span class="flex py-2">
                <!-- facebook -->
                <a class="text-gray-500 fill-amber-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5 fill-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                    ></path>
                  </svg>
                </a>
                <!-- twitter -->
                <a class="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5 fill-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                    ></path>
                  </svg>
                </a>
                <!-- whatsapp -->
                <a class="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5 fill-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                    ></path>
                  </svg>
                </a>
              </span>

            </div>

            <!-- product description text -->
            <p class="text-xs text-gray-500 font-light">{{ space.description }}</p>

            <!-- price, quantity and wishlist options -->
            <div class="flex justify-between items-center flex-wrap">
              <!-- price -->
              <si-product-price
                class="title-font font-medium text-3xl text-gray-900"
                v-if="space.type == 'simple'"
                :type="space.type"
                :originalPrice="space.originalPrice"
                :price="price"
                :variants="space.variants"
                :quantity="quantity"
              ></si-product-price>

              <si-product-quantity
              @selected="quantitySelected"
              :quantity="space.quantity"
              ></si-product-quantity>

              <!-- wishlist button -->
              <!-- v-if="$settings.sections.products.add_to_wishlist.active" -->
              <div>
                <button
                  v-if="$store.state.wishlist.find((i) => i._id == space._id)"
                  @click="removeFromWishlist"
                  title="Wishlist"
                  class="rounded-full w-10 h-10 bg-amber-500 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4"
                >
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                    ></path>
                  </svg>
                </button>

                <button
                  v-else
                  @click="addToWishlist"
                  title="Wishlist"
                  class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                    ></path>
                  </svg>
                </button>
              </div>

            </div>

            <!-- check availability button-->
            <button class="flex my-2 w-full justify-center text-white bg-amber-600 border-0 py-2 focus:outline-none hover:bg-amber-700 rounded">
              check availability
            </button>

            <!-- services -->
            <div class="w-full grid grid-cols-2 lg:grid-cols-3 text-xs font-light text-gray-500 my-4">
              Available services:
              <p
                v-for="collection in getServicesForSpace(space)"
                class="block border rounded-md p-1"
              >
                {{ collection.name }}
              </p>
            </div>
            
          </div>

        </div>

        <!-- product description -->
        <div class="max-w-6xl mx-auto my-6">
          <!-- Navigation Bar -->
          <div class="flex justify-center mb-4">
            <button
              :class="{
                'font-semibold text-amber-500': activeSection === 'gallery',
                'font-normal text-gray-500': activeSection !== 'gallery',
              }"
              @click="setActiveSection('gallery')"
              class="px-4 py-2 mr-2 rounded focus:outline-none"
            >
              Gallery
            </button>
            <button
              :class="{
                'font-semibold text-amber-500': activeSection === 'description',
                'font-normal text-gray-500': activeSection !== 'description',
              }"
              @click="setActiveSection('description')"
              class="px-4 py-2 ml-2 rounded focus:outline-none"
            >
              Description
            </button>
            <button
              :class="{
                'font-semibold text-amber-500': activeSection === 'reviews',
                'font-normal text-gray-500': activeSection !== 'reviews',
              }"
              @click="setActiveSection('reviews')"
              class="px-4 py-2 ml-2 rounded focus:outline-none"
            >
              Reviews
            </button>
          </div>

          <!-- Image Gallery Section -->
          <div v-show="activeSection === 'gallery'">
            <si-carousel :list="space.images"></si-carousel>
          </div>

          <!-- Description Section -->
          <div v-show="activeSection === 'description'">
            <p class="mb-6">{{ space.description }}</p>
            <!-- <iframe :src="``" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> -->

            <!-- <div v-html="space.description"></div> -->
          </div>

          <!-- Reviews section -->
          <div v-show="activeSection === 'reviews'">
            <sections-Reviews :item="space" />
          </div>
        </div>

      </div>

     
      <sections-spaces />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      space: null,
      activeSection: "gallery",
      imageModal: null,
      selectedImageIndex: 0,
      variant: null,
      quantity: 1,
      price: { salePrice: 0, comparePrice: 0 },
      discount: this.upsell ? this.upsell.discount : null,
      outofstock: false,
      services: this.$settings.sections.services,
      locations: this.$settings.sections.locations,
    };
  },

  async fetch() {
    this.loading = true;
    const { slug } = this.$route.params;
    try {
      const { data } = await this.$storeino.products.get({ slug });
      this.space = data;
      this.price.salePrice = this.space.price.salePrice;
      // this.price = this.space.type === 'simple' ? this.space.price.salePrice : this.space.price.comparePrice;
      this.quantity = this.space.quantity;
      this.variant = this.space.type == "variant" ? this.space.variants[0] : null;

      if (this.space.type == "simple") {
        if (this.discount) {
          this.space.originalPrice = this.$tools.copy(this.space.price);
          if (this.discount.type == "percentage") {
            this.space.price.salePrice =
              this.space.price.salePrice -
              (this.space.price.salePrice * this.discount.value) / 100;
            this.space.price.comparePrice =
              this.space.price.comparePrice -
              (this.space.price.comparePrice * this.discount.value) / 100;
          } else {
            this.space.price.salePrice = this.space.price.salePrice - this.discount.value;
            this.space.price.comparePrice =
            this.space.price.comparePrice - this.discount.value;
          }
        }
        if (!this.space.outStock.disabled && this.space.quantity.instock <= 0) {
          this.outofstock = true;
        }
      } else {
        if (this.discount) {
          this.space.variants.forEach((variant) => {
            variant.originalPrice = this.$tools.copy(variant.price);
            if (this.discount.type == "percentage") {
              variant.price.salePrice =
                variant.price.salePrice -
                (variant.price.salePrice * this.discount.value) / 100;
              variant.price.comparePrice =
                variant.price.comparePrice -
                (variant.price.comparePrice * this.discount.value) / 100;
            } else {
              variant.price.salePrice = variant.price.salePrice - this.discount.value;
              variant.price.comparePrice =
                variant.price.comparePrice - this.discount.value;
            }
          });
        }
        if (
          !this.space.outStock.disabled &&
          this.space.variants[0] &&
          this.space.variants[0].quantity.instock <= 0
        ) {
          this.outofstock = true;
        } else {
          this.outofstock = false;
        }
      }
      this.loading = false;
    } catch (e) {
      // Redirect to error page if product not exists
      this.$nuxt.error({ statusCode: 404, message: "product_not_found" });
    }
  },

  computed: {
    price() {
      if (this.variant) {
        return this.variant.price.salePrice * this.quantity;
      } else {
        return this.space.price.salePrice * this.quantity;
      }
    },
  },

  methods: {
    quantitySelected(quantity) {
      this.space.quantity.value = quantity;
      if (this.variant) {
        this.price.salePrice = this.variant.price.salePrice * quantity;
        this.price.comparePrice = this.variant.price.comparePrice * quantity;
      } else {
        this.price.salePrice = this.space.price.salePrice * quantity;
        this.price.comparePrice = this.space.price.comparePrice * quantity;
      }
    },
    selectImage(index) {
      this.selectedImageIndex = index;
    },
    switchTab(tab) {
      this.activeTab = tab;
    },
    setActiveSection(section) {
      this.activeSection = section;
    },
    openImageModal(image) {
      this.imageModal = image;
    },
    closeImageModal() {
      this.imageModal = null;
    },
    addToWishlist() {
      this.$tools.call("ADD_TO_WISHLIST", this.space);
      // this.$tools.toast(this.$settings.sections.alerts.added_to_wishlist);
    },
    removeFromWishlist() {
      this.$tools.call("REMOVE_FROM_WISHLIST", this.space);
      //this.$tools.toast(this.$settings.sections.alerts.removed_from_wishlist);
    },
    getServicesForSpace(space) {
      try {
        return this.services.filter((service) => {
          return space.collections.some((item) => item.slug === service.slug);
        });
      } catch (e) {
        console.log(e);
        return e;
      }
    },
    getLocationsForSpace(space) {
      try {
        return this.locations.filter((location) => {
          return space.collections.some((item) => item.slug === location.slug);
        });
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
</script>