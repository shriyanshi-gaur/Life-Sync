// import { ref, onMounted } from 'vue';

// export function useDark() {
//   // State to track if dark mode is on
//   const isDark = ref(false);

//   // Toggle function
//   const toggleDark = () => {
//     isDark.value = !isDark.value;
//     updateDOM();
//   };

//   // Update the HTML tag class and LocalStorage
//   const updateDOM = () => {
//     const html = document.documentElement;
//     if (isDark.value) {
//       html.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       html.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   };

//   // Check preferences on load
//   onMounted(() => {
//     const savedTheme = localStorage.getItem('theme');
//     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
//       isDark.value = true;
//       updateDOM();
//     }
//   });

//   return { isDark, toggleDark };
// }

import { ref, onMounted } from 'vue';

export function useDark() {
  const isDark = ref(false);

  const toggleDark = () => {
    isDark.value = !isDark.value;
    updateHtmlClass();
  };

  const updateHtmlClass = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial state based on saved preference or system setting
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      isDark.value = true;
    } else {
      isDark.value = false;
    }
    updateHtmlClass();
  });

  return { isDark, toggleDark };
}