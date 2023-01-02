<template>
    <v-container>
        <v-table >
            <thead>
                <tr>
                    <th>Primer Culminante</th>
                    <th>Segunda Culminante</th>
                    <!-- <th></th> -->
                </tr>
            </thead>
            <tbody>
                <tr
                    @click.stop="()=>onItemClick(item.id)"
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
        <!-- persistent -->
        <v-dialog
            v-model="isDialogOpen"
            @vnode-unmounted="isDialogOpen = false"
        >
            <ConjuntoRifForm></ConjuntoRifForm>
        </v-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { ConjuntoRif } from '../interfaces/ConjuntoRif';
import ConjuntoRifForm from '../components/ConjuntoRifForm.vue';
    
    const isDialogOpen = ref(false)
    const conjuntoId: Ref<null | number> = ref(null)

    const data: Ref<ConjuntoRif[]> = ref([
        {rif1:-1,rif2:-1},
        {rif1:-1,rif2:-1},
        {rif1:-1,rif2:-1},
        {rif1:-1,rif2:-1},
        {rif1:-1,rif2:-1},
    ])

    const onItemClick = (itemId: number | undefined = undefined) => {
        isDialogOpen.value = true
        conjuntoId.value = !itemId ? null : itemId
    }

</script>