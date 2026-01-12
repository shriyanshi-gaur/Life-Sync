<!-- <script setup lang="ts">
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
</template> -->

<script setup lang="ts">
import { useTaskStore, type Task } from '../stores/taskStore';

defineProps<{ task: Task }>();
const store = useTaskStore();

const priorityStyles = (p: string) => {
  if (p === 'High') return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30';
  if (p === 'Medium') return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30';
  return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30';
};
</script>

<template>
  <div 
    class="group flex justify-between items-center bg-white dark:bg-gray-800 p-4 mb-3 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    :class="{ 'opacity-60 bg-gray-50 dark:bg-gray-800/50': task.isCompleted }"
  >
    <div class="flex items-center gap-4 w-full">
      <label class="relative flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          :checked="task.isCompleted" 
          @change="store.toggleTask(task._id)"
          class="peer sr-only"
        />
        <div class="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all flex items-center justify-center">
          <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
      
      <div class="flex-1">
        <h3 
          class="font-medium text-gray-800 dark:text-gray-100 transition-all"
          :class="{ 'line-through text-gray-400 dark:text-gray-500': task.isCompleted }"
        >
          {{ task.title }}
        </h3>
      </div>

      <span 
        class="text-xs px-2.5 py-1 rounded-lg font-medium border"
        :class="priorityStyles(task.priority)"
      >
        {{ task.priority }}
      </span>
    </div>

    <button 
      @click="store.deleteTask(task._id)"
      class="ml-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>
</template>