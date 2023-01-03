<template>
    <v-card @vnode-before-mount="getEmpresas">
        <v-card-title v-if="terminalRif && !conjuntoRif">
            <span class="text-h5">  Empresas con RIF con terminal {{ terminalRif }}</span>
        </v-card-title>
        <v-card-title v-if="!terminalRif && conjuntoRif">
            <span class="text-h5">  Empresas con RIF con terminal en {{ conjuntoRif.rif1 }} y {{ conjuntoRif.rif2 }}</span>
        </v-card-title>
        <v-card-text v-if="terminalRif && !conjuntoRif && data.length===0">No tiene empresas con un RIF que termina en {{ terminalRif }}</v-card-text>
        <v-card-text v-if="!terminalRif && conjuntoRif && data.length===0">No tiene empresas con un RIF que termina en {{ conjuntoRif.rif1 }} o {{ conjuntoRif.rif2 }}</v-card-text>
        <v-table v-if="data.length>0">
            <thead >
                <tr>
                    <th>Nombre</th>
                    <th>RIF</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="empresa in data"
                >
                    <td>{{ empresa.nombre }}</td>
                    <td>{{ empresa.rif }}</td>
                </tr>
            </tbody>
        </v-table>        
    </v-card>
</template>

<script lang="ts" setup>
    import {ref,Ref} from 'vue'
import { empresaController } from '../controllers/Empresa';
import { ConjuntoRifClass } from '../interfaces/ConjuntoRif';
    import { Empresa } from '../interfaces/Empresa';

    const data: Ref<Empresa[]> = ref([])

    const {terminalRif,conjuntoRif} = defineProps({
        terminalRif: String,
        conjuntoRif: ConjuntoRifClass
    })

    const getEmpresas = () => {
        if(terminalRif && !conjuntoRif){
            empresaController.GetAllByTerminal(terminalRif!)
            .then(res=>{
                data.value = res
            })            
        } else if (!terminalRif && conjuntoRif){
            empresaController.GetAllByConjunto(conjuntoRif)
            .then(res=>{
                console.log(res)
                data.value = res
            })
        }
    }

</script>