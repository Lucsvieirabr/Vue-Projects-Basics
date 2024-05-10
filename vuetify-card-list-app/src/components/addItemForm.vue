<template>
  <form @submit.prevent class="bg-surface pa-4 rounded ">
    
    <v-text-field
      v-model="state.name"
      :counter="10"
      :error-messages="v$.name.$errors.map(e => e.$message)"
      label="Item Name"
      required
      @blur="v$.name.$touch"
      @input="v$.name.$touch"
    ></v-text-field>


    <v-text-field
      v-model="state.desc"
      :counter="30"
      :error-messages="v$.desc.$errors.map(e => e.$message)"
      label="Item Description"
      required
      @blur="v$.desc.$touch"
      @input="v$.desc.$touch"
    ></v-text-field>

    <v-select
      v-model="state.select"
      :error-messages="v$.select.$errors.map(e => e.$message)"
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

    <v-btn
      class="ma-4"
      size="small"
      color="teal"
      @click="trySubmit"
    >
      submit
    </v-btn>
    <v-btn 
      color="red-darken-1"
      class="ma-4" size="small" @click="clear">
      clear
    </v-btn>
  </form>
</template>
<script setup>
  import { reactive, ref } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'

  const initialState = {
    name: '',
    desc: '',
    file: null,
    select: null,
    imgUrl: '',
  }

  const state = reactive({
    ...initialState,
  })

  const items = [
    'Perishable',
    'Cleaning',
    'Hygiene',
    'Home',
  ]
  const rules = {
    name: { required },
    desc: { required },
    select: { opcional: true },
    items: { opcional: true },
  }

  const v$ = useVuelidate(rules, state)

  const emit = defineEmits(['submit'])
  const trySubmit = async () => {
  if (await v$.value.$validate()) {
    const reader = new FileReader();
    reader.readAsDataURL(state.file);

    reader.onload = () => {
      const myimgUrl = reader.result; // Access the result from FileReader
      state.imgUrl = myimgUrl;
      emit('submit', state)
    };

    reader.onerror = (error) => {
      console.error('Error occurred while reading the file:', error);
    };
  }
};

  function clear () {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }
</script>