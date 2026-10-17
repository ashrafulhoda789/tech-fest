"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const ThemeContext = createContext(null);

export function useAppTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useAppTheme must be used within Providers"
        );
    }

    return context;
}

export default function Providers({ children }) {
    const [theme, setTheme] = useState("system");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem(
            "event-management-theme"
        );

        setTheme(
            savedTheme === "light" || savedTheme === "dark"
                ? savedTheme
                : "system"
        );

        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        const systemDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        const isDark =
            theme === "dark" ||
            (theme === "system" && systemDark);

        root.classList.toggle("dark", isDark);
        root.style.colorScheme = isDark ? "dark" : "light";

        localStorage.setItem("event-management-theme", theme);
    }, [theme, mounted]);

    useEffect(() => {
        if (!mounted || theme !== "system") return;

        const media = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

        const updateTheme = (event) => {
            document.documentElement.classList.toggle(
                "dark",
                event.matches
            );

            document.documentElement.style.colorScheme =
                event.matches ? "dark" : "light";
        };

        media.addEventListener("change", updateTheme);

        return () => {
            media.removeEventListener("change", updateTheme);
        };
    }, [theme, mounted]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                mounted,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
