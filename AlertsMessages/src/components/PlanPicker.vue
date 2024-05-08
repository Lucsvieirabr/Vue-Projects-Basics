<script setup>
import { ref } from 'vue'
import CoffeePlan from './CoffeePlan.vue'

const plans = ref(['The Single', 'The Double'])

const selectedCoffePlan = ref()

const handleSelectedPlan = (name) => {
  selectedCoffePlan.value = name
}
</script>

<template>
  <div class="plans">
    <CoffeePlan
      v-for="plan in plans"
      :key="plan"
      :name="plan"
      :selected="plan === selectedCoffePlan"
      @click="handleSelectedPlan(plan)"
    ></CoffeePlan>
  </div>
</template>
