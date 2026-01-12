<!-- <script setup lang="ts">
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
</template> -->

<script setup lang="ts">
import { ref } from 'vue';
import { useJournalStore, type JournalEntry } from '../stores/journalStore';
import { useToast } from 'primevue/usetoast';

// PrimeVue Components
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Timeline from 'primevue/timeline';
import Card from 'primevue/card';

const store = useJournalStore();
const toast = useToast();
const note = ref('');
const selectedMood = ref<JournalEntry['mood']>('😊');
const moods: JournalEntry['mood'][] = ['😊', '🚀', '😐', '😢', '😡'];

const submitEntry = () => {
  if (!note.value) return;
  store.addEntry(note.value, selectedMood.value);
  toast.add({ severity: 'success', summary: 'Saved', detail: 'Journal entry added.', life: 3000 });
  note.value = '';
};
</script>

<template>
  <div class="p-6 md:p-10 max-w-4xl mx-auto min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">Mood Journal</h1>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-10">
      <div class="flex gap-4 mb-6 justify-center flex-wrap">
        <button 
          v-for="mood in moods" 
          :key="mood"
          @click="selectedMood = mood"
          class="text-3xl w-12 h-12 flex items-center justify-center rounded-full transition-all hover:scale-110"
          :class="selectedMood === mood ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700 opacity-60 hover:opacity-100'"
        >
          {{ mood }}
        </button>
      </div>

      <Textarea 
        v-model="note" 
        rows="4" 
        placeholder="How are you feeling right now?" 
        class="w-full mb-4" 
      />
      
      <Button label="Save Entry" icon="pi pi-save" @click="submitEntry" class="w-full font-bold" />
    </div>

    <Timeline :value="store.entries" align="alternate" class="customized-timeline">
        <template #opposite="slotProps">
            <small class="text-gray-500 dark:text-gray-400">{{ slotProps.item.date }}</small>
        </template>
        
        <template #marker="slotProps">
            <span class="flex w-10 h-10 items-center justify-center text-white rounded-full bg-gray-200 dark:bg-gray-700 text-2xl shadow-sm border-2 border-white dark:border-gray-800">
                {{ slotProps.item.mood }}
            </span>
        </template>
        
        <template #content="slotProps">
            <Card class="mt-4 mb-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                <template #content>
                    <div class="flex justify-between gap-4">
                        <p class="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                            {{ slotProps.item.text }}
                        </p>
                        <Button 
                            icon="pi pi-times" 
                            text 
                            rounded 
                            severity="danger" 
                            size="small"
                            class="h-8 w-8 flex-shrink-0"
                            @click="store.deleteEntry(slotProps.item.id)"
                        />
                    </div>
                </template>
            </Card>
        </template>
    </Timeline>

    <div v-if="store.entries.length === 0" class="text-center text-gray-400 mt-10">
        <p>No entries yet. Start writing your story.</p>
    </div>
  </div>
</template>