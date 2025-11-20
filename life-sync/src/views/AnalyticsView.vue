<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore';
import StatCard from '../components/StatCard.vue';
import ProductivityChart from '../components/ProductivityChart.vue'; // <--- 1. Import Chart

const store = useTaskStore();
</script>

<template>
  <div class="p-10 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 dark:text-white">Productivity Analytics</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Tasks" 
        :count="store.totalTasksCount" 
        color="purple" 
      />
      <StatCard 
        title="Pending" 
        :count="store.pendingTasksCount" 
        color="blue" 
      />
      <StatCard 
        title="Completed" 
        :count="store.completedTasksCount" 
        color="green" 
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 class="text-lg font-bold text-gray-700 dark:text-white mb-4">Visual Breakdown</h2>
        
        <div v-if="store.totalTasksCount > 0">
          <ProductivityChart />
        </div>
        <div v-else class="h-64 flex items-center justify-center text-gray-400">
          Add tasks to see analytics
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded shadow flex flex-col justify-center">
        <h2 class="text-lg font-bold text-gray-700 dark:text-white mb-4">Completion Rate</h2>
        
        <div class="text-center mb-6">
           <span class="text-6xl font-bold text-green-500">
             {{ store.totalTasksCount > 0 ? Math.round((store.completedTasksCount / store.totalTasksCount) * 100) : 0 }}%
           </span>
           <p class="text-gray-500 dark:text-gray-400 mt-2">of tasks finished</p>
        </div>

        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
          <div 
            class="bg-green-500 h-6 rounded-full transition-all duration-1000 ease-out" 
            :style="{ width: (store.totalTasksCount > 0 ? (store.completedTasksCount / store.totalTasksCount) * 100 : 0) + '%' }"
          ></div>
        </div>
      </div>

    </div>

  </div>
</template>