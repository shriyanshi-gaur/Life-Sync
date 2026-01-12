<!-- <script setup lang="ts">
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
</style> -->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import TaskCard from '../components/TaskCard.vue';
import { useToast } from "primevue/usetoast"; // Notification hook

// PrimeVue Components
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Toast from 'primevue/toast';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const store = useTaskStore();
const toast = useToast(); // Initialize toaster

const newTaskTitle = ref('');
const newTaskPriority = ref('Low');
const priorities = ref(['Low', 'Medium', 'High']);
const quote = ref({ text: 'Loading...', author: '' });

onMounted(async () => {
  await store.fetchTasks();
  try {
    const res = await fetch('https://dummyjson.com/quotes/random');
    const data = await res.json();
    quote.value = { text: data.quote, author: data.author };
  } catch (e) {
    quote.value = { text: 'You got this!', author: 'LifeSync' };
  }
});

const handleAddTask = () => {
    if (!newTaskTitle.value) {
        toast.add({ severity: 'warn', summary: 'Empty Task', detail: 'Please enter a task title', life: 3000 });
        return;
    }
    store.addTask(newTaskTitle.value, newTaskPriority.value as 'Low' | 'Medium' | 'High');
    
    // Show success message
    toast.add({ severity: 'success', summary: 'Success', detail: 'Task added successfully', life: 3000 });
    
    newTaskTitle.value = '';
    newTaskPriority.value = 'Low';
};
</script>

<template>
  <div class="p-6 md:p-10 max-w-4xl mx-auto min-h-screen">
    <Toast /> <header class="mb-10 text-center">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">Dashboard</h1>
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl shadow-lg text-white mb-8">
        <p class="text-xl italic">"{{ quote.text }}"</p>
        <p class="text-right text-sm mt-2 opacity-90">- {{ quote.author }}</p>
      </div>
    </header>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <InputText 
            v-model="newTaskTitle" 
            placeholder="What needs to be done?" 
            class="w-full" 
            size="large"
        />
      </div>
      
      <Select 
        v-model="newTaskPriority" 
        :options="priorities" 
        placeholder="Priority" 
        class="w-full md:w-48"
      />

      <Button 
        label="Add Task" 
        icon="pi pi-plus" 
        @click="handleAddTask" 
        class="w-full md:w-auto font-bold"
      />
    </div>

    <div class="mb-6">
        <IconField iconPosition="left">
            <InputIcon class="pi pi-search" />
            <InputText v-model="store.searchQuery" placeholder="Filter tasks..." class="w-full" />
        </IconField>
    </div>

    <TransitionGroup name="list" tag="div" class="space-y-3">
      <TaskCard v-for="task in store.filteredTasks" :key="task._id" :task="task" />
    </TransitionGroup>

    <div v-if="store.filteredTasks.length === 0" class="text-center py-10 text-gray-400">
        <i class="pi pi-check-circle text-4xl mb-2"></i>
        <p>No tasks found.</p>
    </div>
  </div>
</template>

<style scoped>
.list-move, .list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(10px); }
.list-leave-active { position: absolute; width: 100%; }
</style>