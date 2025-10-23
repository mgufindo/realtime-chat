/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      padding: {
        15: "3.75rem",
        23: "5.625rem",
      },
      height: {
        15: "3.75rem",
      },
      colors: {
        primary: "#040E2F",
        secondary: "#3312F1",
        sidebar: "#F1F5FE",
        "light-blue": "#E3E9FD",
        "dark-primary": "#061442",
        "white-secondary": "#FAFBFF",
        "red-secondary": "#F79797",
        black: "#001F3F",
        kuning: "#F29500",
        abu: "#C8CAD0",
        abu2: "#C1C6D7",
        tab: "#F5F5F5",
        ungu: "#A4B7F9",
        "theme-white": "#FAFBFF",
        disable: "#EFEFF1",
        error: "#CF4548",
        "text-content": "#555658",
        orange: "#FF7F3A",
        "landing-primary": "#106FF6",
        "landing-secondary": "#4B82F1",
        "landing-white": "#F1F5FE",
      },
      boxShadow: {
        base: "inset 0 3px 5px -2px rgba(0,0,0,0.3),0 3px 5px -2px rgba(0,0,0,0.3)",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        jost: ["Jost", "sans-serif"],
        caveat: ["Caveat", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: false,
    darkTheme: false,
  },
  plugins: [require("daisyui")],
};
