import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export interface Task {
  _id: string; // MongoDB uses _id
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  isCompleted: boolean;
  createdAt?: string;
}

export const useTaskStore = defineStore('taskStore', () => {
  // --- STATE ---
  const tasks = ref<Task[]>([]);
  const searchQuery = ref('');

  // Helper to get headers with Token
  const getAuthHeader = () => {
    return { headers: { 'x-auth-token': localStorage.getItem('token') } };
  };

  // --- ACTIONS (API CALLS) ---

  // 1. FETCH TASKS
  async function fetchTasks() {
    try {
      const res = await axios.get('http://localhost:5000/tasks', getAuthHeader());
      tasks.value = res.data;
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  }

  // 2. ADD TASK
  async function addTask(title: string, priority: 'Low' | 'Medium' | 'High') {
    try {
      const res = await axios.post('http://localhost:5000/tasks', { title, priority }, getAuthHeader());
      // Add to top of list
      tasks.value.unshift(res.data); 
    } catch (err) {
      console.error("Error adding task", err);
    }
  }

  // 3. DELETE TASK
  async function deleteTask(id: string) {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, getAuthHeader());
      // Remove from local state
      tasks.value = tasks.value.filter(t => t._id !== id);
    } catch (err) {
      console.error("Error deleting task", err);
    }
  }

  // 4. TOGGLE TASK (Optimistic Update)
  async function toggleTask(id: string) {
    const task = tasks.value.find(t => t._id === id);
    if (!task) return;

    // 1. Update UI immediately (so it feels fast)
    task.isCompleted = !task.isCompleted;

    try {
      // 2. Send update to server
      await axios.put(`http://localhost:5000/tasks/${id}`, 
        { isCompleted: task.isCompleted }, 
        getAuthHeader()
      );
    } catch (err) {
      console.error("Error updating task", err);
      // 3. Revert UI if server fails
      task.isCompleted = !task.isCompleted; 
    }
  }

  // --- GETTERS (COMPUTED VALUES) ---

  // Filtered list based on search query
  const filteredTasks = computed(() => {
    if (!searchQuery.value) return tasks.value;
    return tasks.value.filter(task => 
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  // Counts for Analytics
  const pendingTasksCount = computed(() => tasks.value.filter(t => !t.isCompleted).length);
  const completedTasksCount = computed(() => tasks.value.filter(t => t.isCompleted).length);
  const totalTasksCount = computed(() => tasks.value.length);

  return { 
    tasks, 
    searchQuery,
    fetchTasks, 
    addTask, 
    deleteTask, 
    toggleTask,
    filteredTasks,
    pendingTasksCount,
    completedTasksCount,
    totalTasksCount
  };
});