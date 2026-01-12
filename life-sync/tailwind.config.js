/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [

    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // <--- Make sure this line exists!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{vue,js,ts,jsx,tsx}",
//     "./node_modules/primevue/**/*.{js,vue}",
//   ],
//   theme: {
//     extend: {
//       borderRadius: {
//         xl: '1rem',
//       },
//       backdropBlur: {
//         xl: '18px',
//       },
//       colors: {
//         accent: "#7B5CFF",
//       },
//     },
//   },
//   plugins: [],
// };
