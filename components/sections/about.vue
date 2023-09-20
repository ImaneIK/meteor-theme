<template>
    <div class="lg:mx-24 lg:py-16">
      <div class="container m-auto md:px-6">
        <div class="lg:flex justify-between items-center">
          <div class="lg:w-6/12 lg:p-0 p-7">
            <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
              {{$settings.sections.about.heading}}
            </h1>

            <p class="mt-3 text-gray-500">
              {{$settings.sections.about.content}}
            </p>

            <div class="py-5 flex flex-wrap justify-center md: justify-start gap-2">
              <a
                href="#"
                :style="`background: ${$settings.theme.colors.accent}; color:${$settings.theme.colors.primary};`"
                class="w-full text-center rounded-md py-2 px-5 text-lg font-semibold inline-block border border-amber-600 md:mr-3"
                >{{$settings.sections.about.button.community}}</a
              >
              <a
                href="#"
                :style="`background: ${$settings.theme.colors.primary}; color:${$settings.theme.colors.secondary};`"
                class="w-full text-center text-black rounded-md py-2 px-5 text-lg font-semibold bg-gray-400 inline-block border hover:bg-white hover:text-black"
                >{{$settings.sections.about.button.tour}}</a
              >
            </div>
          </div>
          <div class="lg:w-5/12 order-2">
            <nuxt-img
              :src="`${$settings.sections.about.image.src}`"
              style="
                transform: scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg)
                  rotate(2deg);
              "
              alt=""
              class="rounded"
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script></script>