import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export interface Habit {
  _id: string;
  title: string;
  completedDates: string[]; 
}

export const useHabitStore = defineStore('habitStore', () => {
  const habits = ref<Habit[]>([]);

  // Helper to get token headers
  const getAuthHeader = () => ({ 
    headers: { 'x-auth-token': localStorage.getItem('token') || '' } 
  });

  // 1. FETCH
  async function fetchHabits() {
    try {
      const res = await axios.get('http://localhost:5000/habits', getAuthHeader());
      habits.value = res.data;
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  // 2. ADD
  async function addHabit(title: string) {
    try {
      const res = await axios.post('http://localhost:5000/habits', { title }, getAuthHeader());
      habits.value.push(res.data);
    } catch (err) {
      console.error("Add error:", err);
    }
  }

  // 3. TOGGLE
  async function toggleHabit(id: string) {
    const habit = habits.value.find(h => h._id === id);
    if (!habit) return;

    // FIX: Explicitly cast to string to resolve TS error
    const today = new Date().toISOString().split('T')[0] as string;
    
    // Optimistic Update
    if (habit.completedDates.includes(today)) {
      habit.completedDates = habit.completedDates.filter((d: string) => d !== today);
    } else {
      habit.completedDates.push(today);
    }

    try {
      await axios.put(`http://localhost:5000/habits/${id}/toggle`, {}, getAuthHeader());
    } catch (err) {
      console.error("Sync failed", err);
    }
  }

  // 4. DELETE
  async function deleteHabit(id: string) {
    try {
      await axios.delete(`http://localhost:5000/habits/${id}`, getAuthHeader());
      habits.value = habits.value.filter(h => h._id !== id);
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  // HELPER: Calculate Streak
  function getStreak(habit: Habit): number {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const d: Date = new Date(); 
      d.setDate(today.getDate() - i);
      // FIX: Explicitly cast to string here as well
      const dateString = d.toISOString().split('T')[0] as string;

      if (habit.completedDates.includes(dateString)) {
        streak++;
      } else if (i === 0) {
        continue; 
      } else {
        break;
      }
    }
    return streak;
  }

  return { habits, fetchHabits, addHabit, toggleHabit, deleteHabit, getStreak };
});