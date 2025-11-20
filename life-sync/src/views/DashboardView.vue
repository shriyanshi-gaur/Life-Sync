<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import TaskForm from '../components/TaskForm.vue';
import TaskCard from '../components/TaskCard.vue';

// 1. Initialize Store FIRST
const store = useTaskStore();

// 2. Initialize Local State
const quote = ref({ text: 'Loading motivation...', author: '' });

// 3. Single onMounted for all initialization
onMounted(async () => {
  // Fetch Tasks from Backend
  await store.fetchTasks();

  // Fetch Quote
  try {
    const res = await fetch('https://dummyjson.com/quotes/random');
    const data = await res.json();
    quote.value = { text: data.quote, author: data.author };
  } catch (e) {
    quote.value = { text: 'You can do it!', author: 'LifeSync' };
  }
});
</script>

<template>
  <div class="p-10">
    <div class="max-w-2xl mx-auto">
      
      <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white">LifeSync</h1>
        <p class="text-gray-500 mt-2">
          You have {{ store.pendingTasksCount }} tasks pending
        </p>

        <div class="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
          <p class="text-xl italic font-medium">"{{ quote.text }}"</p>
          <p class="text-right text-sm mt-2 opacity-90">- {{ quote.author }}</p>
        </div>
      </header>

      <TaskForm />

      <div class="mb-6">
        <input 
          v-model="store.searchQuery"
          type="text"
          placeholder="🔍 Search tasks..."
          class="w-full p-3 rounded border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-500 shadow-sm"
        />
      </div>

      <TransitionGroup name="list" tag="div" class="space-y-3">
        <TaskCard v-for="task in store.filteredTasks" :key="task._id" :task="task" />
      </TransitionGroup>
      
      <p v-if="store.filteredTasks.length === 0" class="text-center text-gray-400 mt-10">
        No tasks found.
      </p>

    </div>
  </div>
</template>

<style scoped>
.list-move, .list-enter-active, .list-leave-active { transition: all 0.5s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px); }
.list-leave-active { position: absolute; width: 100%; }
</style>