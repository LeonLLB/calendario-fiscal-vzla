<template>
    <v-container>
        <div class="text-center ma-2">
            <v-btn class="mr-2" color="blue-darken-1" @click.stop="componentToDisplay = 'quincena';quincenaSeleccionada = 1">Ver primera quincena</v-btn>
            <v-btn color="blue-darken-1" @click.stop="componentToDisplay = 'quincena';quincenaSeleccionada = 2">Ver segunda quincena</v-btn>
            <v-btn class="ml-2" color="blue-darken-1" @click.stop="componentToDisplay = 'empresas'">Ver empresas por declarar</v-btn>
        </div>
        <div class="text-center ma-2">
            IMPUESTO AL VALOR AGREGADO, ANTICIPIOS DE ISLR, IGTF Y RENTECIONES DE IVA
        </div>
        <TablaFechaImpuesto v-if="componentToDisplay === 'quincena' && quincenaSeleccionada === 1" :quincena="1"></TablaFechaImpuesto>
        <TablaFechaImpuesto v-if="componentToDisplay === 'quincena' && quincenaSeleccionada === 2" :quincena="2"></TablaFechaImpuesto>
    </v-container>
</template>

<script lang="ts" setup>
import {ref, Ref} from "Vue"
import TablaFechaImpuesto from "../components/TablaFechaImpuesto.vue";

const quincenaSeleccionada = ref(1)
const componentToDisplay: Ref<'quincena' | 'empresas'> = ref('quincena')


</script>