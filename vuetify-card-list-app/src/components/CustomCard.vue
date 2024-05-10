<script setup>
  import {computed} from 'vue'
  const {cardInfo} = defineProps({
    cardInfo: {
      type: Object,
      required: true
    }
  })
  
  const chipsColors = computed(() => ({
    perishable: 'red',
    cleaning: 'green',
    hygiene: 'blue',
    home: 'orange',
  }))
</script>

<template>
  <v-card
    class="mx-auto rounded-xl"
    max-width="450"
  >
    <v-img
      :aspect-ratio="16/9" 
      :src="`${cardInfo.imgUrl}`"
      cover
    >
    </v-img>
    <v-card-title class="flex-column align-start">
      <div class="text-h4 mb-2">
        {{ cardInfo.name }}
      </div>
      <div class="text-h6 font-weight-regular text-grey">
        {{ cardInfo.desc }}
      </div>
    </v-card-title>
    <v-card-text >
      <v-chip
        v-for="item, i in cardInfo.select"
        :key="i"
        :color="chipsColors[item.toLowerCase()]"
        class="ma-2"
        size="small"
        
      >
        {{ item }}
      </v-chip>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

  </v-card>
</template>
