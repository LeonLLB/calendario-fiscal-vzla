<template>
    <v-container>
        <div class="text-center ma-2">
            <v-btn color="blue-darken-1" @click.stop="isDialogFormOpen = true">Registrar empresa</v-btn>
        </div>
        <v-table @vnode-before-mount="getEmpresas">
            <thead v-if="empresas.length>0">
                <tr>
                    <th>Nombre</th>
                    <th>RIF</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    @click.stop="()=>onEmpresaClick(empresa)"
                    v-for="empresa in empresas"
                >
                    <td>{{ empresa.nombre }}</td>
                    <td>{{ empresa.rif }}</td>
                    <td>
                        <v-btn @click.stop="()=>triggerDeleteEmpresa(empresa)" color="red-darken-1">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-dialog
            v-model="isDialogFormOpen"
            persistent
            @vnode-unmounted="isDialogFormOpen = false"
        >
            <EmpresaForm
                :empresa-seleccionada="empresaSeleccionada"
                @close="isDialogFormOpen = false"
                @error="onDBError"
                @form-error="onFormError"
                @success="onFormSuccess"
            ></EmpresaForm>
        </v-dialog>
        <v-dialog
            v-model="isDialogDeleteOpen"
            @vnode-unmounted="()=>{isDialogDeleteOpen = false;empresaSeleccionada = undefined}"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5">Eliminar empresa</span>
                </v-card-title>
                <v-card-text>
                    Esta seguro de querer eliminar esta empresa?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" color="red-darken-1" @click.stop="deleteEmpresa">Eliminar</v-btn>
                    <v-btn variant="text" color="blue-darken-1" @click.stop="isDialogDeleteOpen = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-container>
            <v-icon color="rgba(20,20,20,0.25)" icon="mdi-information"></v-icon>
            <span style="margin-left: .5rem; color: rgba(20,20,20,0.65)">Si quiere modificar una empresa, haga click en la empresa a modificar</span> 
        </v-container>
        <v-snackbar
            v-model="isSnackbarOpen"
            @vnode-before-unmount="snackbarText = ''"
        >
            {{ snackbarText }}     
        </v-snackbar>
    </v-container>
</template>

<script setup lang="ts">
    import { Ref, ref } from "vue";
    import { Empresa } from "../interfaces/Empresa";
    import EmpresaForm from "../components/EmpresaForm.vue";
import { empresaController } from "../controllers/Empresa";

    const empresas: Ref<Empresa[]> = ref([])    
    const empresaSeleccionada: Ref<undefined | Empresa> = ref(undefined)

    const isDialogFormOpen = ref(false)
    const isDialogDeleteOpen = ref(false)
    
    const snackbarText = ref('')
    const isSnackbarOpen = ref(false)

    const getEmpresas = () => {
        empresaController.GetAll().then(res=>{  
            empresas.value = res
        })
    }

    const triggerDeleteEmpresa = (empresa: Empresa) => {
        isDialogDeleteOpen.value = true
        empresaSeleccionada.value = empresa
    }

    const deleteEmpresa = () => {
        isDialogDeleteOpen.value = false
        empresaController.Delete(empresaSeleccionada.value?.id!).then(res=>{        
            snackbarText.value = res.error ? `${res.error}` : 'Empresa eliminada con exito'
            if(!res.error) getEmpresas()
            isSnackbarOpen.value = true
        })
    }

    const onEmpresaClick = (empresa: Empresa) => {
        empresaSeleccionada.value = empresa
        isDialogFormOpen.value = true
    }
    
    const onFormError = () => {
        snackbarText.value = 'Empresa no valida'
        isSnackbarOpen.value = true
    }

    const onFormSuccess = (isCreate: boolean) => {
        snackbarText.value = isCreate ? 'Empresa registrada con exito!' : 'Empresa actualizada con exito!'
        isSnackbarOpen.value = true
        getEmpresas()
    }

    const onDBError = (error: any) => {
        snackbarText.value = `${error}`
        isSnackbarOpen.value = true
    }
</script>