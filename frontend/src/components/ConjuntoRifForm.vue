<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Conjunto de culminales de RIF</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field v-model="data.rif1" :rules="inputRules" type="number"  label="Primer culminal" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="data.rif2" :rules="inputRules" type="number" label="Segundo culminal" required></v-text-field>
                    </v-col>                    
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <!-- TODO: ACCIONES -->
            <v-btn color="blue-darken-1" variant="text">
                Close
            </v-btn>
            <v-btn @click.stop="submit" color="blue-darken-1" variant="text">
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';

    const data = ref({
        rif1: '',
        rif2: '',
    })

    const inputRules = [
        (v:string) => !!v || 'Este valor es requerido',
        (v:string) => v.length === 1 || 'Solo es necesario un caracter',
    ] 

    const submit = () => {
        console.log(data.value)
    }
</script>