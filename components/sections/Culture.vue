<template>

<section class="lg:mx-24">
      <div class="container px-6 py-10 mx-auto">
        <div class="lg:flex lg:items-center">
          <div class="w-full space-y-12 lg:w-1/2">
            <div>
              <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl" @click="init()">
                {{$settings.sections.about.cultureSection.title}}
              </h1>

              <div class="mt-2">
                <span :style="`background: ${$settings.sections.styles.colors.primary};`" class="inline-block w-40 h-1 rounded-full"></span>
                <span :style="`background: ${$settings.sections.styles.colors.primary};`" class="inline-block w-3 h-1 ml-1 rounded-full"></span>
                <span :style="`background: ${$settings.sections.styles.colors.primary};`" class="inline-block w-1 h-1 ml-1 rounded-full"></span>
              </div>
            </div>

            <div v-if="$settings.sections.about.cultureSection.bloc1.active" class="md:flex md:items-start md:-mx-4">
              <span
              :style="`background: ${$settings.sections.styles.colors.secondary}; fill: ${$settings.sections.styles.colors.primary};`"
                class="inline-block p-2 rounded-xl md:mx-4"
                v-html= $settings.sections.about.cultureSection.bloc1.icon
              >
               
              </span>

              <div class="mt-4 md:mx-4 md:mt-0">
                <h1 class="text-xl font-semibold text-gray-700 capitalize">
                  {{ $settings.sections.about.cultureSection.bloc1.title }}
                </h1>

                <p class="mt-3 text-gray-500">
                  {{ $settings.sections.about.cultureSection.bloc1.description }}
                </p>
              </div>
            </div>

            <div  v-if="$settings.sections.about.cultureSection.bloc2.active"  class="md:flex md:items-start md:-mx-4">
              <span
              :style="`background: ${$settings.sections.styles.colors.secondary}; fill: ${$settings.sections.styles.colors.primary};`"
                class="inline-block p-2 rounded-xl md:mx-4"
                v-html= $settings.sections.about.cultureSection.bloc2.icon
              >
             
              </span>


              <div class="mt-4 md:mx-4 md:mt-0">
                <h1 class="text-xl font-semibold text-gray-700 capitalize">
                  {{$settings.sections.about.cultureSection.bloc2.title}}
                </h1>

                <p class="mt-3 text-gray-500">
                  {{$settings.sections.about.cultureSection.bloc2.description}}
                </p>
              </div>
            </div>

            <div  v-if="$settings.sections.about.cultureSection.bloc3.active"  class="md:flex md:items-start md:-mx-4">
              <span
              :style="`background: ${$settings.sections.styles.colors.secondary}; fill: ${$settings.sections.styles.colors.primary};`"
                class="inline-block p-2 rounded-xl md:mx-4"
                v-html= $settings.sections.about.cultureSection.bloc3.icon
              >
           
              </span>

              <div class="mt-4 md:mx-4 md:mt-0">
                <h1 class="text-xl font-semibold text-gray-700 capitalize">
                  {{$settings.sections.about.cultureSection.bloc3.title}}
                </h1>

                <p class="mt-3 text-gray-500">
                  {{$settings.sections.about.cultureSection.bloc3.description}}
                </p>
              </div>
            </div>
          </div>

          <div v-if="$settings.sections.about.cultureSection.image" class="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center">
            <nuxt-img
              class="w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] rounded-full"
              :src="`${$settings.sections.about.cultureSection.image.src}`"
              :alt= $settings.sections.about.cultureSection.title
            />
            
          </div>
        </div>


      </div>
    </section>

</template>
<script></script>
