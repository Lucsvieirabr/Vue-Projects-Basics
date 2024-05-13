<template>
  <v-container>
    <v-row class="text-center ma-5">
      <v-col cols="12" md="12">
        <v-dialog v-model="showModalDt" max-width="340" @click:outside="$emit('close')">
            <add-item-form @edit="submitEditItem" @submit="submitForm" :editing="editing"></add-item-form>
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
        showModalDt: false,
      }
    },
    methods:{
      submitForm(e) {
        this.$emit('submit', e)
      },
      submitEditItem(e) {
        this.$emit('edit', e)
      }
      
    },
    props:{
      editing: {
        type: Object,
        default: null
      },
      showModal: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.showModalDt = this.showModal
    }
  }
</script>