<template>
  <div id="contact" v-if="$settings.sections.home.contact.active">

    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>

    <div v-if="!loading"
    class="dark-background w-full h-content object-cover p-8 lg:p-12"
    :style=" $settings.sections.home.contact.backgroundimage ?
    `
      background-image: url(${$settings.sections.home.contact.backgroundimage.src});
      background-color: gray;
      background-blend-mode: multiply;
      background-attachment: fixed;
    ` : `background-color: gray; color:white;`"
   
  >
    <!-- Section: Design Block -->
    <section class="">

      <!-- titling -->
      <div class="px-4 mb-4 flex flex-col gap-4 md:flex-row justify-center lg:justify-start md:justify-between items-center">
        <div>
              <h1 class="  text-2xl text-center lg:text-start font-normal text-gray-300 capitalize lg:text-3xl">
               {{ $settings.sections.home.contact.title}}
              </h1>

              <div class="mt-2">
                <span class="inline-block w-40 h-1 bg-amber-500 rounded-full"></span>
                <span class="inline-block w-3 h-1 ml-1 bg-amber-500 rounded-full"></span>
                <span class="inline-block w-1 h-1 ml-1 bg-amber-500 rounded-full"></span>
              </div>
        </div>
      </div>


      <div class="flex flex-col lg:flex-row gap-4">

        <!-- the contact infos -->
        <div class="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
          <div class="text-neutral-100 flex flex-wrap">
          
            <div class="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3" >
              <div class="p-4 flex items-center bg-white bg-opacity-20 backdrop-blur rounded-md">
                  <!-- THE SVG ICON -->
                  <!--  -->
                <div class="block flex items-center rounded-md bg-primary-100 h-8 w-8 fill-white" v-html= $settings.sections.home.contact.field_1.icon ></div>   

                <div class="basis-auto" >
                  
                  <p class="mb-2 font-medium" >
                  {{$settings.sections.home.contact.field_1.title}}
                  </p>
                  <p class="text-neutral-300">
                  {{$settings.sections.home.contact.field_1.email}}
                  </p>
                  <p class="text-neutral-300">
                  {{$settings.sections.home.contact.field_1.phone}}
                  </p>
                </div>
              </div>
            </div>

            <div class="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3" >
              <div class="p-4 flex items-center bg-white bg-opacity-20 backdrop-blur rounded-md">
                  <!-- THE SVG ICON -->
                  <!--  -->
                <div class="block flex items-center fill-white rounded-md bg-primary-100 h-8 w-8" v-html= $settings.sections.home.contact.field_2.icon ></div>

                <div class="basis-auto">
                  <p class="mb-2 font-medium">
                  {{$settings.sections.home.contact.field_2.title}}
                  </p>
                  <p class="text-neutral-300">
                  {{$settings.sections.home.contact.field_2.email}}
                  </p>
                  <p class="text-neutral-300">
                  {{$settings.sections.home.contact.field_2.phone}}
                  </p>
                </div>
              </div>
            </div>

            <div class="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3" >
              <div class="p-4 flex items-center bg-white bg-opacity-20 backdrop-blur rounded-md">
                  <!-- THE SVG ICON -->
                  <!--  -->
                  <div class="block flex items-center fill-white rounded-md bg-primary-100 h-8 w-8" v-html= $settings.sections.home.contact.field_3.icon ></div>

                <div class="basis-auto">
                  <p class="mb-2 font-medium">
                  {{$settings.sections.home.contact.field_3.title}}
                  </p>
                  <p class="text-neutral-300">
                  {{$settings.sections.home.contact.field_3.email}}
                  </p>
                  <p class="text-neutral-300">
                  {{$settings.sections.home.contact.field_3.phone}}
                  </p>
                </div>
              </div>
            </div>

            <div class="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3" >
              <div class="p-4 flex items-center bg-white bg-opacity-20 backdrop-blur rounded-md">
                  <!-- THE SVG ICON -->
                  <!--  -->
                  <div class="block flex items-center fill-white rounded-md bg-primary-100 h-8 w-8"  v-html= $settings.sections.home.contact.field_4.icon ></div>
                <div class="basis-auto">
                  <p class="mb-2 font-medium">
                  {{$settings.sections.home.contact.field_4.title}}
                  </p>
                  <p class="text-neutral-300">
                  {{$settings.sections.home.contact.field_4.email}}
                  </p>
                  <p class="text-neutral-300">
                  {{$settings.sections.home.contact.field_4.phone}}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
        

        <!-- the form -->
        <div
          class="py-10 mb-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-md w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6"
        >
          <form class="text-white mx-4">
            <div class="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                id="exampleInput90"
                
              />
              <label
                class="text-white pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                for="exampleInput90"
                >
                {{$settings.sections.home.contact.form.name}}
              </label>
            </div>
            <div class="relative mb-6" data-te-input-wrapper-init>
              <input
                type="email"
                class="peer block min-h-[auto] w-full rounded border bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                id="exampleInput91"
              />
              <label
                class="text-white pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                for="exampleInput91"
                >
                {{$settings.sections.home.contact.form.email}}
              </label>
            </div>
            <div class="relative mb-6" data-te-input-wrapper-init>
              <textarea
                class="peer block min-h-[auto] w-full rounded border bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
              <label
                for="exampleFormControlTextarea1"
                class="text-white pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                >
                {{$settings.sections.home.contact.form.message}}
                </label
              >
            </div>
            
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              class="mb-6 inline-block w-full rounded bg-amber-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#000] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              {{$settings.sections.buttons.formbutton.text}} 
            </button>
          </form>
        </div>
       
      </div>
    </section>
  </div>
  </div>
 
</template>

<script>
  export default {
   data() {
    return {
      loading:false,
    }
   },
}
</script>
