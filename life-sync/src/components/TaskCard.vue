<script setup lang="ts">
import { useTaskStore, type Task } from '../stores/taskStore';

defineProps<{
  task: Task
}>();

const store = useTaskStore();

// Helper for priority colors
const priorityColor = (p: string) => {
  if (p === 'High') return 'text-red-500 bg-red-100';
  if (p === 'Medium') return 'text-yellow-600 bg-yellow-100';
  return 'text-green-600 bg-green-100';
};
</script>

<template>
  <div 
    class="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded shadow mb-3 border-l-4 transition-all"
    :class="task.isCompleted ? 'border-green-500 opacity-60' : 'border-blue-500'"
  >
    <div class="flex items-center gap-4">
      <input 
        type="checkbox" 
        :checked="task.isCompleted" 
        @change="store.toggleTask(task._id)"
        class="w-5 h-5 cursor-pointer accent-blue-500"
      />
      
      <div>
        <h3 
          class="font-medium text-lg dark:text-white transition-colors"
          :class="{ 'line-through text-gray-400': task.isCompleted }"
        >
          {{ task.title }}
        </h3>
        
        <span 
          class="text-xs px-2 py-1 rounded font-bold mt-1 inline-block"
          :class="priorityColor(task.priority)"
        >
          {{ task.priority }} Priority
        </span>
      </div>
    </div>

    <button 
      @click="store.deleteTask(task._id)"
      class="text-red-400 hover:text-red-600 font-bold text-xl px-2"
    >
      ✕
    </button>
  </div>
</template>