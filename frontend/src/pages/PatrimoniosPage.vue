<template>
    <v-container @vnode-before-mount="()=>prepare()">
        <div class="text-center">
            GRANDES PATRIMONIOS
        </div>
        <v-container v-if="hasConjuntos">
            <v-table>
                <thead>
                    <th>R.I.F</th>
                    <th>OCT</th>
                    <th>NOV</th>
                    <th>Clientes</th>
                    <th>Editar</th>
                </thead>
                <tbody>
                    <tr                
                        v-for="fecha in data"
                    >
                        <td style="text-align: center;">{{ fecha.rif1 }} Y {{ fecha.rif2 }}</td>
                        <td style="text-align: center;" :class="getColorCode(fecha.octubre,10)">{{ fecha.octubre }}</td>
                        <td style="text-align: center;" :class="getColorCode(fecha.noviembre,11)">{{ fecha.noviembre }}</td>
                        <td style="text-align: center;">
                            <v-icon @click.stop="()=>onEmpresaClick({id:fecha.conjuntoId,rif2:fecha.rif2,rif1:fecha.rif1})" style="cursor: pointer;">mdi-eye</v-icon>
                        </td>
                        <td style="text-align: center;">
                            <v-icon @click.stop="()=>onAssignClick(fecha)" style="cursor: pointer;">mdi-pencil</v-icon>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>
        <v-container v-if="!hasConjuntos">
            <div>No parecen existir suficientes conjuntos de RIFS, dirijase a configuracion y llenelos</div>
        </v-container>
    </v-container>  
    <v-dialog
        v-model="isDialogFormOpen"
        @vnode-unmounted="isDialogFormOpen = false"
    >
        <PatrimonioForm
            :fecha-seleccionada="fechaSeleccionada"
            :conjunto-rif="conjuntoRifSeleccionado"
            @close="isDialogFormOpen = false"
            @error="onDBError"
            @form-error="onFormError"
            @success="onFormSuccess"
        ></PatrimonioForm>
    </v-dialog>
    <v-dialog
        v-model="isDialogEmpresaOpen"
        @vnode-unmounted="isDialogEmpresaOpen = false"
    >
        <EmpresasDialog
            :conjunto-rif="conjuntoRifSeleccionado"
        ></EmpresasDialog>
    </v-dialog>
    <v-dialog
        v-model="isDialogResetOpen"
        @vnode-unmounted="isDialogResetOpen = false"
    >
        <v-card>
            <v-card-title>
                <span class="text-h5">Resetear fechas de declaracion de los grandes patrimonios</span>
            </v-card-title>
            <v-card-text>
                Esta seguro de querer resetear las fechas de las declaraciones de los grandes patrimonios?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="text" color="red-darken-1" @click.stop="resetImpuestos">Eliminar</v-btn>
                <v-btn variant="text" color="blue-darken-1" @click.stop="isDialogResetOpen = false">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar
      v-model="isSnackbarOpen"
      @vnode-before-unmount="snackbarText = ''"
    >
      {{ snackbarText }}     
    </v-snackbar>
    <div class="text-center ma-2">
        <v-btn color="red-darken-2" @click.stop="isDialogResetOpen = true">Resetear fechas de declaraciones</v-btn>
    </div>
    <div style="position: absolute; right:2rem; bottom:5rem">
        <div>
            <v-icon color="rgb(20,245,20)" icon="mdi-information"></v-icon>
            <span style="margin-left: .5rem; color: rgb(20,245,20)">Declará en 3 días</span> 
        </div>
        <div>
            <v-icon color="rgb(200,175,50)" icon="mdi-information"></v-icon>
            <span style="margin-left: .5rem; color: rgb(200,175,50)">Declará mañana</span> 
        </div>
        <div>
            <v-icon color="rgb(245,20,20)" icon="mdi-information"></v-icon>
            <span style="margin-left: .5rem; color: rgb(245,20,20)">Declará hoy</span> 
        </div>
    </div>  
</template>

