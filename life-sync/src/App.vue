<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useDark } from './composables/useDark';

const { isDark, toggleDark } = useDark();
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    
    <nav class="bg-white dark:bg-gray-800 shadow-sm p-4 mb-6 transition-colors duration-300">
      <div class="max-w-4xl mx-auto flex justify-between items-center">
        
        <!-- Links -->
        <div class="flex gap-4 md:gap-6 overflow-x-auto">
          <RouterLink 
            to="/" 
            class="text-gray-600 dark:text-gray-300 hover:text-blue-500 font-medium whitespace-nowrap"
            active-class="text-blue-600 dark:text-blue-400 font-bold"
          >
            Dashboard
          </RouterLink>
          
          <!-- NEW: Habits Link -->
          <RouterLink 
            to="/habits" 
            class="text-gray-600 dark:text-gray-300 hover:text-indigo-500 font-medium whitespace-nowrap"
            active-class="text-indigo-600 dark:text-indigo-400 font-bold"
          >
            Habits
          </RouterLink>

          <RouterLink 
            to="/journal" 
            class="text-gray-600 dark:text-gray-300 hover:text-pink-500 font-medium whitespace-nowrap"
            active-class="text-pink-600 dark:text-pink-400 font-bold"
          >
            Journal
          </RouterLink>

          <RouterLink 
            to="/analytics" 
            class="text-gray-600 dark:text-gray-300 hover:text-purple-500 font-medium whitespace-nowrap"
            active-class="text-purple-600 dark:text-purple-400 font-bold"
          >
            Analytics
          </RouterLink>

          <RouterLink 
            to="/resources" 
            class="text-gray-600 dark:text-gray-300 hover:text-green-500 font-medium whitespace-nowrap"
            active-class="text-green-600 dark:text-green-400 font-bold"
          >
            Resources
          </RouterLink>
        </div>

        <!-- Dark Mode Button -->
        <button 
          @click="toggleDark" 
          class="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white flex-shrink-0"
        >
          {{ isDark ? '🌙' : '☀️' }}
        </button>

      </div>
    </nav>

    <RouterView />
  </div>
</template>