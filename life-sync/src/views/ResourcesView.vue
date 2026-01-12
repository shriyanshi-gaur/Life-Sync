<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue';

// Interface for type safety
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
    const res = await fetch('https://dev.to/api/articles?tag=mentalhealth&per_page=9');
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
  <div class="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
    
    <div class="mb-10 text-center">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">Mental Wellness Resources</h1>
      <p class="text-gray-500 dark:text-gray-400">Curated articles from the developer community.</p>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <article 
        v-for="article in articles" 
        :key="article.id" 
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
      >
        <div class="h-48 overflow-hidden bg-gray-100 relative">
          <img 
            v-if="article.cover_image" 
            :src="article.cover_image" 
            alt="Article cover" 
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div v-else class="w-full h-full flex items-center justify-center bg-blue-50 dark:bg-gray-700 text-4xl">
            📚
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col">
          <div class="flex gap-2 mb-2 flex-wrap">
            <span v-for="tag in article.tag_list.slice(0, 3)" :key="tag" class="text-xs font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
              #{{ tag }}
            </span>
          </div>

          <h2 class="text-lg font-bold text-gray-800 dark:text-white mb-2 leading-tight">
            {{ article.title }}
          </h2>
          
          <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-1">
            {{ article.description }}
          </p>

          <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
            <div class="flex items-center gap-2">
              <img :src="article.user.profile_image" class="w-6 h-6 rounded-full" alt="Author" />
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ article.user.name }}</span>
            </div>
            
            <a 
              :href="article.url" 
              target="_blank" 
              class="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Read Article &rarr;
            </a>
          </div>
        </div>
      </article>

    </div>
  </div>
</template> -->


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Skeleton from 'primevue/skeleton';

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

onMounted(async () => {
  try {
    const res = await fetch('https://dev.to/api/articles?tag=mentalhealth&per_page=9');
    articles.value = await res.json();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
    
    <div class="mb-10 text-center">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Resources</h1>
        <p class="text-gray-500">Curated mental health advice for developers.</p>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700">
            <Skeleton height="150px" class="mb-4 rounded-lg"></Skeleton>
            <Skeleton width="60%" height="1.5rem" class="mb-2"></Skeleton>
            <Skeleton width="100%" height="1rem" class="mb-4"></Skeleton>
            <div class="flex justify-between">
                <Skeleton width="4rem" height="2rem"></Skeleton>
                <Skeleton width="4rem" height="2rem"></Skeleton>
            </div>
        </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <Card 
        v-for="article in articles" 
        :key="article.id" 
        class="overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
      >
        <template #header>
            <div class="h-48 overflow-hidden relative bg-gray-100 dark:bg-gray-700">
                <img 
                    v-if="article.cover_image" 
                    :src="article.cover_image" 
                    class="w-full h-full object-cover" 
                />
                <div v-else class="flex items-center justify-center h-full text-4xl">📚</div>
            </div>
        </template>

        <template #title>
            <h2 class="text-lg font-bold line-clamp-2 dark:text-white">{{ article.title }}</h2>
        </template>

        <template #subtitle>
            <div class="flex items-center gap-2 mt-2">
                <img :src="article.user.profile_image" class="w-6 h-6 rounded-full"/>
                <span class="text-xs text-gray-500">{{ article.user.name }}</span>
            </div>
        </template>

        <template #content>
            <div class="flex flex-wrap gap-2 mb-4 mt-2">
                <Tag 
                    v-for="tag in article.tag_list.slice(0, 3)" 
                    :key="tag" 
                    :value="tag" 
                    severity="info" 
                    rounded
                    class="text-[10px]"
                />
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {{ article.description }}
            </p>
        </template>

        <template #footer>
            <a :href="article.url" target="_blank" class="block w-full">
                <Button label="Read Article" icon="pi pi-external-link" size="small" class="w-full" outlined />
            </a>
        </template>
      </Card>

    </div>
  </div>
</template>