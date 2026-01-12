<!-- <script setup lang="ts">
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
</template> -->

<script setup lang="ts">
defineProps<{
  title: string;
  count: number;
  color: 'blue' | 'green' | 'purple';
}>();

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center transition-transform hover:scale-105">
    <div 
      class="w-12 h-12 rounded-full flex items-center justify-center mb-3"
      :class="colorClasses[color]"
    >
      <span class="text-xl font-bold">{{ count }}</span>
    </div>
    <h3 class="text-gray-500 dark:text-gray-400 font-medium text-sm tracking-wide uppercase">
      {{ title }}
    </h3>
  </div>
</template>