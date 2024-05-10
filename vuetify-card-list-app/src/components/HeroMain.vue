<script setup>
const {title, subtitle} = defineProps({
  title:{
    type: String,
    required: true
  },
  subtitle:{
    type: String,
    required: true
  }
})
</script>

<template>
  <v-parallax
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    height="350"
    class="elevation-15"
  >
    <div class="d-flex flex-column h-100 justify-center align-center text-white">
      <h1 class="text-h4 font-weight-bold mb-4">
        {{ title }}
      </h1>
      <h4 class="subheading font-weight-medium">
        {{ subtitle }}
      </h4>
    </div>
  </v-parallax>
</template>