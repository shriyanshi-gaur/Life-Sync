<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTaskStore } from '../stores/taskStore';

ChartJS.register(ArcElement, Tooltip, Legend);

const store = useTaskStore();

const chartData = computed(() => ({
  labels: ['Completed', 'Pending'],
  datasets: [
    {
      backgroundColor: ['#10B981', '#3B82F6'], // Green, Blue
      data: [store.completedTasksCount, store.pendingTasksCount]
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};
</script>

<template>
  <div class="h-64">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>