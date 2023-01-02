<template>
    <v-container>
        <v-table @vnode-before-mount="getConjuntos">
            <thead>
                <tr>
                    <th>Primer Culminante</th>
                    <th>Segunda Culminante</th>
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
        <v-dialog
            v-model="isDialogOpen"
            persistent
            @vnode-unmounted="isDialogOpen = false"
        >
            <ConjuntoRifForm :conjunto-seleccionado="conjuntoSeleccionado" @close="isDialogOpen = false" @error="onDBError" @form-error="onFormError" @success="onFormSuccess" ></ConjuntoRifForm>
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

</script>