<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue'; // Import the new sidebar

const route = useRoute();
// Only show Sidebar if NOT on login page
const showSidebar = computed(() => route.name !== 'login');
</script>

<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
    
    <Sidebar v-if="showSidebar" class="flex-shrink-0 z-20" />

    <main class="flex-1 relative overflow-x-hidden">
      <div class="w-full h-full">
         <RouterView />
      </div>

    </main>

  </div>
</template>