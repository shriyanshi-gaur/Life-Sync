<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHabitStore } from '../stores/habitStore';
import HabitHeatmap from '../components/HabitHeatmap.vue';

const store = useHabitStore();
const newHabitTitle = ref('');

// Helper function to handle the date logic safely
const getToday = (): string => {
  return new Date().toISOString().split('T')[0] as string;
};

onMounted(() => {
  store.fetchHabits();
});

const handleAdd = () => {
  if (!newHabitTitle.value) return;
  store.addHabit(newHabitTitle.value);
  newHabitTitle.value = '';
};
</script>

<template>
  <div class="p-10 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">Habit Tracker</h1>

    <div class="flex gap-4 mb-10">
      <input 
        v-model="newHabitTitle" 
        type="text" 
        placeholder="Enter a new habit (e.g., Read 10 mins)"
        class="flex-1 p-3 rounded border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        @keyup.enter="handleAdd"
      />
      <button 
        @click="handleAdd"
        class="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded font-bold"
      >
        Start Habit
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="habit in store.habits" 
        :key="habit._id"
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-purple-500"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-bold dark:text-white">{{ habit.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">
              🔥 {{ store.getStreak(habit) }} Day Streak
            </p>
          </div>
          
          <button 
            @click="store.toggleHabit(habit._id)"
            class="px-4 py-2 rounded text-sm font-bold transition-colors"
            :class="habit.completedDates.includes(getToday()) 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          >
            {{ habit.completedDates.includes(getToday()) ? '✅ Done Today' : 'Check In' }}
          </button>
        </div>

        <HabitHeatmap :completedDates="habit.completedDates" />
        
        <button 
            @click="store.deleteHabit(habit._id)" 
            class="text-red-400 text-xs mt-4 hover:underline"
        >
            Delete Habit
        </button>
      </div>
    </div>

    <p v-if="store.habits.length === 0" class="text-center text-gray-400 mt-10">
      No habits yet. Start building consistency today!
    </p>
  </div>
</template>