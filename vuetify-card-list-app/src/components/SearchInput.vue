<template>
  <v-card
    class="mx-auto "
    color="#64B5F6"
    max-width="400"
    flat
  >
      <v-text-field
        v-model ="text"
        bg-color="#64B5F6"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search Items"
        variant="solo"
        hide-details
        single-line
        @input="onInput"
      ></v-text-field>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      text: '',
    }),

    methods: {
      onInput () {
        this.$emit('inputText', this.text) 

      },
    },
  }
</script>