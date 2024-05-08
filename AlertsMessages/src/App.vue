<script setup>
import { ref } from 'vue'
import AlertMessage from './components/AlertMessage.vue'

const newAlert = ref({
  text: '',
  type: 'Info',
  id: 0
})

const alert = ref([
])

const addNewAlert = () => {
  if (!newAlert.value.text) return
  newAlert.value.id = alert.value.length + 1
  newAlert.value.type = newAlert.value.type.toLowerCase()
  alert.value.push(newAlert.value)
  newAlert.value = {
    text: '',
    type: 'Info',
    id: 0
  }
}

const removeAlertById = (a) => {
  alert.value = alert.value.filter(alertItem => alertItem.id !== a.id)
}
</script>

<template>
  <div class="container mx-auto p-4 bg-base-100 rounded shadow m-4 p-4 justify-center flex">
    <ul class="menu bg-base-200 w-fill rounded-box p-2">
      <li>
        <h2 class="menu-title text-xl font-bold text-white">My Alerts</h2>
        <ul class="flex flex-col w-full p-5 gap-5 rounded-box bg-base-100">
          <AlertMessage v-for="a in alert" :key="a.id" :text="a.text" :type="a.type" :id="a.id" @close="removeAlertById(a)" />
        </ul>
      </li>
      <div class="divider">
        <input v-model="newAlert.text" type="text" placeholder="Alert Text" class="input input-bordered w-full" required>
        <select class="select select-bordered w-full" v-model="newAlert.type">
          <option>Success</option>
          <option>Warning</option>
          <option>Error</option>
          <option>Info</option>
        </select>
        <button class="btn btn-primary" @click="addNewAlert">Add Alert</button>
      </div>
    </ul>
  </div>
</template>

<style scoped></style>

