<template>
  <v-container>
    <v-row class="text-center ma-5">
      <v-col cols="12" md="12">
        <v-dialog max-width="340">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              prepend-icon="mdi-plus-thick"
              width="204"
              color="primary"
            >
              Add Item
            </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <add-item-form @submit="submitForm"></add-item-form>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import AddItemForm from '@/components/addItemForm.vue'
  export default {
    data () {
      return {
        btn: null,
      }
    },
    methods:{
      submitForm(e) {
        this.$emit('submit', e)
      },
      
    }
  }
</script>