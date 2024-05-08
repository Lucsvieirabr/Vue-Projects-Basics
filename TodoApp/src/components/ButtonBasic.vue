<script setup>
const { text } = defineProps({
  text: {
    type: String,
    required: true,
    default: 'Click me'
  }
})
</script>
<template>
  <button type="submit" class="btn btn-primary">{{ text }}</button>
</template>
