import { ref, onMounted } from 'vue';

export function useDark() {
  // State to track if dark mode is on
  const isDark = ref(false);

  // Toggle function
  const toggleDark = () => {
    isDark.value = !isDark.value;
    updateDOM();
  };

  // Update the HTML tag class and LocalStorage
  const updateDOM = () => {
    const html = document.documentElement;
    if (isDark.value) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Check preferences on load
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      isDark.value = true;
      updateDOM();
    }
  });

  return { isDark, toggleDark };
}