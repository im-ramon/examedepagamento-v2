/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary-900": "#3a983f",
                "primary-800": "#45a248",
                "primary-700": "#51ad52",
                "primary-600": "#5cb85c",
                "primary-500": "#67c366",
                "primary-400": "#72ce70",
                "primary-300": "#7dd97a",
                "primary-200": "#96d091",
                "primary-100": "#b1dcac",
                "gray-750": "#2b333e"
            }
        },
    },
}