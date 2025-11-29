import ScanTab from "../components/ScanTab.vue";
import OrderTab from "../components/OrderTab.vue";
import TabLayout from "../components/TabLayout.vue";
import ProfileTab from "../components/ProfileTab.vue";

import { createRouter, createWebHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: TabLayout,
    children: [
      {
        path: "",
        redirect: { name: "orders" }, // when path is exactly '/', go to orders
      },
      {
        path: "orders",
        name: "orders",
        component: OrderTab,
      },
      {
        path: "scan",
        name: "scan",
        component: ScanTab,
      },
      {
        path: "profile",
        name: "profile",
        component: ProfileTab,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
