<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Asignar fecha de declaracion de los grandes patrimonios para los RIFS terminales en {{ conjuntoRif!.rif1 }} y {{ conjuntoRif!.rif2 }}</span>
        </v-card-title>
        <v-card-text @vnode-before-mount="seedForm">
            <v-container>         
                <v-row>
                    <v-col>
                        <v-text-field v-model="data.octubre" :rules="inputRules" min="1" :max="maxAccordingToMonth(10)" type="number"  label="Octubre" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="data.noviembre" :rules="inputRules" min="1" :max="maxAccordingToMonth(11)" type="number" label="Noviembre" required></v-text-field>
                    </v-col>                    
                </v-row>                                  
            </v-container>
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
    import { patrimonioController } from '../controllers/Patrimonios';
    import { ConjuntoRifClass } from '../interfaces/ConjuntoRif';
import { FechaPatrimonioClass } from '../interfaces/Patrimonios';

    const emit = defineEmits(['close','success','error','form-error'])

    const data = ref({
        octubre: '',
        noviembre: '',
    })

    const {fechaSeleccionada,conjuntoRif} = defineProps({
        fechaSeleccionada: FechaPatrimonioClass,
        conjuntoRif: ConjuntoRifClass
    })

    const seedForm = () => {      
        data.value.octubre = fechaSeleccionada?.octubre !==  0 ? `${fechaSeleccionada?.octubre}` : ''
        data.value.noviembre = fechaSeleccionada?.noviembre !==  0 ? `${fechaSeleccionada?.noviembre}` : ''
    }

    const validateForm = (): boolean => {
        return (
            !data.value.octubre || +data.value.octubre > 0 || +data.value.octubre < maxAccordingToMonth(10) ||
            !data.value.noviembre || +data.value.noviembre > 0 || +data.value.noviembre < maxAccordingToMonth(11)      
        )
    }

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

    const submit = () => {
        if(!validateForm()){
            emit('form-error')
            return
        }
        const preparedData = patrimonioController.Prepare({
            octubre:+data.value.octubre,
            noviembre:+data.value.noviembre,
            rif1: conjuntoRif!.rif1 ,
            rif2: conjuntoRif!.rif2 ,
            conjuntoId: conjuntoRif!.id! ,
        })        
        patrimonioController.Assign(conjuntoRif!.id!,preparedData)
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