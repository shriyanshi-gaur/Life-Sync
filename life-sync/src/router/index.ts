// import { createRouter, createWebHistory } from 'vue-router';
// import DashboardView from '../views/DashboardView.vue';
// import AnalyticsView from '../views/AnalyticsView.vue';
// import JournalView from '../views/JournalView.vue';
// import ResourcesView from '../views/ResourcesView.vue';
// import LoginView from '../views/LoginView.vue';
// import HabitsView from '../views/HabitsView.vue'; // <--- Import HabitsView

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     { path: '/login', name: 'login', component: LoginView },
//     { 
//       path: '/', 
//       name: 'dashboard', 
//       component: DashboardView, 
//       meta: { requiresAuth: true } 
//     },
//     { 
//       path: '/analytics', 
//       name: 'analytics', 
//       component: AnalyticsView, 
//       meta: { requiresAuth: true } 
//     },
//     { 
//       path: '/journal', 
//       name: 'journal', 
//       component: JournalView, 
//       meta: { requiresAuth: true } 
//     },
//     { 
//       path: '/resources', 
//       name: 'resources', 
//       component: ResourcesView, 
//       meta: { requiresAuth: true } 
//     },
//     { 
//       path: '/habits', 
//       name: 'habits', 
//       component: HabitsView, 
//       meta: { requiresAuth: true } // <--- Add Route
//     }
//   ]
// });

// // Navigation Guard
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
//   if (to.meta.requiresAuth && !token) {
//     next('/login');
//   } else {
//     next();
//   }
// });

// export default router;
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guestOnly: true } // <--- Mark as "Guest Only" (redirects if logged in)
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true } // <--- PROTECTED
    },
    {
      path: '/habits',
      name: 'habits',
      component: () => import('../views/HabitsView.vue'),
      meta: { requiresAuth: true } // <--- PROTECTED
    },
    {
      path: '/journal',
      name: 'journal',
      component: () => import('../views/JournalView.vue'),
      meta: { requiresAuth: true } // <--- PROTECTED
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('../views/AnalyticsView.vue'),
      meta: { requiresAuth: true } // <--- PROTECTED
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('../views/ResourcesView.vue'),
      meta: { requiresAuth: true } // <--- PROTECTED
    }
  ]
});

// --- THE SECURITY GUARD ---
router.beforeEach((to, from, next) => {
  // We must use the store INSIDE this function to avoid initialization errors
  const authStore = useAuthStore();
  
  const isLoggedIn = authStore.isAuthenticated;

  // Rule 1: If page needs auth and user is NOT logged in -> Go to Login
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' });
  } 
  // Rule 2: If user is logged in and tries to go to Login page -> Go to Dashboard
  else if (to.meta.guestOnly && isLoggedIn) {
    next({ name: 'dashboard' });
  } 
  // Rule 3: Allow navigation
  else {
    next();
  }
});

export default router;