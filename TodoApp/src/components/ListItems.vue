<script setup>
const { items } = defineProps({
  items: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['update-item', 'delete-item'])

const completedClass = 'line-through dark:text-red-500'
</script>

<template>
  <ul
    class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  >
    <div
      v-for="item in items"
      :key="item.id"
      class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 justify-between align-baseline flex items-center"
    >
      <input
        type="checkbox"
        :checked="item.completed"
        @change="emit('update-item', item.id)"
        class="w-4 h-4 bg-gray-100 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <li :class="`w-full px-4 py-2 ${item.completed ? completedClass : ''}`">
        {{ item.name }}
      </li>
      <input
        type="button"
        value="Delete"
        @click="emit('delete-item', item.id)"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      />
    </div>
  </ul>
</template>
