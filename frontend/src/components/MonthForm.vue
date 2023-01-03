<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field v-model="modelValue!.enero" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(1)" label="Enero" required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field v-model="modelValue!.febrero" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(2)" label="Febrero" required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field v-model="modelValue!.marzo" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(3)" label="Marzo" required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field v-model="modelValue!.abril" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(4)" label="Abril" required></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="modelValue!.mayo" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(5)" label="Mayo" required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field v-model="modelValue!.junio" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(6)" label="Junio" required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field v-model="modelValue!.julio" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(7)" label="Julio" required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field v-model="modelValue!.agosto" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(8)" label="Agosto" required></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="modelValue!.septiembre" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(9)" label="Septiembre" required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field v-model="modelValue!.octubre" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(10)" label="Octubre" required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field v-model="modelValue!.noviembre" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(11)" label="Noviembre" required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field v-model="modelValue!.diciembre" :rules="inputRules" min="1" type="number"
                    :max="maxAccordingToMonth(12)" label="Diciembre" required></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>import { Fecha } from '../interfaces/Fecha';


const inputRules = [
        (v:string) => !!v || 'Este valor es requerido',
        (v:string) => !isNaN(parseInt(v)) || 'Este valor debe ser numerico',
        (v:string) => (parseInt(v)) >= 1 || 'Este valor debe ser mayor de uno',
    ] 

    const maxAccordingToMonth = (month: number) :number=>{
        const date = new Date()
        const maxDate = new Date(date.getFullYear(),month-1,31)
        return maxDate.getDate()<31 ? 31-maxDate.getDate() : maxDate.getDate()
    }

    const {modelValue} = defineProps({
        modelValue: Fecha
    })

    const emit = defineEmits(['update:modelValue'])

</script>