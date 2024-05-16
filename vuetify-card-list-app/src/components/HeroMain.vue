<template>
  <v-parallax
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    height="350"
    class="elevation-15"
  >
    <v-icon
      icon="mdi-exit-to-app"
      @click="$emit('signOut')"
      class="position-absolute ma-10"
      color="white"
      size="30"
    />
    <div
      class="d-flex flex-column h-100 justify-center align-center text-white"
    >
      <h1 class="text-h4 font-weight-bold mb-4">
        {{ this.title }}
      </h1>
      <h4 class="subheading font-weight-medium">
        {{ this.subtitle }}
      </h4>
    </div>
  </v-parallax>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
};
</script>
