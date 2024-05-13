<template>
  <v-app>

    <v-main >  

      <hero-main title="Card List App" subtitle="A Vuetify List of cards"/>

        <v-container class="d-flex justify-center">

          <v-btn
            class="position-relative" 
            @click="showModal = true"
            prepend-icon="mdi-plus-thick"
            width="204"
            color="primary"
          >
            Add Item
          </v-btn>

          <modal-add-items 
          v-if="showModal" 
          @edit="handleEditSubmit" 
          @submit="handleSubmit" 
          :editing="editingCard" 
          :show-modal="showModal" 
          @close="showModal = false"
          class="position-absolute"
          />

        </v-container> 

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
            <custom-card :cardInfo="card" @delete="handleDelete" @edit="handleEdit"/>

          </v-col>

        </v-row>

      </v-container>

    </v-main>

  </v-app>
</template>

<script>
  import HeroMain from '@/components/HeroMain.vue'
  import ModalAddItems from '@/components/modalAddItems.vue'
  import CustomCard from '@/components/CustomCard.vue'
  import SearchInput from '@/components/SearchInput.vue'
  
  export default {
    data() {
      return {
        cards: [],
        searchText: '',
        editingCard: null,
        showModal: false,
      }
    },
    computed: {
      visibleCards() {
        if(!this.searchText) {
          return this.cards
        }
        const filteredCards = this.cards.filter((card) =>
          card.name.toLowerCase().includes(this.searchText.toLowerCase())
        )
        return filteredCards 
      }
    },
    methods: {
      handleSubmit(e) {
        this.editingCard = null
        const item  = {
          ...e,
          id: this.cards.length,
        }
        this.cards.push(item)
      },
      handleInput(e) {
        this.searchText = e
      },
      handleDelete(id) {
        this.cards = this.cards.filter((card) => card.id !== id)
      },
      handleEdit(id) {
        this.editingCard = this.cards.find((card) => card.id === id)
        this.showModal = true
      },
      handleEditSubmit(e) {
        this.showModal = false
        const index = this.cards.findIndex((card) => card.id === e.id)
        this.cards[index] = e
      }
    }

  }
</script>


