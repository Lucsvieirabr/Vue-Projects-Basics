<template>
  <form @submit.prevent class="bg-surface pa-4 rounded">
    <v-text-field
      v-model="state.name"
      :counter="10"
      :error-messages="v$.name.$errors.map((e) => e.$message)"
      label="Item Name"
      required
      @blur="v$.name.$touch"
      @input="v$.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.desc"
      :counter="30"
      :error-messages="v$.desc.$errors.map((e) => e.$message)"
      label="Item Description"
      required
      @blur="v$.desc.$touch"
      @input="v$.desc.$touch"
    ></v-text-field>

    <v-select
      v-model="state.select"
      :error-messages="v$.select.$errors.map((e) => e.$message)"
      :items="items"
      label="Chips"
      multiple
      required
      @blur="v$.select.$touch"
      @change="v$.select.$touch"
    ></v-select>

    <v-file-input
      v-model="state.file"
      accept="image/png, image/jpeg, image/bmp"
      label="Item Image"
      placeholder="Pick an avatar"
      prepend-icon="mdi-camera"
    ></v-file-input>

    <v-btn class="ma-4" size="small" color="teal" @click="trySubmit">
      submit
    </v-btn>
    <v-btn color="red-darken-1" class="ma-4" size="small" @click="clear">
      clear
    </v-btn>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";

export default {
  props: {
    editing: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      initialState: {
        name: "",
        desc: "",
        file: null,
        select: null,
        imgUrl: "",
        id: null,
      },
      state: {
        name: "",
        desc: "",
        file: null,
        select: null,
        imgUrl: "",
        id: null,
      },
      items: ["Perishable", "Cleaning", "Hygiene", "Home"],
      v$: useVuelidate(
        {
          name: { required: true },
          desc: { required: true },
          select: { opcional: true },
          items: { opcional: true },
        },
        this.state
      ),
    };
  },
  methods: {
    trySubmit() {
      this.v$.$validate().then(async () => {
        if (this.v$.$error) return;

        const reader = new FileReader();
        reader.readAsDataURL(this.state.file);

        reader.onload = () => {
          const myimgUrl = reader.result; // Access the result from FileReader
          this.state.imgUrl = myimgUrl;
          if (this.editing) {
            this.$emit("edit", this.state);
            return;
          }
          this.$emit("submit", this.state);
        };

        reader.onerror = (error) => {
          console.error("Error occurred while reading the file:", error);
        };
      });
    },
    clear() {
      this.v$.$reset();

      for (const key in this.initialState) {
        this.state[key] = this.initialState[key];
      }
    },
  },
  mounted() {
    if (this.editing) {
      this.state = { ...this.editing };
    }
  },
};
</script>
