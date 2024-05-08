//scrip setup and template
<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  username: {
    type: String,
    required: true
  }
})
const response = ref()

const fetchUserData = async () => {
  const url = `https://api.github.com/users/${props.username}`
  const userData = await fetch(url)
  response.value = await userData.json()
}

onMounted(fetchUserData)
</script>

<template>
  <div class="card card-side bg-base-100 shadow-xl">
    <figure>
      <img :src="response?.avatar_url" alt="Movie" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ response?.name }}</h2>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">
          <a :href="response?.html_url">View Profile</a>
        </button>
      </div>
    </div>
  </div>
</template>
