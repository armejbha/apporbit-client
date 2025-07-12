
// src/hooks/useThemeMode.js
import { useEffect, useState } from "react";

const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export default function useThemeMode() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || getSystemTheme();
    });

    // Toggle between dark and light
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    // Apply the theme to the <html> as data-theme
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    // Listen to system theme changes only if user hasn't selected a manual theme
    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            if (!localStorage.getItem("theme")) {
                const newSystemTheme = e.matches ? "dark" : "light";
                setTheme(newSystemTheme);
            }
        };
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, []);

    return { theme, toggleTheme };
}
