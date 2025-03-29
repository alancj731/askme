/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        // primary: '#3b82f6',
        // secondary: '#10b981',
        // danger: '#ef4444',
      },
      spacing: {
        // Add custom spacing values
        128: "32rem",
        144: "36rem",
      },
      fontFamily: {
        // Add custom fonts
        vt323: ["VT323", "monospace"],
        jetbrains: ['"JetBrains Mono"', "monospace"],
        sans: ["VT323", "monospace"],
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const fontFamilies = theme('textFamily', {});
      const utilities = {};

      Object.entries(fontFamilies).forEach(([name, font]) => {
        utilities[`.text-${name}`] = { fontFamily: font.join(', ') };
      });

      addUtilities(utilities);
    },
    require("tailwind-scrollbar"), // For scrollbar utilities
  ],
};
