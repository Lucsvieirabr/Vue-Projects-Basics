<script setup>
  import HeroMain from '@/components/HeroMain.vue'
  import ModalAddItems from '@/components/modalAddItems.vue'
  import CustomCard from '@/components/CustomCard.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import {ref, computed} from 'vue'

  const cards = ref([])
  const searchText = ref('')
  const visibleCards = computed(() => {
    if(!searchText.value) {
      return cards.value
    }
    const filteredCards = cards.value.filter((card) =>
      card.name.toLowerCase().includes(searchText.value.toLowerCase())
    )
    return filteredCards 
  })
  const handleSubmit = (e) => {
    const item  = {
      ...e
    }
    cards.value.push(item)
  }

  const handleInput = (e) => {
    searchText.value = e
  }

  const checkSearch = () => {
    if(searchText.value.length > 0 && cards.value.length > 0) {
      return card.name.toLowerCase().includes(searchText.value.toLowerCase())
    } 
  }
</script>

<template>
  <v-app>
    <v-main >  
      <hero-main title="Card List App" subtitle="A Vuetify List of cards"/>
        <modal-add-items @submit="handleSubmit" />
        <search-input @inputText="handleInput"/>
      <v-container grid-list-md>
        <v-row>
          <v-col
            v-for="card, i in visibleCards"
            :key="card.i"
            cols="12"
            sm="6"
            md="4"
          >
            <custom-card :cardInfo="card"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


