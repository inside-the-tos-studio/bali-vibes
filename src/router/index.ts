import { createRouter, createWebHistory } from "vue-router";
import Experiences from "@pages/ExperiencesView.vue";
import Welcome from "@pages/WelcomeView.vue";
import DetailsView from "@/views/DetailsView.vue";
import { useDataInjection } from "@/composables/useDataInjection";
import NotFound from "@pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Welcome,
    },
    {
      path: "/discover",
      name: "experiences",
      component: Experiences,
    },
    {
      path: "/experience/:id",
      name: "details",
      component: DetailsView,
      beforeEnter: async (to, from, next) => {
        const item = await useDataInjection().getDetailsById(Number(to.params.id));
        if (item) {
          next();
        } else {
          next({ name: "NotFound" });
        }
      },
    },
    {
      path: "/not-found",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
