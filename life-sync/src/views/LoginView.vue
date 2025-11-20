<script setup lang="ts">
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
</template>