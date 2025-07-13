import daisyui from "daisyui";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#ff6154",    // blue
                    "secondary": "#f97316",  // orange
                    "accent": "#9333ea",     // purple
                    "neutral": "#1f2937",    // dark gray
                    "base-100": "#ffffff",   // background
                    "info": "#0ea5e9",       // sky blue
                    "success": "#10b981",    // green
                    "warning": "#facc15",    // yellow
                    "error": "#ef4444",      // red
                },
            },
        ],
    },
};
