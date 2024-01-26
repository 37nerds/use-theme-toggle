# use-theme-toggle

Simple react hook for handling theme toggle logic

## Install

```zsh
npm install @37nerds/use-theme-toggle # or
yarn add @37nerds/use-theme-toggle # or
pnpm install @37nerds/use-theme-toggle
```

## Usage

```ts
import useThemeToggle from "@37nerds/use-theme-toggle";

const ThemeToggle = () => {
    const { theme, setTheme } = useThemeToggle({
        onLight: () => {
            document.documentElement?.classList.remove("dark");
        },
        onDark: () => {
            document.documentElement?.classList.add("dark");
        },
    });

    return (
        ...
    );
};
```
