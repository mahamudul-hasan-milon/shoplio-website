import { useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import useLocalStorage from "../../hooks/useLocalStorage";

const DarkMode = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div
        className={`
          absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white dark:bg-gray-900 
          shadow-md transform transition-transform duration-300
          ${theme === "dark" ? "translate-x-6" : "translate-x-1"}
        `}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {theme === "light" ? (
            <FiSun className="text-yellow-500 text-xs" />
          ) : (
            <FiMoon className="text-blue-400 text-xs" />
          )}
        </div>
      </div>
    </button>
  );
};

export default DarkMode;
