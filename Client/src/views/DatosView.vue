<script setup>
import FormularioComponent from '@/components/FormularioComponent.vue';
import TablaClientes from '../components/TablaClientes.vue'
</script>
<template>

    <TablaClientes />
 
</template>
<script>
import { defineComponent } from 'vue';
import apiClient from '../../Tools/api';
export default defineComponent({
    data(){
        return{
            username:""
        }
    },
    methods: {
     
    }
});



</script>

<style></style>