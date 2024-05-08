<script setup>
import InfoIcon from './icons/IconInfo.vue'
import ErrorIcon from './icons/IconError.vue'
import SuccessIcon from './icons/IconSuccess.vue'
import WarningIcon from './icons/IconWarning.vue'

import { computed } from 'vue'
const { text, type, id } = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info'
  },
  id: {
    type: Number,
    required: true
  }
})

//define components

const emit = defineEmits(['close'])

const close = () => emit('close', id)

const icons = computed(() => ({
  info: InfoIcon,
  error: ErrorIcon,
  success: SuccessIcon,
  warning: WarningIcon
}))
const alertClass = computed(() => `alert alert-${type}`)

</script>
<template>
  <div role="alert" :class="alertClass">
    <component :is="icons[type]" />
    <span>{{ text }}</span>
    <button @click="close" class="btn btn-sm btn-ghost">X</button>
  </div>
</template>
