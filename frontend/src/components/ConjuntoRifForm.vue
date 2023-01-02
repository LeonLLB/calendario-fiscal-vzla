<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Conjunto de terminal de RIF</span>
        </v-card-title>
        <v-card-text @vnode-before-mount="seedForm">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field v-model="data.rif1" :rules="inputRules" type="number"  label="Primer terminal" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="data.rif2" :rules="inputRules" type="number" label="Segundo terminal" required></v-text-field>
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
                {{conjuntoSeleccionado ? 'Actualizar' : 'Guardar'}}
            </v-btn>
        </v-card-actions>        
    </v-card>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
import { conjuntoRifController } from '../controllers/ConjuntoRif';
import { ConjuntoRifClass } from '../interfaces/ConjuntoRif';

    const emit = defineEmits(['close','success','error','form-error'])

    const data = ref({
        rif1: '',
        rif2: '',
    })

    const {conjuntoSeleccionado} = defineProps({
        conjuntoSeleccionado: ConjuntoRifClass
    })

    const seedForm = () => {
        data.value.rif1 = conjuntoSeleccionado?.rif1 ? `${conjuntoSeleccionado?.rif1}` : ''
        data.value.rif2 = conjuntoSeleccionado?.rif2 ? `${conjuntoSeleccionado?.rif2}` : ''
    }

    const inputRules = [
        (v:string) => !!v || 'Este valor es requerido',
        (v:string) => v.length === 1 || 'Solo es necesario un caracter',
    ] 

    const submit = () => {
        if(
            !data.value.rif1 || data.value.rif1.length !== 1 ||
            !data.value.rif2 || data.value.rif2.length !== 1  ||
            data.value.rif1 === data.value.rif2         
        ){
            emit('form-error')
            return
        }
        if(conjuntoSeleccionado){
            updateAction()
            return
        }
        createAction()
    }

    const createAction = () => {
        conjuntoRifController.Create({
            rif1: +data.value.rif1,
            rif2: +data.value.rif2,
        })
        .then( res => {
            if(res.id){
                emit('close')            
                emit('success',true)                  
                return
            } else {
                emit('error',res.error)
            }
        })
    }

    const updateAction = () => {
        conjuntoRifController.Update(conjuntoSeleccionado!.id!,{
            rif1: +data.value.rif1,
            rif2: +data.value.rif2,
        })
        .then( res => {
            if(res.id){
                emit('close')            
                emit('success',false)                  
                return
            } else {
                emit('error',res.error)
            }
        })
    }
</script>