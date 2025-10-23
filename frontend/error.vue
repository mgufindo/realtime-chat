<template>
  <div
    class="h-screen max-h-screen from-gray-50 to-blue-50 flex items-center justify-center p-4 bg-[url('/img/bg-blue.png')] bg-cover"
  >
    <!-- Main Content -->
    <div class="grid md:grid-cols-12 items-center">
      <div class="md:hidden flex justify-center items-center">
        <img :src="img" class="object-center object-cover max-h-72" />
      </div>
      <div
        class="md:col-span-7 md:-mt-24 flex flex-col justify-center items-center"
      >
        <h1
          class="concert drop-shadow-md text-8xl md:text-[15rem] lg:text-[18.875rem] font-bold bg-gradient-to-t from-[#106FF6] to-[#A7CAFB] from-20% to-70% bg-clip-text text-transparent"
        >
          {{
            [404, 401, 503].includes(props.error?.statusCode)
              ? props.error?.statusCode
              : 500
          }}
        </h1>
        <div
          class="flex flex-col items-center gap-3 md:gap-4 md:-mt-12 lg:-mt-16 text-center z-10 text-white bg-gradient-to-t from-[#106FF6] to-transparent"
        >
          <h2
            class="font-bold text-xl md:text-3xl lg:text-5xl text-sans-jakarta"
          >
            {{ title }}
          </h2>
          <p class="text-xs md:text-base !text-white">{{ desc }}</p>
          <button
            v-if="redirect === 'back'"
            @click="useRouter().back"
            class="bg-landing-white text-landing-primary w-fit rounded-full px-6 py-2 font-semibold"
          >
            {{ textBtn }}
          </button>
          <NuxtLink
            v-else
            :to="redirect"
            class="bg-landing-white text-landing-primary w-fit rounded-full px-6 py-2 font-semibold"
          >
            {{ textBtn }}
          </NuxtLink>
        </div>
      </div>
      <div class="hidden md:flex md:col-span-5 justify-center items-center">
        <img :src="img" class="object-center object-cover max-h-[31.25rem]" />
      </div>
    </div>

    <!-- Support Modal -->
    <Transition name="fade">
      <div
        v-if="showSupport"
        class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        @click.self="showSupport = false"
      >
        <div class="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">
              Hubungi Dukungan
            </h3>
            <button
              @click="showSupport = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="bg-blue-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Email</p>
                  <a
                    href="mailto:support@safarana.my.id"
                    class="font-medium text-blue-600 hover:underline"
                    >urwahsolusiteknologi@gmail.com</a
                  >
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="bg-blue-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Telepon</p>
                  <a
                    href="tel:+62859106520684"
                    class="font-medium text-blue-600 hover:underline"
                    >+62 859 1065 20684</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const token = useCookie(config.public.token);

const props = defineProps({
  error: Object,
});

const showSupport = ref(false);
const fullText =
  "Halaman yang Anda cari tidak tersedia. Mungkin telah dipindahkan atau dihapus.";

const title = ref<string>("");
const desc = ref<string>("");
const redirect = ref<string>("");
const textBtn = ref<string>("");
const img = ref<string>("");

onMounted(() => {
  if (props.error?.statusCode === 404) {
    title.value = "Ooups! Destinasi ini udah dihapus.";
    desc.value = "Salah jalur? Tenang, beranda nungguin kamu pulang.";
    redirect.value = "back";
    textBtn.value = "Yuk pulang, udah kejauhan";
    img.value = "/img/error/404.png";
  }
  if (props.error?.statusCode === 401) {
    title.value = "Waduhh, kamu belum check-in ya?";
    desc.value = "Ini ruangan eksklusif, cuma buat yang udah check-in aja. ";
    redirect.value = "/auth";
    textBtn.value = "Gas Check-in dulu";
    img.value = "/img/error/401.png";
  }

  if (props.error?.statusCode === 503) {
    title.value = "Waduhh, kamu belum check-in ya?";
    desc.value = "Ini ruangan eksklusif, cuma buat yang udah check-in aja. ";
    redirect.value = "back";
    textBtn.value = "Gas Check-in dulu";
    img.value = "/img/error/503.png";
  }

  if (
    props.error?.statusCode !== 503 &&
    Number(props.error?.statusCode) >= 500 &&
    Number(props.error?.statusCode) <= 599
  ) {
    title.value = "Aduh! Servernya lagi ngambek...";
    desc.value =
      "Tenang ya, tim kami lagi berusaha menenangkan server yang lagi drama.";
    redirect.value = "back";
    textBtn.value = "Balik ke beranda aja dulu";
    img.value = "/img/error/500.png";
  }
});
const handleError = () => clearError({ redirect: "/" });
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
