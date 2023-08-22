<template>
    <div class="bg-gray-100 pt-10">
      <div class="mx-auto max-w-6xl">
        <div class="p-2 bg-gray-100 rounded">
          <div class="flex flex-col md:flex-row">
            <div class="md:w-1/3 p-4 text-sm">
              <div class="text-3xl">
                Frequently asked <span class="font-medium">Questions</span>
              </div>
              <div class="my-2">Wondering how our service works ?</div>
              <div class="mb-2">Confused about how we can improve your business ?</div>
              <div class="text-xs text-gray-600">Dive into our FAQ for more details</div>
            </div>
            <div class="md:w-2/3">
              <div class="p-4">
                <div v-for="(item, index) in faqItems" :key="index" class="faq-item mb-2">
                  <div
                    class="font-medium rounded-sm text-lg px-2 py-3 flex text-gray-800 flex-row-reverse mt-2 cursor-pointer text-black bg-white hover:bg-white"
                    @click="toggleAccordion(index)"
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
                  <div v-if="item.open" class="faq-item answer p-2 text-justify text-left text-gray-800 mb-5 bg-white">
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
      faqItems: [
        {
          question: "What is a coworking space?",
          answer: "A coworking space is a shared workspace where individuals and teams from various companies work together in a collaborative environment. It provides flexible office solutions with amenities such as high-speed internet, meeting rooms, and communal areas.",
          open: false,
        },
        {
          question: "How do I book a workspace?",
          answer: "Booking a workspace is easy! Simply navigate to our Booking page, select the type of workspace you need (private office, dedicated desk, or shared workspace), choose your preferred dates and times, provide your contact information, and complete the payment process.",
          open: false,
        },
        {
          question: "What amenities are included in my membership?",
          answer: "Your membership comes with various amenities such as high-speed Wi-Fi, printing facilities, access to the lounge area, complimentary coffee and refreshments, and the opportunity to attend networking events.",
          open: false,
        },
      ],
    };
  },
  methods: {
    toggleAccordion(index) {
      this.faqItems[index].open = !this.faqItems[index].open;
    },
  },
};
</script>


<style scoped>
.faq-item .answer {
  overflow: hidden;
  transition: 0.3s ease-out;
}

</style>