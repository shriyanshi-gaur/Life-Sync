<!-- <script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const store = useTaskStore();
const newTaskTitle = ref('');
const newTaskPriority = ref<'Low' | 'Medium' | 'High'>('Low');

const handleSubmit = () => {
  if (!newTaskTitle.value) return; // Prevent empty tasks
  
  store.addTask(newTaskTitle.value, newTaskPriority.value);
  
  // Reset form
  newTaskTitle.value = '';
  newTaskPriority.value = 'Low';
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md mb-6">
    <div class="flex gap-4">
      <input 
        v-model="newTaskTitle" 
        type="text" 
        placeholder="What needs to be done?" 
        class="flex-1 p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
      />

      <select 
        v-model="newTaskPriority"
        class="p-2 border rounded border-gray-300"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button 
        type="submit"
        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        Add
      </button>
    </div>
  </form>

</template> -->



<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const store = useTaskStore();
const newTaskTitle = ref('');
const newTaskPriority = ref<'Low' | 'Medium' | 'High'>('Low');

const handleSubmit = () => {
  if (!newTaskTitle.value) return;
  store.addTask(newTaskTitle.value, newTaskPriority.value);
  newTaskTitle.value = '';
  newTaskPriority.value = 'Low';
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 transition-all hover:shadow-md">
    <div class="flex flex-col sm:flex-row gap-2">
      <input 
        v-model="newTaskTitle" 
        type="text" 
        placeholder="Add a new task..." 
        class="flex-1 p-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
      />

      <div class="flex gap-2">
        <select 
          v-model="newTaskPriority"
          class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer font-medium text-gray-600 dark:text-gray-300"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button 
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/30"
        >
          Add
        </button>
      </div>
    </div>
  </form>
</template>