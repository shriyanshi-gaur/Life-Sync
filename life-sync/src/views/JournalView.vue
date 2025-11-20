<script setup lang="ts">
import { ref } from 'vue';
import { useJournalStore, type JournalEntry } from '../stores/journalStore';

const store = useJournalStore();
const note = ref('');
const selectedMood = ref<JournalEntry['mood']>('😊');

const moods: JournalEntry['mood'][] = ['😊', '🚀', '😐', '😢', '😡'];

const submitEntry = () => {
  if (!note.value) return;
  store.addEntry(note.value, selectedMood.value);
  note.value = ''; // Clear input
};
</script>

<template>
  <div class="p-10 max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">Mood Journal</h1>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
      
      <div class="flex gap-4 mb-4 justify-center">
        <button 
          v-for="mood in moods" 
          :key="mood"
          @click="selectedMood = mood"
          class="text-3xl p-3 rounded-full transition-transform hover:scale-125 border-2"
          :class="selectedMood === mood ? 'border-blue-500 bg-blue-50' : 'border-transparent'"
        >
          {{ mood }}
        </button>
      </div>

      <textarea 
        v-model="note"
        placeholder="How are you feeling today?"
        class="w-full p-4 rounded border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-500 h-32 resize-none"
      ></textarea>

      <button 
        @click="submitEntry"
        class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
      >
        Save Entry
      </button>
    </div>

    <div class="space-y-4">
      <div 
        v-for="entry in store.entries" 
        :key="entry.id"
        class="bg-white dark:bg-gray-800 p-4 rounded shadow border-l-4 border-blue-400 flex gap-4"
      >
        <div class="text-4xl">{{ entry.mood }}</div>
        <div class="flex-1">
          <p class="text-xs text-gray-400 mb-1">{{ entry.date }}</p>
          <p class="text-gray-800 dark:text-gray-200">{{ entry.text }}</p>
        </div>
        <button @click="store.deleteEntry(entry.id)" class="text-red-400 hover:text-red-600 font-bold self-start">✕</button>
      </div>
      
      <p v-if="store.entries.length === 0" class="text-center text-gray-400">
        No entries yet. Start writing!
      </p>
    </div>

  </div>
</template>