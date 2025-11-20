<script setup lang="ts">
defineProps<{
  title: string;
  count: number;
  color: 'blue' | 'green' | 'purple'; // Restrict to specific colors
}>();

// Helper to get dynamic classes based on color prop
const colorClasses = {
  blue: 'bg-blue-100 text-blue-700 border-blue-500',
  green: 'bg-green-100 text-green-700 border-green-500',
  purple: 'bg-purple-100 text-purple-700 border-purple-500',
};
</script>

<template>
  <div 
    class="p-6 rounded-lg shadow-md border-l-4"
    :class="colorClasses[color]"
  >
    <h3 class="text-gray-600 font-medium uppercase text-xs tracking-wider">
      {{ title }}
    </h3>
    <p class="text-4xl font-bold mt-2">
      {{ count }}
    </p>
  </div>
</template>