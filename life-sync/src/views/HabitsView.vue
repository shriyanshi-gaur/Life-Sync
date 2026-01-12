<!-- <script setup lang="ts">
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
</template> -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHabitStore } from '../stores/habitStore';
import HabitHeatmap from '../components/HabitHeatmap.vue';

// PrimeVue Imports
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';

const store = useHabitStore();
const toast = useToast();
const newHabitTitle = ref('');

const getToday = (): string => new Date().toISOString().split('T')[0] as string;

onMounted(() => {
  store.fetchHabits();
});

const handleAdd = () => {
  if (!newHabitTitle.value) return;
  store.addHabit(newHabitTitle.value);
  toast.add({ severity: 'success', summary: 'Habit Started', detail: 'Consistency is key!', life: 3000 });
  newHabitTitle.value = '';
};

const handleCheckIn = (id: string, isDone: boolean) => {
    store.toggleHabit(id);
    if (!isDone) {
        toast.add({ severity: 'info', summary: 'Checked In', detail: 'Keep the streak alive!', life: 2000 });
    }
}
</script>

<template>
  <div class="p-6 md:p-10 max-w-5xl mx-auto min-h-screen">
    <div class="mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-1">Habit Tracker</h1>
        <p class="text-gray-500">Build better routines, one day at a time.</p>
      </div>
    </div>

    <div class="flex gap-2 mb-8">
      <InputText 
        v-model="newHabitTitle" 
        placeholder="Enter a new habit (e.g., Read 10 mins)" 
        class="flex-1" 
        @keyup.enter="handleAdd"
      />
      <Button 
        label="Start Habit" 
        icon="pi pi-plus" 
        @click="handleAdd" 
        class="font-bold"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card 
        v-for="habit in store.habits" 
        :key="habit._id" 
        class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
      >
        <template #title>
          <div class="flex justify-between items-start">
            <span class="text-xl font-bold dark:text-white">{{ habit.title }}</span>
            <Tag :value="`🔥 ${store.getStreak(habit)} Day Streak`" severity="warn" rounded />
          </div>
        </template>

        <template #content>
            <div class="mt-2 mb-6">
                <HabitHeatmap :completedDates="habit.completedDates" />
            </div>
            
            <div class="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4">
                 <Button 
                    :label="habit.completedDates.includes(getToday()) ? 'Completed' : 'Check In'"
                    :icon="habit.completedDates.includes(getToday()) ? 'pi pi-check-circle' : 'pi pi-circle'"
                    :severity="habit.completedDates.includes(getToday()) ? 'success' : 'secondary'"
                    @click="handleCheckIn(habit._id, habit.completedDates.includes(getToday()))"
                    class="w-32 transition-all"
                    :outlined="!habit.completedDates.includes(getToday())"
                 />

                <Button 
                    icon="pi pi-trash" 
                    text 
                    severity="danger" 
                    aria-label="Delete" 
                    @click="store.deleteHabit(habit._id)" 
                />
            </div>
        </template>
      </Card>
    </div>

    <div v-if="store.habits.length === 0" class="text-center py-20 text-gray-400">
      <i class="pi pi-calendar text-4xl mb-4"></i>
      <p>No habits yet. Start today!</p>
    </div>
  </div>
</template>