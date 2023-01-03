import MainPage from './pages/MainPage.vue'
import ConfiguracionPage from './pages/ConfiguracionPage.vue'
import EmpresasPage from './pages/EmpresasPage.vue'
import ImpuestosPage from './pages/ImpuestosPage.vue'
import LiquidacionesPage from './pages/LiquidacionesPage.vue'
import PatrimoniosPage from './pages/PatrimoniosPage.vue'
import RetencionesPage from './pages/RetencionesPage.vue'

const routes = [
    {path: '/', component: MainPage},
    {path: '/empresas', component: EmpresasPage},
    {path: '/impuestos', component: ImpuestosPage},
    {path: '/retenciones', component: RetencionesPage},
    {path: '/liquidaciones', component: LiquidacionesPage},
    {path: '/patrimonios', component: PatrimoniosPage},
    {path: '/configuracion', component: ConfiguracionPage},
]

export default routes