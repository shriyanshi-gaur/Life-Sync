import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import router from '../router';

export const useAuthStore = defineStore('auth', () => {
    // State
    const token = ref(localStorage.getItem('token') || '');
    const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

    // Getters
    const isAuthenticated = computed(() => !!token.value);

    // Actions
    async function login(email: string, password: string) {
        try {
            const res = await axios.post('http://localhost:5000/login', {
                email,
                password
            });

            // Save data
            token.value = res.data.token;
            user.value = res.data.user;
            
            localStorage.setItem('token', token.value);
            localStorage.setItem('user', JSON.stringify(user.value));

            // Redirect
            router.push('/');
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid credentials");
        }
    }

    async function register(email: string, password: string) {
        try {
            await axios.post('http://localhost:5000/register', {
                email,
                password
            });
            alert("Registration successful! Please login.");
            router.push('/login');
        } catch (error) {
            alert("Registration failed");
        }
    }

    function logout() {
        token.value = '';
        user.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    }

    return { token, user, isAuthenticated, login, register, logout };
});