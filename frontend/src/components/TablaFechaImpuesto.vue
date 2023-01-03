<template>
    <div class="text-center">
        {{data[0].quincena === 1 ? 'Entre los días 01 al 15 de cada mes, ambos inclusive:' : 'Entre los días 16 y el último de cada mes, ambos inclusive:'}}
    </div>    
    <v-table @vnode-before-mount="prepare">
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
        </thead>
        <tbody>
            <tr
                @click.stop="()=>onRowClick(fecha)"
                v-for="fecha in data"
            >
                <td>{{ fecha.terminal_rif }}</td>
                <td>{{ fecha.enero !== 0 ? fecha.enero : 'N/A' }}</td>
                <td>{{ fecha.febrero !== 0 ? fecha.febrero : 'N/A' }}</td>
                <td>{{ fecha.marzo !== 0 ? fecha.marzo : 'N/A' }}</td>
                <td>{{ fecha.abril !== 0 ? fecha.abril : 'N/A' }}</td>
                <td>{{ fecha.mayo !== 0 ? fecha.mayo : 'N/A' }}</td>
                <td>{{ fecha.junio !== 0 ? fecha.junio : 'N/A' }}</td>
                <td>{{ fecha.julio !== 0 ? fecha.julio : 'N/A' }}</td>
                <td>{{ fecha.agosto !== 0 ? fecha.agosto : 'N/A' }}</td>
                <td>{{ fecha.septiembre !== 0 ? fecha.septiembre : 'N/A' }}</td>
                <td>{{ fecha.octubre !== 0 ? fecha.octubre : 'N/A' }}</td>
                <td>{{ fecha.noviembre !== 0 ? fecha.noviembre : 'N/A' }}</td>
                <td>{{ fecha.diciembre !== 0 ? fecha.diciembre : 'N/A' }}</td>
            </tr>
        </tbody>
    </v-table>
    <v-dialog
        v-model="isDialogFormOpen"
        @vnode-unmounted="isDialogFormOpen = false"
    >
        <FechaImpuestoForm
            :fecha-seleccionada="fechaSeleccionada"
            @close="isDialogFormOpen = false"
            @error="onDBError"
            @form-error="onFormError"
            @success="onFormSuccess"
        ></FechaImpuestoForm>
    </v-dialog>
    <v-container>
        <v-icon color="rgba(20,20,20,0.25)" icon="mdi-information"></v-icon>
        <span style="margin-left: .5rem; color: rgba(20,20,20,0.65)">Si quiere modificar o asignar una fecha para declaracion, haga click en la fila que desea asignar o modificar    </span> 
    </v-container>
</template>

<script lang="ts" setup>
    import {Ref, ref} from 'vue'
import { impuestoController } from '../controllers/Impuestos';
    import { FechaImpuestos } from '../interfaces/Impuestos';
import FechaImpuestoForm from './FechaImpuestoForm.vue';

    const data: Ref<FechaImpuestos[]> = ref([...impuestoController.defSeed()])
    const fechaSeleccionada: Ref<FechaImpuestos | undefined> = ref()

    const isDialogFormOpen = ref(false)

    const props = defineProps({
        quincena:Number
    })

    const onRowClick = (fecha: FechaImpuestos) => {
        fechaSeleccionada.value = fecha
        isDialogFormOpen.value = true
    }
    
    const onFormError = () => {
        snackbarText.value = 'Fechas no valida'
        isSnackbarOpen.value = true
    }

    const onFormSuccess = (isCreate: boolean) => {
        snackbarText.value = isCreate ? 'Fechas de declaraciones registrada con exito!' : 'Fechas de declaraciones actualizada con exito!'
        isSnackbarOpen.value = true
        // getEmpresas()
    }

    const snackbarText = ref('')
    const isSnackbarOpen = ref(false)

    const onDBError = (error: any) => {
        snackbarText.value = `${error}`
        isSnackbarOpen.value = true
    }

    const prepare = () => {
        data.value = data.value.map(item=>({...item,quincena:props.quincena!} as FechaImpuestos))
    }

</script>