<template>

     <!-- les variantes -->
     <div class="bg-black text-white flex flex-col mr-4 p-6">
          <h2 class="block pb-4 px-4 mb-4 border-b-2">Filter by:</h2>

          <div class="flex flex-col items-center gap-8">
            <div class="">
              <div
                class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
              >
                <div class="w-96 rounded border border-gray-200 bg-white">
                  <header class="flex items-center justify-between p-4">
                    <span class="text-sm text-gray-700"> The highest price is $600 </span>

                    <button
                      type="button"
                      class="text-sm text-gray-900 underline underline-offset-4"
                    >
                      Reset
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
                          class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </label>

                      <label for="FilterPriceTo" class="flex items-center gap-2">
                        <span class="text-sm text-gray-600">$</span>

                        <input
                          type="number"
                          id="FilterPriceTo"
                          placeholder="To"
                          class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="">
              <div
                class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
              >
                <div class="w-96 rounded border border-gray-200 bg-white">
                  <header class="flex items-center justify-between p-4">
                    <span class="text-sm text-gray-700"> 0 Selected </span>

                    <button
                      type="button"
                      class="text-sm text-gray-900 underline underline-offset-4"
                    >
                      Reset
                    </button>
                  </header>

                  <ul class="space-y-1 border-t border-gray-200 p-4">
                    <li>
                      <label for="FilterInStock" class="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="FilterInStock"
                          class="h-5 w-5 rounded border-gray-300"
                        />

                        <span class="text-sm font-medium text-gray-700">
                          Air conditionning
                        </span>
                      </label>
                    </li>

                    <li>
                      <label for="FilterPreOrder" class="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="FilterPreOrder"
                          class="h-5 w-5 rounded border-gray-300"
                        />

                        <span class="text-sm font-medium text-gray-700">
                          Free WiFi
                        </span>
                      </label>
                    </li>

                    <li>
                      <label
                        for="FilterOutOfStock"
                        class="inline-flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          id="FilterOutOfStock"
                          class="h-5 w-5 rounded border-gray-300"
                        />

                        <span class="text-sm font-medium text-gray-700">
                          Parking
                        </span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>