<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">{{empresaSeleccionada ? 'Actualizar ' :'Registrar '}} empresa</span>
        </v-card-title>
        <v-card-text @vnode-before-mount="seedForm">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field v-model="data.nombre" :rules="inputRules" label="Nombre" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="data.rif" :rules="inputRules" placeholder="J-XXXYYYYZZZ" label="RIF" required></v-text-field>
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
                {{empresaSeleccionada ? 'Actualizar' : 'Guardar'}}
            </v-btn>
        </v-card-actions>        
    </v-card>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
import { empresaController } from '../controllers/Empresa';
import { EmpresaClass } from '../interfaces/Empresa';

    const emit = defineEmits(['close','success','error','form-error'])

    const data = ref({
        nombre: '',
        rif: '',
    })

    const {empresaSeleccionada} = defineProps({
        empresaSeleccionada: EmpresaClass
    })

    const seedForm = () => {
        data.value.nombre = empresaSeleccionada?.nombre ? `${empresaSeleccionada?.nombre}` : ''
        data.value.rif = empresaSeleccionada?.rif ? `${empresaSeleccionada?.rif}` : ''
    }

    const inputRules = [
        (v:string) => !!v || 'Este valor es requerido',
    ] 

    const submit = () => {
        if(
            !data.value.nombre ||
            !data.value.rif
        ){
            emit('form-error')
            return
        }
        if(empresaSeleccionada){
            updateAction()
            return
        }
        createAction()
    }

    const createAction = () => {
        empresaController.Create(data.value)
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
        empresaController.Update(empresaSeleccionada!.id!,data.value)
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