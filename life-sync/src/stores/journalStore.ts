import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export interface JournalEntry {
  id: string;
  text: string;
  mood: '😊' | '😐' | '😢' | '😡' | '🚀';
  date: string;
}

export const useJournalStore = defineStore('journalStore', () => {
  // Load from local storage
  const entries = ref<JournalEntry[]>(JSON.parse(localStorage.getItem('my-journal') || '[]'));

  const addEntry = (text: string, mood: JournalEntry['mood']) => {
    entries.value.unshift({ // 'unshift' adds to the top of the list
      id: crypto.randomUUID(),
      text,
      mood,
      date: new Date().toLocaleString() // Saves date & time
    });
  };

  const deleteEntry = (id: string) => {
    entries.value = entries.value.filter(e => e.id !== id);
  };

  // Save to local storage automatically
  watch(entries, (newEntries) => {
    localStorage.setItem('my-journal', JSON.stringify(newEntries));
  }, { deep: true });

  return { entries, addEntry, deleteEntry };
});