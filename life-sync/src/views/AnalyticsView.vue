<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore';
import ProductivityChart from '../components/ProductivityChart.vue';

// PrimeVue Imports
import Knob from 'primevue/knob';
import Card from 'primevue/card';

const store = useTaskStore();

// Calculate percentage for the Knob
const completionRate = () => {
    if (store.totalTasksCount === 0) return 0;
    return Math.round((store.completedTasksCount / store.totalTasksCount) * 100);
}
</script>

<template>
  <div class="p-6 md:p-10 max-w-6xl mx-auto min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">Analytics</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 shadow-none">
            <template #title><span class="text-sm uppercase text-gray-500 dark:text-gray-400">Total Tasks</span></template>
            <template #content>
                <p class="text-4xl font-bold text-blue-600 dark:text-blue-400">{{ store.totalTasksCount }}</p>
            </template>
        </Card>
        <Card class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 shadow-none">
            <template #title><span class="text-sm uppercase text-gray-500 dark:text-gray-400">Pending</span></template>
            <template #content>
                <p class="text-4xl font-bold text-purple-600 dark:text-purple-400">{{ store.pendingTasksCount }}</p>
            </template>
        </Card>
        <Card class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 shadow-none">
            <template #title><span class="text-sm uppercase text-gray-500 dark:text-gray-400">Completed</span></template>
            <template #content>
                <p class="text-4xl font-bold text-green-600 dark:text-green-400">{{ store.completedTasksCount }}</p>
            </template>
        </Card>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <Card class="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
        <template #title>Task Distribution</template>
        <template #content>
            <div class="flex items-center justify-center h-64" v-if="store.totalTasksCount > 0">
                <ProductivityChart />
            </div>
            <div v-else class="h-64 flex flex-col items-center justify-center text-gray-400">
                <i class="pi pi-chart-pie text-4xl mb-2"></i>
                <p>No data available</p>
            </div>
        </template>
      </Card>

      <Card class="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
        <template #title>Completion Rate</template>
        <template #content>
            <div class="flex flex-col items-center justify-center h-64">
                <Knob 
                    :modelValue="completionRate()" 
                    :size="150" 
                    valueColor="#10B981" 
                    rangeColor="#E5E7EB" 
                    :readonly="true"
                />
                <p class="mt-4 text-gray-500 dark:text-gray-400 font-medium">
                    {{ completionRate() }}% of tasks finished
                </p>
            </div>
        </template>
      </Card>

    </div>
  </div>
</template>