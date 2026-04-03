import { useTheme } from "../../../core/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">
      <span>{theme === "dark" ? "🌙 Dark" : "☀️ Light"}</span>
    </button>
  );
}
