import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Factura from '../views/Factura.vue'
import Medicamento from '../views/Medicamento.vue'
import Promocion from '../views/Promocion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/factura',
    name: 'Factura',
    component: Factura
  },
  {
    path: '/medicamento',
    name: 'Medicamento',
    component: Medicamento
  },
  {
    path: '/promocion',
    name: 'Promocion',
    component: Promocion
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
