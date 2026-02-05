import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

import { NAVIGATION_MENU, DROPDOWN_LINKS } from "../../utils/constants";

import Button from "../Common/Button";
import Input from "../Common/Input";

import {
  FiSun,
  FiMoon,
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";

import Logo from "../../assets/logo.png";

export default function Navbar({ onOrderClick = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const { cartCount } = useCart();
  const { isDark, toggleTheme } = useTheme();

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navClassName = useMemo(() => {
    const base = "sticky top-0 z-50 transition-all duration-300";
    const scrolled = isScrolled
      ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
      : "bg-white dark:bg-gray-900";

    return `${base} ${scrolled}`;
  }, [isScrolled]);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleCartClick = useCallback(() => {
    closeMenu();
    onOrderClick?.();
  }, [closeMenu, onOrderClick]);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const q = searchQuery.trim();
      if (!q) return;

      console.log("Searching for:", q);
      closeMenu();
    },
    [searchQuery, closeMenu],
  );

  return (
    <nav className={navClassName}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src={Logo} alt="Shoplio" className="w-8 h-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shoplio
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAVIGATION_MENU.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}

            {/* Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                More
                <HiChevronDown className="group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {DROPDOWN_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearchSubmit}>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<FiSearch />}
                className="w-64"
              />
            </form>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </button>

            <button
              type="button"
              onClick={handleCartClick}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Shopping cart"
            >
              <FiShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Button onClick={handleCartClick} size="sm">
              Shop Now
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<FiSearch />}
                  className="w-full"
                />
              </form>

              {NAVIGATION_MENU.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              ))}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-4"
                >
                  {isDark ? <FiSun /> : <FiMoon />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>

                <Button
                  onClick={handleCartClick}
                  fullWidth
                  className="flex items-center justify-center gap-2"
                >
                  <FiShoppingCart />
                  Cart ({cartCount})
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onOrderClick: PropTypes.func,
};
