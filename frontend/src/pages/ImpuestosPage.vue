<template>
    <v-container>
        <div class="text-center ma-2">
            <v-btn class="mr-2" color="blue-darken-1" @click.stop="quincenaSeleccionada = 1">Primera quincena</v-btn>
            <v-btn color="blue-darken-1" @click.stop="quincenaSeleccionada = 2">Segunda quincena</v-btn>
        </div>
        <div class="text-center ma-2">
            IMPUESTO AL VALOR AGREGADO, ANTICIPIOS DE ISLR, IGTF Y RENTECIONES DE IVA
        </div>
        <TablaFechaImpuesto v-if="quincenaSeleccionada === 1" :quincena="1"></TablaFechaImpuesto>
        <TablaFechaImpuesto v-if="quincenaSeleccionada === 2" :quincena="2"></TablaFechaImpuesto>
    </v-container>
</template>

<script lang="ts" setup>
import {ref, Ref} from "Vue"
import TablaFechaImpuesto from "../components/TablaFechaImpuesto.vue";

const quincenaSeleccionada = ref(1)


</script>