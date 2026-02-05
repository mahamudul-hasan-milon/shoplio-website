import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeContext = createContext(null);

const VALID_THEMES = ["light", "dark"];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const safeTheme = VALID_THEMES.includes(theme) ? theme : "light";
  const isDark = safeTheme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  const value = useMemo(() => {
    return {
      theme: safeTheme,
      setTheme,
      toggleTheme,
      isDark,
    };
  }, [safeTheme, setTheme, toggleTheme, isDark]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
