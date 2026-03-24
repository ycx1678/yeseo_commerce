const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Pretendard",
          "Noto Sans KR",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
        },
        canvas: "#f4f7fb",
      },
      boxShadow: {
        panel: "0 20px 44px rgba(15, 23, 42, 0.08)",
        soft: "0 10px 30px rgba(15, 23, 42, 0.06)",
      },
      backgroundImage: {
        "admin-surface":
          "radial-gradient(circle at top left, rgba(37, 99, 235, 0.12), transparent 32%), linear-gradient(180deg, #f8fbff 0%, #f4f7fb 100%)",
      },
    },
  },
  plugins: [],
};
