<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Asignar fecha de declaraciones de la {{fechaSeleccionada!.quincena}}{{ fechaSeleccionada!.quincena === 1 ? 'era' : 'da' }} de los RIF terminales en {{ fechaSeleccionada!.terminal_rif }}</span>
        </v-card-title>
        <v-card-text @vnode-before-mount="seedForm">
            <MonthForm v-model="data"></MonthForm>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click.stop="()=>emit('close')" color="blue-darken-1" variant="text">
                Cerrar
            </v-btn>
            <v-btn @click.stop="submit" color="blue-darken-1" variant="text">
                Asignar
            </v-btn>
        </v-card-actions>        
    </v-card>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
import { impuestoController } from '../controllers/Impuestos';
import { FechaImpuestosClass } from '../interfaces/Impuestos';
import MonthForm from './MonthForm.vue';

    const emit = defineEmits(['close','success','error','form-error'])

    const data = ref({
        enero:'',
        febrero:'',
        marzo:'',
        abril:'',
        mayo:'',
        junio:'',
        julio:'',
        agosto:'',
        septiembre:'',
        octubre:'',
        noviembre:'',
        diciembre:'',
    })

    const {fechaSeleccionada} = defineProps({
        fechaSeleccionada: FechaImpuestosClass,
    })

    const seedForm = () => {
        data.value.enero = fechaSeleccionada?.enero !== 0 ? `${fechaSeleccionada?.enero}` : ''
        data.value.febrero = fechaSeleccionada?.febrero !== 0 ? `${fechaSeleccionada?.febrero}` : ''
        data.value.marzo = fechaSeleccionada?.marzo !== 0 ? `${fechaSeleccionada?.marzo}` : ''
        data.value.abril = fechaSeleccionada?.abril !== 0 ? `${fechaSeleccionada?.abril}` : ''
        data.value.mayo = fechaSeleccionada?.mayo !== 0 ? `${fechaSeleccionada?.mayo}` : ''
        data.value.junio = fechaSeleccionada?.junio !== 0 ? `${fechaSeleccionada?.junio}` : ''
        data.value.julio = fechaSeleccionada?.julio !== 0 ? `${fechaSeleccionada?.julio}` : ''
        data.value.agosto = fechaSeleccionada?.agosto !== 0 ? `${fechaSeleccionada?.agosto}` : ''
        data.value.septiembre = fechaSeleccionada?.septiembre !== 0 ? `${fechaSeleccionada?.septiembre}` : ''
        data.value.octubre = fechaSeleccionada?.octubre !== 0 ? `${fechaSeleccionada?.octubre}` : ''
        data.value.noviembre = fechaSeleccionada?.noviembre !== 0 ? `${fechaSeleccionada?.noviembre}` : ''
        data.value.diciembre = fechaSeleccionada?.diciembre !== 0 ? `${fechaSeleccionada?.diciembre}` : ''
    }

    const maxAccordingToMonth = (month: number) :number=>{
        const date = new Date()
        const maxDate = new Date(date.getFullYear(),month-1,31)
        return maxDate.getDate()<31 ? 31-maxDate.getDate() : maxDate.getDate()
    }

    const validateForm = (): boolean => {
        return (
            !data.value.enero || +data.value.enero > 0 || +data.value.enero < maxAccordingToMonth(1) ||
            !data.value.febrero || +data.value.febrero > 0 || +data.value.febrero < maxAccordingToMonth(2) ||
            !data.value.marzo || +data.value.enero > 0 || +data.value.enero < maxAccordingToMonth(3) ||
            !data.value.abril || +data.value.abril > 0 || +data.value.abril < maxAccordingToMonth(4) ||
            !data.value.mayo || +data.value.mayo > 0 || +data.value.mayo < maxAccordingToMonth(5) ||
            !data.value.junio || +data.value.junio > 0 || +data.value.junio < maxAccordingToMonth(6) ||
            !data.value.julio || +data.value.julio > 0 || +data.value.julio < maxAccordingToMonth(7) ||
            !data.value.agosto || +data.value.agosto > 0 || +data.value.agosto < maxAccordingToMonth(8) ||
            !data.value.septiembre || +data.value.septiembre > 0 || +data.value.septiembre < maxAccordingToMonth(9) ||
            !data.value.octubre || +data.value.octubre > 0 || +data.value.octubre < maxAccordingToMonth(10) ||
            !data.value.noviembre || +data.value.noviembre > 0 || +data.value.noviembre < maxAccordingToMonth(11) ||
            !data.value.diciembre || +data.value.diciembre > 0 || +data.value.diciembre < maxAccordingToMonth(12)
        )
    }

    const submit = () => {
        if(!validateForm()){
            emit('form-error')
            return
        }        
        const preparedData = impuestoController.Prepare({
            enero: +data.value.enero,
            febrero: +data.value.febrero,
            marzo: +data.value.marzo,
            abril: +data.value.abril,
            mayo: +data.value.mayo,
            junio: +data.value.junio,
            julio: +data.value.julio,
            agosto: +data.value.agosto,
            septiembre: +data.value.septiembre,
            octubre: +data.value.octubre,
            noviembre: +data.value.noviembre,
            diciembre: +data.value.diciembre,
            quincena: fechaSeleccionada!.quincena ,
            terminal_rif: fechaSeleccionada!.terminal_rif ,
        })        
        impuestoController.Assign(fechaSeleccionada!.quincena,fechaSeleccionada!.terminal_rif,preparedData)
        .then( res => {
            if(res.rows){
                emit('close')            
                emit('success',true)                  
                return
            } else {
                emit('error',res.error)
            }
        })
    }
</script>