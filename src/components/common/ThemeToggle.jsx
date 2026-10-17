"use client";

import { Moon, Sun } from "lucide-react";
import { useAppTheme } from "@/components/common/AppThemeProvider";

export default function ThemeToggle() {
    const { theme, setTheme, mounted } = useAppTheme();

    if (!mounted) {
        return (
            <button
                type="button"
                aria-label="Toggle theme"
                className="h-9 w-9"
            />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
        >
            {isDark ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}
