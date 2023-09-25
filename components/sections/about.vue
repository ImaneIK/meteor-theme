<template>
    <div class="lg:mx-24 lg:py-16">
      <div class="container m-auto md:px-6">
        <div class="lg:flex justify-between items-center">
          <div class="lg:w-6/12 lg:p-0 p-7">
            <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
              {{$settings.sections.about.aboutSection.title}}
            </h1>

            <p class="mt-3 text-gray-500">
              {{$settings.sections.about.aboutSection.text}}
            </p>

            <div class="py-5 flex flex-wrap justify-center md: justify-start gap-2">
              <a
                href="/#contact"
                :style="`background: ${$settings.sections.styles.colors.primary}; color:white`"
                class="w-full text-center rounded-md py-2 px-5 text-lg font-semibold inline-block border border-amber-600 md:mr-3"
                >
                {{$settings.sections.about.aboutSection.cta}}
                </a>
              <a
                href="/#contact"
                :style="`background: ${$settings.sections.styles.colors.secondary}; color:black;`"
                class="w-full text-center text-black rounded-md py-2 px-5 text-lg font-semibold bg-gray-400 inline-block border"
                >
                {{$settings.sections.about.aboutSection.tour}}
                </a >
            </div>
          </div>
          <div class="lg:w-5/12 order-2">
           
            <nuxt-img v-if="$settings.sections.about.aboutSection.image"
            :src="`${$settings.sections.about.aboutSection.image.src}`"
              style=" transform: scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg); "
              :alt= $settings.sections.about.aboutSection.title
              class="rounded"
            />
          </div>
        </div>
      </div>
    </div>
</template>
<script></script>