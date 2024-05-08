<script setup>
import { ref, computed } from 'vue'
import InputText from './components/InputText.vue'
import FormTodo from './components/FormTodo.vue'
import ListItems from './components/ListItems.vue'
const allItems = ref([])
const reverseItems = computed(() => [...allItems.value].reverse())

const addNewItem = (itemName) => {
  const newItem = {
    id: allItems.value.length + 1,
    name: itemName,
    completed: false
  }
  allItems.value.push(newItem)
}

const updateItem = (itemId) => {
  const item = allItems.value.find((item) => item.id === itemId)
  item.completed = !item.completed
}
const deleteItem = (itemId) => {
  allItems.value = allItems.value.filter((item) => item.id !== itemId)
}
</script>
<template>
  <div
    class="container mx-auto p-4 w-1/2 mt-10 text-center dark:text-white dark:bg-slate-800 rounded bg-slate-200 shadow-2xl dark:shadow-slate-800 dark:shadow-lg justify-center items-center flex flex-col gap-4 dark:shadow-slate-800"
  >
    <h1 class="text-3xl font-bold">Todo App</h1>
    <form-todo>
      <template #input>
        <input-text @add-item="addNewItem($event)" />
      </template>
    </form-todo>

    <list-items
      :items="reverseItems"
      @update-item="updateItem($event)"
      @delete-item="deleteItem($event)"
    />
  </div>
</template>

<style scoped></style>