<script lang="ts" setup>
import {ref, Ref} from 'vue'
import EmpresasDialog from '../components/EmpresasDialog.vue';
import PatrimonioForm from '../components/PatrimonioForm.vue';
import { conjuntoRifController } from '../controllers/ConjuntoRif';
import { patrimonioController } from '../controllers/Patrimonios';
import { ConjuntoRif } from '../interfaces/ConjuntoRif';
import { FechaPatrimonio } from '../interfaces/Patrimonios';

const hasConjuntos = ref(false)
const data: Ref<FechaPatrimonio[]> = ref([])
const conjuntos: Ref<ConjuntoRif[]> = ref([])
const fechaSeleccionada: Ref<FechaPatrimonio|undefined>  = ref()

    const isDialogFormOpen = ref(false)
    const isDialogEmpresaOpen = ref(false)
    const conjuntoRifSeleccionado: Ref<undefined | ConjuntoRif> = ref()
    const isDialogResetOpen = ref(false)
    const snackbarText = ref('')
    const isSnackbarOpen = ref(false)

    const onFormError = () => {
        snackbarText.value = 'Fechas no valida'
        isSnackbarOpen.value = true
    }

    const onFormSuccess = (isCreate: boolean) => {
        snackbarText.value = isCreate ? 'Fecha de liquidacion registrada con exito!' : 'Fecha de liquidacion actualizada con exito!'
        isSnackbarOpen.value = true
        getFechas()
    }


    const onDBError = (error: any) => {
        snackbarText.value = `${error}`
        isSnackbarOpen.value = true
    }

const prepare = () =>{
    conjuntoRifController.GetAll()
    .then(res=>{
        if(res.length === 5){ 
            conjuntos.value = res           
            return res
        }
    })
    .then(conjuntos=>{
        if(conjuntos){
            data.value = patrimonioController.defSeed(conjuntos)
            getFechas()
            hasConjuntos.value = true
        }
    })
}

const getColorCode = (dia:number,mes:number): (string | undefined) => {
    if(dia === 0) return
    const actualDate = new Date()
    const dateToCompare = new Date(actualDate.getFullYear(),mes-1,dia)
    const timeDifference = (dateToCompare.getTime() / 1000 / 60 / 60 / 24) - (actualDate.getTime() / 1000 / 60 / 60 / 24) 
    //CASO 1: SI LA FECHA ESTA ENTRE 3 DIAS CON LA PASADA
    if (timeDifference <= 3 && timeDifference >= 1) return 'bg-green-darken-1'
    // CASO 2: SI LA FECHA ESTA ENTRE 1 DIA CON LA PASADA
    if(timeDifference < 1 && timeDifference > 0) return 'bg-yellow-darken-1'
    // CASO 3: SI LA FECHA ES HOY
    if(actualDate.getDate() === dateToCompare.getDate() && actualDate.getMonth() === dateToCompare.getMonth()) return 'bg-red-darken-1'
}

const onEmpresaClick = (conjuntoRif: ConjuntoRif) => {
    conjuntoRifSeleccionado.value = conjuntoRif
    isDialogEmpresaOpen.value = true
}
const onAssignClick = (fecha: FechaPatrimonio) => {
        fechaSeleccionada.value = fecha
        conjuntoRifSeleccionado.value = {id: fecha.conjuntoId,rif1:fecha.rif1,rif2:fecha.rif2}
        isDialogFormOpen.value = true
}

const getFechas = () => {
    patrimonioController.GetAll(conjuntos.value).then(res=>{  
        if(res.length === 0) {return}
            for (let i = 0; i < res.length; i++) {
                const dataIndex = data.value.findIndex(item => item.conjuntoId === res[i].conjuntoId)
                data.value[dataIndex] = res[i];                
            }
        })
}

const resetImpuestos = () => {
    patrimonioController.Delete().then(res=>{
        if(res.ok){
            prepare()
            snackbarText.value = "Fechas de declaraciones eliminadas!"
            isSnackbarOpen.value = true
            isDialogResetOpen.value = false
        } else {
            snackbarText.value = "Hubo un error y no se pudieron eliminar las fechas de las declaraciones"
            isSnackbarOpen.value = true
        }
    })
}

</script>