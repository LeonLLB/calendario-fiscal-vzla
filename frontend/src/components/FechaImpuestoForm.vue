<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Asignar fecha de declaraciones de la {{fechaSeleccionada!.quincena}}{{ fechaSeleccionada!.quincena === 1 ? 'era' : 'da' }} de los RIF terminales en {{ fechaSeleccionada!.terminal_rif }}</span>
        </v-card-title>
        <v-card-text @vnode-before-mount="seedForm">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field v-model="data.enero" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(1)" label="Enero" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="data.febrero" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(2)" label="Febrero" required></v-text-field>
                    </v-col>                    
                    <v-col>
                        <v-text-field v-model="data.marzo" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(3)" label="Marzo" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="data.abril" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(4)" label="Abril" required></v-text-field>
                    </v-col>                    
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field v-model="data.mayo" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(5)" label="Mayo" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="data.junio" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(6)" label="Junio" required></v-text-field>
                    </v-col>                    
                    <v-col>
                        <v-text-field v-model="data.julio" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(7)" label="Julio" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="data.agosto" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(8)" label="Agosto" required></v-text-field>
                    </v-col>                    
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field v-model="data.septiembre" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(9)" label="Septiembre" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="data.octubre" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(10)" label="Octubre" required></v-text-field>
                    </v-col>                    
                    <v-col>
                        <v-text-field v-model="data.noviembre" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(11)" label="Noviembre" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="data.diciembre" :rules="inputRules" min="1" type="number" :max="maxAccordingToMonth(12)" label="Diciembre" required></v-text-field>
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
                Asignar
            </v-btn>
        </v-card-actions>        
    </v-card>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
import { impuestoController } from '../controllers/Impuestos';
import { FechaImpuestosClass } from '../interfaces/Impuestos';

    const emit = defineEmits(['close','success','error','form-error'])

    const data = ref({
        enero:'',
        febrero:'',
        marzo:'',
        abril:'',
        mayo:'',
        junio:'',
        julio:'',
        agosto:'',
        septiembre:'',
        octubre:'',
        noviembre:'',
        diciembre:'',
    })

    const {fechaSeleccionada} = defineProps({
        fechaSeleccionada: FechaImpuestosClass,
    })

    const seedForm = () => {
        // data.value.nombre = fechaSeleccionada?.nombre ? `${fechaSeleccionada?.nombre}` : ''
        // data.value.rif = fechaSeleccionada?.rif ? `${fechaSeleccionada?.rif}` : ''
    }

    const inputRules = [
        (v:string) => !!v || 'Este valor es requerido',
        (v:string) => !isNaN(parseInt(v)) || 'Este valor debe ser numerico',
        (v:string) => (parseInt(v)) >= 1 || 'Este valor debe ser mayor de uno',
    ] 

    const maxAccordingToMonth = (month: number) :number=>{
        const date = new Date()
        const maxDate = new Date(date.getFullYear(),month-1,31)
        return maxDate.getDate()<31 ? 31-maxDate.getDate() : maxDate.getDate()
    }

    const submit = () => {
        // if(
        //     !data.value.nombre ||
        //     !data.value.rif
        // ){
        //     emit('form-error')
        //     return
        // }        
        // empresaController.Create(data.value)
        // .then( res => {
        //     if(res.id){
        //         emit('close')            
        //         emit('success',true)                  
        //         return
        //     } else {
        //         emit('error',res.error)
        //     }
        // })
    }
</script>