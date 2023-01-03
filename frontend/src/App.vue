<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  const drawer = ref(false)
  const router = useRouter()

  const items  = [
    {title:'Principal',value:'/'},
    {title:'Empresas',value:'/empresas'},
    {title:'Impuestos',value:'/impuestos'},
    {title:'Retenciones del ISLR',value:'/retenciones'},
    {title:'Autoliquidación anual',value:'/liquidaciones'},
    {title:'Grandes Patrimonios',value:'/patrimonios'},
    {title:'Configuración',value:'/configuracion'},
  ]

  const onItemClick = (item: any) => {
    router.push(item.id)
    drawer.value = false
  }

</script>

<style>
.v-list-item--nav .v-list-item-title{
  font-size: 1rem !important;
}

</style>

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
        nav
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

