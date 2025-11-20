<script setup lang="ts">
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
</template>