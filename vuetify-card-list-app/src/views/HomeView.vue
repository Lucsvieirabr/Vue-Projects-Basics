<template>
  <hero-main title="Card List App" subtitle="A Vuetify List of cards" />

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
      @update:showModal="(e) => (showModal = e)"
      @close="closeModal"
      class="position-absolute"
    />
  </v-container>

  <v-row justify="center">
    <v-col cols="6" md="3">
      <search-input
        :model-value="searchText"
        @update:model-value="(newValue) => (searchText = newValue)"
      />
    </v-col>
    <v-col cols="6" md="3" class="justify-start">
      <tags-input
        :model-value="tags"
        @update:model-value="(newValue) => (tags = newValue)"
      />
    </v-col>
  </v-row>
  <v-container grid-list-md>
    <v-row>
      <v-col v-for="(card, i) in visibleCards" :key="i" cols="12" sm="6" md="4">
        <custom-card
          :cardInfo="card"
          @delete="handleDelete"
          @edit="handleEdit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HeroMain from "@/components/HeroMain.vue";
import ModalAddItems from "@/components/modalAddItems.vue";
import CustomCard from "@/components/CustomCard.vue";
import SearchInput from "@/components/SearchInput.vue";
import TagsInput from "@/components/tagsInput.vue";
export default {
  data() {
    return {
      cards: {},
      searchText: "",
      editingCard: null,
      showModal: false,
      tags: [],
    };
  },
  computed: {
    visibleCards() {
      if (!this.searchText && !this.tags.length) {
        return this.cards;
      }
      const filteredCards = Object.keys(this.cards).reduce((acc, key) => {
        const card = this.cards[key];
        if (
          card.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
          card.tagsValues.some((item) => this.tags.includes(item))
        ) {
          acc[key] = card; // Directly mutate accumulator
        }
        return acc;
      }, {}); // Initial empty object (optional for immutability)

      return filteredCards;
    },
  },
  methods: {
    handleSubmit(e) {
      this.editingCard = null;
      const id = Math.random().toString(36).substr(2, 9);
      const item = {
        ...e,
        id,
      };
      this.cards = { ...this.cards, [id]: { ...item } };
    },
    handleDelete(id) {
      delete this.cards[id];
    },
    handleEdit(id) {
      this.editingCard = this.cards[id];
      this.showModal = true;
    },
    handleEditSubmit(e) {
      this.showModal = false;
      this.cards[e.id] = e;
      this.editingCard = null;
    },
    closeModal() {
      this.editingCard = null;
      this.showModal = false;
    },
  },
};
</script>
