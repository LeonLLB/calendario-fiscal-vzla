<script lang="ts" setup>
  import { ref } from 'vue';
  const drawer = ref(false)

  const items  = [
    {title:'Principal',value:'/'},
    {title:'Empresas',value:'/'},
    {title:'Impuestos',value:'/'},
    {title:'Retencios del ISLR',value:'/'},
    {title:'Autoliquidación anual',value:'/'},
    {title:'Grandes Patrimonios',value:'/'},
    {title:'Configuración',value:'/'},
  ]

  const onItemClick = (item: any) => console.log(item)
</script>

<template>
  <v-app>
    <v-app-bar prominent color="#8E1F4C">
      <v-app-bar-nav-icon
        
        variant="text"
        @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title>Calendario Fiscal: Venezuela</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list
        @click:select="onItemClick"
        :items="items"
      >

      </v-list>
    </v-navigation-drawer>
    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

