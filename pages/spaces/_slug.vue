<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>

    <!--  -->
    <section
      v-if="!loading && space != null"
      class="text-gray-700 body-font overflow-hidden"
    >
      <sections-banner />

      <div
        class="container py-24 mx-auto flex flex-col md:flex-row justify-center items-center"
      >
        <!--the product details section-->

        <div class="relative w-2/5 mx-4 flex flex-col p-4">
          <!-- Main image -->
          <div class="mb-4"  style="flex: 0 0 40%;">
            <img
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
              <img
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

        <div class="w-2/5 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">METEOR SPACES</h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
            {{ space.name }}
          </h1>
          <div class="flex mb-4">
            <span class="flex items-center">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-red-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-red-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-red-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-red-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-red-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <span class="text-gray-600 ml-3">4 Reviews</span>
            </span>
            <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
              <a class="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  ></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                  ></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                  ></path>
                </svg>
              </a>
            </span>
          </div>
          <p class="mb-6">{{ space.description }}</p>
          <div class="  flex text-xs font-light text-gray-500 m-4">
            <p v-for="collection in space.collections.slice(2) " class="block mx-4">{{ collection.name }}</p>
          </div>

          <!-- <div class="w-full">
                        <si-product-variants v-if="space.type=='variable'" showPrice :options="space.options" :variants="space.variants" :images="space.images" @selected="variantSelected"></si-product-variants>
                        <hr v-if="space.type=='variable'" class="my-1">
                        <div class="flex justify-center" v-show="!outofstock">
                            <si-product-quantity @selected="quantitySelected" :quantity="quantity"></si-product-quantity>
                        </div>
          </div> -->
          <si-product-quantity @selected="quantitySelected" :quantity="space.quantity"></si-product-quantity>

          <div class="flex my-4">
            <si-product-price class="title-font font-medium text-2xl text-gray-900" v-if="space.type == 'simple'" :type="space.type" :originalPrice="space.originalPrice" :price="price" :variants="space.variants" :quantity="quantity"></si-product-price>

            <!-- <span class="title-font font-medium text-2xl text-gray-900"
              >{{ this.salePrice }}$</span
            >
          -->


            <button
              class="flex ml-auto text-white bg-amber-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
            >
              Book Now
            </button>
            <button
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
      </div>


      <!--  -->

      <div class="max-w-6xl mx-auto px-4">
        <!-- Navigation Bar -->
        <div class="flex justify-center mb-4">
          <button
            :class="{
              'font-semibold': activeSection === 'gallery',
              'font-normal': activeSection !== 'gallery',
            }"
            @click="setActiveSection('gallery')"
            class="px-4 py-2 mr-2 rounded focus:outline-none"
          >
            Image Gallery
          </button>
          <button
            :class="{
              'font-semibold': activeSection === 'description',
              'font-normal': activeSection !== 'description',
            }"
            @click="setActiveSection('description')"
            class="px-4 py-2 ml-2 rounded focus:outline-none"
          >
            Description
          </button>

          <button
            :class="{
              'font-semibold ': activeSection === 'reviews',
              'font-normal': activeSection !== 'reviews',
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
        <div v-show="activeSection === 'reviews'"></div>
      </div> 

      <sections-spaces />
    </section>
  </div>
</template>

<script>
export default {


  async fetch() {
    this.loading = true;
    const { slug } = this.$route.params;
    try {

      const { data } = await this.$storeino.products.get({ slug });
      this.space = data;
      this.price.salePrice=this.space.price.salePrice;
      console.log("hehehehe",this.space.price.salePrice);

      // this.price = this.space.type === 'simple' ? this.space.price.salePrice : this.space.price.comparePrice; 
      this.quantity = this.space.quantity;
      this.variant = this.space.type == 'variant' ? this.space.variants[0] : null


      if(this.space.type == 'simple'){
                if(this.discount){
                    this.space.originalPrice = this.$tools.copy(this.space.price);
                    if(this.discount.type == 'percentage'){
                            this.space.price.salePrice = this.space.price.salePrice - (this.space.price.salePrice * this.discount.value / 100)
                            this.space.price.comparePrice = this.space.price.comparePrice - (this.space.price.comparePrice * this.discount.value / 100)
                    }else{
                        this.space.price.salePrice = this.space.price.salePrice - this.discount.value
                        this.space.price.comparePrice = this.space.price.comparePrice - this.discount.value
                    }
                }
                if(!this.space.outStock.disabled && this.space.quantity.instock <= 0){
                    this.outofstock = true;
                }
            }else{
                if(this.discount){
                    this.space.variants.forEach(variant => {
                        variant.originalPrice = this.$tools.copy(variant.price)
                        if(this.discount.type == 'percentage'){
                            variant.price.salePrice = variant.price.salePrice - (variant.price.salePrice * this.discount.value / 100)
                            variant.price.comparePrice = variant.price.comparePrice - (variant.price.comparePrice * this.discount.value / 100)
                        }else{
                            variant.price.salePrice = variant.price.salePrice - this.discount.value
                            variant.price.comparePrice = variant.price.comparePrice - this.discount.value
                        }
                    });
                }
                if(!this.space.outStock.disabled && this.space.variants[0] && this.space.variants[0].quantity.instock <= 0){
                    this.outofstock = true;
                }else{
                    this.outofstock = false;
                }
            }


      this.loading = false;
    } catch (e) {
      // Redirect to error page if product not exists
      this.$nuxt.error({ statusCode: 404, message: "product_not_found" });
    }
  },


  data() {
    return {
      // cards: [],
      loading: true,
      space: null,
      activeSection: "gallery",
      imageModal: null,
      selectedImageIndex: 0,
      variant:  null,
      quantity: 1,
      price: { salePrice: 0, comparePrice: 0 },
      discount: this.upsell ? this.upsell.discount : null,
      outofstock: false
    };
  },


  
  computed: {
    price() {
      if (this.variant) {
        return this.variant.price.salePrice * this.quantity;
      } else {
        return this.space.price.salePrice * this.quantity;
      }
    }
  },

  methods: {
    
    quantitySelected(quantity){
                this.space.quantity.value = quantity;
                if(this.variant){
                    this.price.salePrice = this.variant.price.salePrice * quantity;
                    this.price.comparePrice = this.variant.price.comparePrice * quantity;
                }else{
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
  },
};
</script>
