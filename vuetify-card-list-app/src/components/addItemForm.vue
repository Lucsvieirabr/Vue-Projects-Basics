<template>
  <v-form @submit.prevent class="bg-surface pa-4 rounded" ref="form">
    <v-text-field
      v-model="state.name"
      :counter="10"
      :rules="rules.nameRules"
      label="Item Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="state.desc"
      :counter="30"
      :rules="rules.descRules"
      label="Item Description"
      required
    ></v-text-field>

    <v-select
      v-model="state.tagsValues"
      :rules="rules.tagsRules"
      :items="tags"
      label="Tags"
      multiple
      required
    ></v-select>

    <v-file-input
      ref="fileInput"
      v-model="state.file"
      :rules="rules.fileRules"
      accept="image/png, image/jpeg, image/bmp"
      label="Item Image"
      placeholder="Pick an avatar"
      prepend-icon="mdi-camera"
      required
    ></v-file-input>

    <v-btn class="ma-4" size="small" color="teal" @click="trySubmit">
      submit
    </v-btn>
    <v-btn color="red-darken-1" class="ma-4" size="small" @click="clear">
      clear
    </v-btn>
  </v-form>
</template>

<script>
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
        tagsValues: null,
        imgUrl: "",
        id: null,
      },
      state: { ...this.initialState },
      tags: ["Perishable", "Cleaning", "Hygiene", "Home"],

      rules: {
        nameRules: [
          (v) => !!v || "Name is required",
          (v) =>
            (v && v.length <= 10) || "Name must be less than 10 characters",
        ],
        descRules: [
          (v) => !!v || "Description is required",
          (v) =>
            (v && v.length <= 30) ||
            "Description must be less than 30 characters",
        ],
        fileRules: [(value) => value.length > 0 || "Image is required"],
        tagsRules: [(value) => !!value || "Tags are required"],
      },
    };
  },
  methods: {
    async trySubmit() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;

      const fileReader = new FileReader();
      const file = this.state.file;

      return new Promise((resolve, reject) => {
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          const imgUrl = fileReader.result;

          if (this.editing) {
            this.$emit("edit", { ...this.state, imgUrl });
            resolve();
            return;
          }

          this.$emit("submit", { ...this.state, imgUrl });
        };

        fileReader.onerror = (error) => reject(error);
      });
    },
    clear() {
      this.state = { ...this.initialState };
    },
  },
  mounted() {
    if (this.editing) {
      this.state = { ...this.editing };
    }
  },
};
</script>
