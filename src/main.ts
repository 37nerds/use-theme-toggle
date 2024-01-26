import { useCallback, useEffect, useState } from "react";

type TTheme = "system" | "light" | "dark";

const get_device_prefer_theme = (): "light" | "dark" => {
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return "dark";
    } else {
        return "light";
    }
};

const localStorageHelper = {
    get: (key: string): TTheme => {
        return (localStorage.getItem(key) || "system") as TTheme;
    },
    set: (key: string, theme: TTheme): void => {
        localStorage.setItem(key, theme);
    },
};

const useThemeToggle = ({
    onLight,
    onDark,
    localStorageKey = "theme-preference",
}: {
    onLight: () => void;
    onDark: () => void;
    localStorageKey?: string;
}) => {
    const [theme, setTheme] = useState<TTheme>("system");

    useEffect(() => {
        setTheme(localStorageHelper.get(localStorageKey));
    }, []);

    const set_system_theme_to_document = useCallback(() => {
        switch (get_device_prefer_theme()) {
            case "light":
                return onLight();
            case "dark":
                return onDark();
        }
    }, [get_device_prefer_theme, onLight, onDark]);

    useEffect(() => {
        const x = window.matchMedia("(prefers-color-scheme: dark)");
        const handle_change = () => {
            if (localStorageHelper.get(localStorageKey) === "system") {
                set_system_theme_to_document();
            }
        };
        x.addEventListener("change", handle_change);
        return () => {
            x.removeEventListener("change", handle_change);
        };
    }, []);

    useEffect(() => {
        switch (theme) {
            case "system":
                set_system_theme_to_document();
                localStorageHelper.set(localStorageKey, "system");
                return;
            case "light":
                onLight();
                localStorageHelper.set(localStorageKey, "light");
                return;
            case "dark":
                onDark();
                localStorageHelper.set(localStorageKey, "dark");
                return;
        }
    }, [theme]);

    return { theme, setTheme };
};

export { TTheme };

export default useThemeToggle;
