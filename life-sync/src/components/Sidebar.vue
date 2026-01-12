<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { useDark } from '../composables/useDark';
import Avatar from 'primevue/avatar'; // Optional: Use PrimeVue Avatar if you like

const route = useRoute();
const authStore = useAuthStore();
const { isDark, toggleDark } = useDark();

const links = [
  { name: 'Dashboard', path: '/', icon: 'pi pi-home' },
  { name: 'Habits', path: '/habits', icon: 'pi pi-calendar' },
  { name: 'Journal', path: '/journal', icon: 'pi pi-book' },
  { name: 'Analytics', path: '/analytics', icon: 'pi pi-chart-bar' },
  { name: 'Resources', path: '/resources', icon: 'pi pi-globe' },
];

const handleLogout = () => {
    authStore.logout();
};
</script>

<template>
  <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen sticky top-0 transition-colors duration-300">
    
    <div class="p-6 flex items-center gap-3">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
        <h1 class="text-xl font-bold text-gray-800 dark:text-white tracking-tight">LifeSync</h1>
    </div>

    <nav class="flex-1 px-4 space-y-2 overflow-y-auto">
        <p class="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Menu</p>
        
        <RouterLink 
            v-for="link in links" 
            :key="link.path" 
            :to="link.path"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
            :class="route.path === link.path 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'"
        >
            <i :class="link.icon" class="text-lg"></i>
            <span>{{ link.name }}</span>
        </RouterLink>
        <div class="mt-8 px-4">
    <div class="bg-blue-500 rounded-xl p-4 text-white text-center shadow-lg shadow-blue-500/20">
        <p class="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">{{ new Date().toLocaleString('default', { month: 'long' }) }}</p>
        <p class="text-4xl font-bold">{{ new Date().getDate() }}</p>
        <p class="text-sm mt-1 opacity-90">{{ new Date().toLocaleString('default', { weekday: 'long' }) }}</p>
    </div>
</div>
    </nav>

    <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4 px-2">
            <span class="text-sm text-gray-500 font-medium">Dark Mode</span>
            <button 
                @click="toggleDark" 
                class="w-10 h-6 bg-gray-200 dark:bg-gray-600 rounded-full p-1 transition-colors flex items-center"
                :class="isDark ? 'justify-end' : 'justify-start'"
            >
                <div class="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </button>
        </div>

        <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                {{ authStore.user?.email?.[0].toUpperCase() || 'U' }}
            </div>
            <div class="flex-1 overflow-hidden">
                <p class="text-sm font-bold text-gray-800 dark:text-white truncate">
                    {{ authStore.user?.email?.split('@')[0] || 'User' }}
                </p>
                <button @click="handleLogout" class="text-xs text-red-500 hover:text-red-600 hover:underline">
                    Log out
                </button>
            </div>
        </div>
    </div>

  </aside>
</template>