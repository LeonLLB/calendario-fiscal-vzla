<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Asignar fecha de liquidaciones del año anterior</span>
        </v-card-title>
        <v-card-text @vnode-before-mount="seedForm">
            <v-container>                
                <v-text-field v-model="fecha" :rules="inputRules" type="date" label="Fecha" required></v-text-field>                
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
    import { liquidacionController } from '../controllers/Liquidacion';
import { ConjuntoRifClass } from '../interfaces/ConjuntoRif';

    const emit = defineEmits(['close','success','error','form-error'])

    const fecha = ref('')

    const {fechaSeleccionada,conjuntoRif} = defineProps({
        fechaSeleccionada: String,
        conjuntoRif: ConjuntoRifClass
    })

    const seedForm = () => {
        fecha.value = fechaSeleccionada ? `${fechaSeleccionada}` : ''
    }

    const validateForm = (): boolean => {
        return (
            !!fecha.value      
        )
    }

    const inputRules = [
        (v:string) => !!v || 'Este valor es requerido',
    ] 

    const submit = () => {
        if(!validateForm()){
            emit('form-error')
            return
        }
        const preparedData = liquidacionController.Prepare({
            fecha:fecha.value,
            rif1: conjuntoRif!.rif1 ,
            rif2: conjuntoRif!.rif2 ,
            conjuntoId: conjuntoRif!.id! ,
        })        
        liquidacionController.Assign(conjuntoRif!.id!,preparedData)
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