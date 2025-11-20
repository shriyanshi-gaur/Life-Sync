import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';
import JournalView from '../views/JournalView.vue';
import ResourcesView from '../views/ResourcesView.vue';
import LoginView from '../views/LoginView.vue';
import HabitsView from '../views/HabitsView.vue'; // <--- Import HabitsView

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { 
      path: '/', 
      name: 'dashboard', 
      component: DashboardView, 
      meta: { requiresAuth: true } 
    },
    { 
      path: '/analytics', 
      name: 'analytics', 
      component: AnalyticsView, 
      meta: { requiresAuth: true } 
    },
    { 
      path: '/journal', 
      name: 'journal', 
      component: JournalView, 
      meta: { requiresAuth: true } 
    },
    { 
      path: '/resources', 
      name: 'resources', 
      component: ResourcesView, 
      meta: { requiresAuth: true } 
    },
    { 
      path: '/habits', 
      name: 'habits', 
      component: HabitsView, 
      meta: { requiresAuth: true } // <--- Add Route
    }
  ]
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;