<template>
    <v-container @vnode-before-mount="()=>prepare()">
        <div class="text-center">
            RETENCIONES DE IMPUESTO SOBRE LA RENTA
        </div>
        <v-container v-if="hasConjuntos">
            <v-table>
                <thead>
                    <th>R.I.F</th>
                    <th>ENE</th>
                    <th>FEB</th>
                    <th>MAR</th>
                    <th>ABR</th>
                    <th>MAY</th>
                    <th>JUN</th>
                    <th>JUL</th>
                    <th>AGO</th>
                    <th>SEP</th>
                    <th>OCT</th>
                    <th>NOV</th>
                    <th>DIC</th>
                    <th>Clientes</th>
                    <th>Editar</th>
                </thead>
                <tbody>
                    <tr                
                        v-for="fecha in data"
                    >
                        <td style="padding: 0 5px;">{{ fecha.rif1 }} Y {{ fecha.rif2 }}</td>
                        <td :class="getColorCode(fecha.enero,1)">{{ fecha.enero !== 0 ? fecha.enero : 'N/A' }}</td>
                        <td :class="getColorCode(fecha.febrero,2)">{{ fecha.febrero !== 0 ? fecha.febrero : 'N/A' }}</td>
                        <td :class="getColorCode(fecha.marzo,3)">{{ fecha.marzo !== 0 ? fecha.marzo : 'N/A' }}</td>
                        <td :class="getColorCode(fecha.abril,4)">{{ fecha.abril !== 0 ? fecha.abril : 'N/A' }}</td>
                        <td :class="getColorCode(fecha.mayo,5)">{{ fecha.mayo !== 0 ? fecha.mayo : 'N/A' }}</td>
                        <td :class="getColorCode(fecha.junio,6)">{{ fecha.junio !== 0 ? fecha.junio : 'N/A' }}</td>
                        <td :class="getColorCode(fecha.julio,7)">{{ fecha.julio !== 0 ? fecha.julio : 'N/A' }}</td>
                        <td :class="getColorCode(fecha.agosto,8)">{{ fecha.agosto !== 0 ? fecha.agosto : 'N/A' }}</td>
                        <td :class="getColorCode(fecha.septiembre,9)">{{ fecha.septiembre !== 0 ? fecha.septiembre : 'N/A' }}</td>
                        <td :class="getColorCode(fecha.octubre,10)">{{ fecha.octubre !== 0 ? fecha.octubre : 'N/A' }}</td>
                        <td :class="getColorCode(fecha.noviembre,11)">{{ fecha.noviembre !== 0 ? fecha.noviembre : 'N/A' }}</td>
                        <td :class="getColorCode(fecha.diciembre,12)">{{ fecha.diciembre !== 0 ? fecha.diciembre : 'N/A' }}</td>
                        <td>
                            <v-icon @click.stop="()=>onEmpresaClick({id:fecha.conjuntoId,rif2:fecha.rif2,rif1:fecha.rif1})" style="cursor: pointer;">mdi-eye</v-icon>
                        </td>
                        <td>
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
        <FechaRetencionForm
            :fecha-seleccionada="fechaSeleccionada"
            @close="isDialogFormOpen = false"
            @error="onDBError"
            @form-error="onFormError"
            @success="onFormSuccess"
        ></FechaRetencionForm>
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
                <span class="text-h5">Resetear fechas de declaracion de impuestos de la renta</span>
            </v-card-title>
            <v-card-text>
                Esta seguro de querer resetear las fechas de las declaraciones de impuestos de la renta?
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
import FechaRetencionForm from '../components/FechaRetencionForm.vue';
import { conjuntoRifController } from '../controllers/ConjuntoRif';
import { retencionController } from '../controllers/Retenciones';
import { ConjuntoRif } from '../interfaces/ConjuntoRif';
import { FechaRetenciones } from '../interfaces/Retenciones';

const hasConjuntos = ref(false)
const data: Ref<FechaRetenciones[]> = ref([])
const conjuntos: Ref<ConjuntoRif[]> = ref([])
const fechaSeleccionada: Ref<FechaRetenciones | undefined> = ref()

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
        snackbarText.value = isCreate ? 'Fechas de declaraciones registrada con exito!' : 'Fechas de declaraciones actualizada con exito!'
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
            data.value = retencionController.defSeed(conjuntos)
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
const onAssignClick = (fecha: FechaRetenciones) => {
        fechaSeleccionada.value = fecha
        isDialogFormOpen.value = true
}

const getFechas = () => {
    retencionController.GetAll(conjuntos.value).then(res=>{  
        if(res.length === 0) {return}
            for (let i = 0; i < res.length; i++) {
                const dataIndex = data.value.findIndex(item => item.conjuntoId === res[i].conjuntoId)
                data.value[dataIndex] = res[i];                
            }
        })
}

const resetImpuestos = () => {
    retencionController.Delete().then(res=>{
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