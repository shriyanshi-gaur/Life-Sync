<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  completedDates: string[]
}>();

// Generate last 14 days
const last14Days = computed(() => {
  const dates: string[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    // FIX: Explicitly cast to string to prevent 'undefined' type error
    dates.push(d.toISOString().split('T')[0] as string);
  }
  return dates;
});

// Check if a specific date is done
const isDone = (date: string) => props.completedDates.includes(date);
</script>

<template>
  <div class="flex gap-1 mt-4">
    <div 
      v-for="date in last14Days" 
      :key="date"
      class="w-4 h-4 rounded-sm transition-colors duration-300 relative group"
      :class="isDone(date) ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'"
    >
      <span class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
        {{ date }}
      </span>
    </div>
  </div>
</template>