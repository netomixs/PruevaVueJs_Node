import { createRouter, createWebHistory } from "vue-router";

import App from "@/App.vue";
import DatosView from "@/views/DatosView.vue";
import FormularioView from "@/views/FormularioView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Datos",
      component: DatosView,
    },
    {
      path: "/form/:id/:view",
      name: "Vista de datos",
      component: FormularioView,
    },
    {
      path: "/form",
      name: "Nuevo cliente",
      component: FormularioView,
    },
  ],
});

export default router;
