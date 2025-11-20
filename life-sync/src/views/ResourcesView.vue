<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Define shape of the API response
interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
  tag_list: string[];
  readable_publish_date: string;
  user: { name: string; profile_image: string };
}

const articles = ref<Article[]>([]);
const loading = ref(true);

const fetchArticles = async () => {
  try {
    // Fetching articles tagged "mentalhealth"
    const res = await fetch('https://dev.to/api/articles?tag=mentalhealth&per_page=12');
    articles.value = await res.json();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchArticles();
});
</script>

<template>
  <div class="p-10 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Mental Wellness Resources</h1>
    <p class="text-gray-500 dark:text-gray-400 mb-8">Curated articles from the developer community.</p>

    <div v-if="loading" class="text-center py-20">
      <div class="animate-spin text-4xl">⌛</div>
      <p class="text-gray-500 mt-2">Loading articles...</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div 
        v-for="article in articles" 
        :key="article.id" 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
      >
        <img 
          v-if="article.cover_image" 
          :src="article.cover_image" 
          alt="Article cover" 
          class="w-full h-48 object-cover"
        />
        <div v-else class="w-full h-48 bg-gradient-to-r from-green-200 to-blue-200 flex items-center justify-center text-4xl">
          🌿
        </div>

        <div class="p-5 flex-1 flex flex-col">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
            {{ article.title }}
          </h2>
          
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
            {{ article.description }}
          </p>

          <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div class="flex items-center gap-2">
              <img :src="article.user.profile_image" class="w-8 h-8 rounded-full" />
              <span class="text-xs text-gray-500">{{ article.user.name }}</span>
            </div>
            <span class="text-xs text-gray-400">{{ article.readable_publish_date }}</span>
          </div>
          
          <a 
            :href="article.url" 
            target="_blank" 
            class="mt-4 block text-center bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-600 transition"
          >
            Read Article ↗
          </a>
        </div>
      </div>

    </div>
  </div>
</template>