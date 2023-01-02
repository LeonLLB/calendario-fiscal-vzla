<template>
    <v-container>
        <v-table @vnode-before-mount="getConjuntos">
            <thead>
                <tr>
                    <th>Primer Terminal</th>
                    <th>Segunda Terminal</th>
                    <!-- <th></th> -->
                </tr>
            </thead>
            <tbody>
                <tr
                    @click.stop="()=>onItemClick(item)"
                    v-for="item in data"
                >
                    <td>{{ item.rif1 === -1 ? 'VACÍO' : item.rif1 }}</td>
                    <td>{{ item.rif2 === -1 ? 'VACÍO' : item.rif2 }}</td>
                </tr>
            </tbody>
        </v-table>
        <v-container>
            <v-icon color="rgba(20,20,20,0.25)" icon="mdi-information"></v-icon>
            <span style="margin-left: .5rem; color: rgba(20,20,20,0.65)">Si quiere modificar o asignar un conjunto de rif, haga click en la fila del conjunto que desea asignar o modificar    </span> 
        </v-container>
        <div class="text-center ma-2">
            <v-btn color="red-darken-2" @click.stop="isResetDialogOpen = true">Resetear conjuntos</v-btn>
        </div>
        <v-dialog
            v-model="isDialogOpen"
            persistent
            @vnode-unmounted="isDialogOpen = false"
        >
            <ConjuntoRifForm :conjunto-seleccionado="conjuntoSeleccionado" @close="isDialogOpen = false" @error="onDBError" @form-error="onFormError" @success="onFormSuccess" ></ConjuntoRifForm>
        </v-dialog>
        <v-dialog
            v-model="isResetDialogOpen"
            @vnode-unmounted="isResetDialogOpen = false"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5">Resetear terminales de RIFS</span>
                </v-card-title>
                <v-card-text>
                    Esta seguro de querer resetear los terminales de RIF? Esto eliminará cualquier calendario relacionado con el
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" color="red-darken-1" @click.stop="resetConjuntos">Eliminar</v-btn>
                    <v-btn variant="text" color="blue-darken-1" @click.stop="isResetDialogOpen = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
    <v-snackbar
      v-model="isSnackbarOpen"
      @vnode-before-unmount="snackbarText = ''"
    >
      {{ snackbarText }}     
    </v-snackbar>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { ConjuntoRif } from '../interfaces/ConjuntoRif';
import ConjuntoRifForm from '../components/ConjuntoRifForm.vue';
import { conjuntoRifController } from '../controllers/ConjuntoRif';
    
    const isDialogOpen = ref(false)
    const isResetDialogOpen = ref(false)
    const conjuntoSeleccionado: Ref<undefined | ConjuntoRif> = ref(undefined)

    const defData = [
        {rif1:-1,rif2:-1},
        {rif1:-1,rif2:-1},
        {rif1:-1,rif2:-1},
        {rif1:-1,rif2:-1},
        {rif1:-1,rif2:-1}
    ]
    
    const snackbarText = ref('')
    const isSnackbarOpen = ref(false)

    const data: Ref<ConjuntoRif[]> = ref([
        ...defData
    ])

    const onItemClick = (item: ConjuntoRif) => {
        conjuntoSeleccionado.value = (item.rif1 === -1 && item.rif2 === -1) ? undefined : item
        isDialogOpen.value = true
    }

    const onFormError = () => {
        snackbarText.value = 'Conjunto de Rif no valido'
        isSnackbarOpen.value = true
    }

    const onFormSuccess = (isCreate: boolean) => {
        snackbarText.value = isCreate ? 'Conjunto de Rif creado con exito!' : 'Conjunto de Rif actualizado con exito!'
        isSnackbarOpen.value = true
        getConjuntos()
    }

    const onDBError = (error: any) => {
        snackbarText.value = `${error}`
        isSnackbarOpen.value = true
    } 

    const getConjuntos = () => {
        data.value = [...defData]
        conjuntoRifController.GetAll().then(res=>{  
            if(res.length === 0) {return}
            for (let i = 0; i < res.length; i++) {
                data.value[i] = res[i];                
            }
        })
    }

    const resetConjuntos = () => {
        isResetDialogOpen.value = false
        conjuntoRifController.Reset().then(res=>{
            snackbarText.value = res.error ? `${res.error}` : 'Conjuntos y base de datos reseatada con exito'
            if(!res.error) data.value = [...defData]
            isSnackbarOpen.value = true
        })
    }

</script>