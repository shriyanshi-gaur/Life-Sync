<!-- <script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const isRegister = ref(false); // Toggle between Login/Register

const handleSubmit = () => {
    if (isRegister.value) {
        auth.register(email.value, password.value);
    } else {
        auth.login(email.value, password.value);
    }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        {{ isRegister ? 'Create Account' : 'Welcome Back' }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-600 dark:text-gray-300 text-sm mb-1">Email</label>
          <input v-model="email" type="email" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
        </div>
        
        <div>
          <label class="block text-gray-600 dark:text-gray-300 text-sm mb-1">Password</label>
          <input v-model="password" type="password" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
        </div>

        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold">
          {{ isRegister ? 'Sign Up' : 'Login' }}
        </button>
      </form>

      <p class="text-center mt-4 text-sm text-gray-500 cursor-pointer hover:underline" @click="isRegister = !isRegister">
        {{ isRegister ? 'Already have an account? Login' : 'New here? Create account' }}
      </p>
    </div>
  </div>
</template> -->


<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const isRegister = ref(false);

const handleSubmit = () => {
    if (isRegister.value) {
        auth.register(email.value, password.value);
    } else {
        auth.login(email.value, password.value);
    }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
    
    <div class="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

    <div class="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full max-w-md border border-white/20 dark:border-gray-700 z-10 transition-all">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
          {{ isRegister ? 'Join LifeSync' : 'Welcome Back' }}
        </h1>
        <p class="text-gray-500 text-sm">
          {{ isRegister ? 'Start your productivity journey today.' : 'Sign in to continue your progress.' }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-medium text-sm mb-2 ml-1">Email Address</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="you@example.com"
            class="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" 
            required 
          />
        </div>
        
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-medium text-sm mb-2 ml-1">Password</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="••••••••"
            class="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" 
            required 
          />
        </div>

        <button 
          type="submit" 
          class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 transform active:scale-[0.98] transition-all"
        >
          {{ isRegister ? 'Create Account' : 'Login' }}
        </button>
      </form>

      <div class="mt-8 text-center border-t border-gray-100 dark:border-gray-700 pt-6">
        <p class="text-sm text-gray-500">
          {{ isRegister ? 'Already have an account?' : 'New to LifeSync?' }}
          <button 
            @click="isRegister = !isRegister"
            class="text-blue-600 hover:text-blue-700 font-semibold ml-1 hover:underline focus:outline-none"
          >
            {{ isRegister ? 'Log In' : 'Sign Up' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>