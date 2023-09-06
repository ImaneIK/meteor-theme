<template>
  <div>

    <div v-if="loading" class="flex justify-center items-center h-screen">
      <si-Loader />
    </div>
  
     <!-- dark & fixed background image -->
     <!-- background-image: url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdevx.work%2Fblog%2Fwp-content%2Fuploads%2F2021%2F03%2FLOUNGE-01-1920x1024.jpg&f=1&nofb=1&ipt=bc89ea53d39a8da6df1ca59ed5daba3155d44fa3627e5071448aecd5da8be808&ipo=images');
       -->
  <div v-if="!loading"
    class="dark-background w-screen h-content object-cover p-8 lg:p-24"
    
    :style="`
    background-image: url(${$settings.contact.image.src});
      background-color: gray;
      background-blend-mode: multiply;
      background-attachment: fixed;
    `"
  >
    <!-- Section: Design Block -->
    <section class="">

      <!-- titling -->
      <div class="mb-4 flex flex-col gap-4 md:flex-row justify-center lg:justify-start md:justify-between items-center">
        <div>
              <h1 class="text-2xl text-center lg:text-start font-normal text-gray-300 capitalize lg:text-3xl">
               {{ $settings.sections.contact.heading }}
              </h1>

              <div class="mt-2">
                <span class="inline-block w-40 h-1 bg-amber-500 rounded-full"></span>
                <span class="inline-block w-3 h-1 ml-1 bg-amber-500 rounded-full"></span>
                <span class="inline-block w-1 h-1 ml-1 bg-amber-500 rounded-full"></span>
              </div>
        </div>
      </div>


      <div class="flex flex-wrap ">

        <!-- the contact infos -->
        <div class="lg:p-12 w-full shrink-0 grow-0 basis-auto lg:w-7/12">
          
          <div class="text-neutral-100 flex flex-wrap">
          
            <div class="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3" >
              <div class="p-4 flex items-center bg-white bg-opacity-20 backdrop-blur rounded-md">
                  <!-- THE SVG ICON -->
                  <div class="inline-block rounded-md bg-primary-100 h-8 w-8" v-html= $settings.contact.firstfield.icon></div>

                <div class="ml-6 basis-auto" >
                  
                  <p class="mb-2 font-medium" >{{$settings.contact.firstfield.title}}</p>
                  <p class="text-neutral-300">{{$settings.contact.firstfield.email}}</p>
                  <p class="text-neutral-300">{{$settings.contact.firstfield.phone}}</p>
                </div>
              </div>
            </div>

            <div class="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3" >
              <div class="p-4 flex items-center bg-white bg-opacity-20 backdrop-blur rounded-md">
                  <!-- THE SVG ICON -->
                  <div class="inline-block rounded-md bg-primary-100 h-8 w-8" v-html= $settings.contact.secondfield.icon></div>

                <div class="ml-6 basis-auto">
                  <p class="mb-2 font-medium">{{$settings.contact.secondfield.title}}</p>
                  <p class="text-neutral-300">{{$settings.contact.secondfield.email}}</p>
                  <p class="text-neutral-300">{{$settings.contact.secondfield.phone}}</p>
                </div>
              </div>
            </div>

            <div class="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3" >
              <div class="p-4 flex items-center bg-white bg-opacity-20 backdrop-blur rounded-md">
                  <!-- THE SVG ICON -->
                  <div class="inline-block rounded-md bg-primary-100 h-8 w-8" v-html= $settings.contact.thirdfield.icon></div>

                <div class="ml-6 basis-auto">
                  <p class="mb-2 font-medium">{{$settings.contact.thirdfield.title}}</p>
                  <p class="text-neutral-300">{{$settings.contact.thirdfield.email}}</p>
                  <p class="text-neutral-300">{{$settings.contact.thirdfield.phone}}</p>
                </div>
              </div>
            </div>

            <div class="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3" >
              <div class="p-4 flex items-center bg-white bg-opacity-20 backdrop-blur rounded-md">
                  <!-- THE SVG ICON -->
                  <div class="inline-block rounded-md bg-primary-100 h-8 w-8" v-html= $settings.contact.forthfield.icon></div>
                <div class="ml-6 basis-auto">
                  <p class="mb-2 font-medium">{{$settings.contact.forthfield.title}}</p>
                  <p class="text-neutral-300">{{$settings.contact.forthfield.email}}</p>
                  <p class="text-neutral-300">{{$settings.contact.forthfield.phone}}</p>
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
                >{{$settings.contact.form.name.label}}
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
                >{{$settings.contact.form.email.label}}
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
                >{{$settings.contact.form.message.label}}</label
              >
            </div>
            <div
              class="mb-6 inline-block min-h-[1.5rem] justify-center pl-[1.5rem] flex gap-8"
            >
              <input
                class="px-2 block mx-2 relative float-start mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                type="checkbox"
                value=""
                id="exampleCheck96"
                checked
              />
              <label
                class="block px-2 pl-[0.15rem] hover:cursor-pointer"
                for="exampleCheck96"
              >
                Send me a copy of this message
              </label>
            </div>
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              class="mb-6 inline-block w-full rounded bg-amber-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#000] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              Send
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
   
}
</script>
