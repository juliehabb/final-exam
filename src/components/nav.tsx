import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaUser, FaTimes, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * Navigation bar component for the top of the page.
 * 
 * Shows login/logout, user profile, theme toggles, and a mobile menu.
 * 
 * Automatically adjusts layout for mobile vs. desktop.
 */
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  /**
   *   Sync dark mode with <html> element 
   */
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  
  /**
   * Logs out the current user by clearing localStorage and redirecting to login.
   */
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("apiKey");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow px-4 sm:px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" aria-label="Home">
        <h3 className="font-bold">Holidaze</h3>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center gap-8">
        {/* Theme color circles */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsDarkMode(false)}
            className={`w-5 h-5 rounded-full bg-white border border-gray-300 ${
              !isDarkMode ? "ring-2 ring-blue-400" : ""
            }`}
            aria-label="Light Theme"
          />
          <button
            onClick={() => setIsDarkMode(true)}
            className={`w-5 h-5 rounded-full bg-gray-800 ${
              isDarkMode ? "ring-2 ring-blue-400" : ""
            }`}
            aria-label="Dark Theme"
          />
        </div>

        <Link to="" aria-label="Favorites">
          <FaRegHeart size={22} />
        </Link>

        {user ? (
          <>
            <Link to="/profile" aria-label="Profile">
              <FaUser size={22} />
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 dark:text-white hover:text-red-500 font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-gray-600 dark:text-white hover:text-indigo-500 font-semibold"
          >
            Log in
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="sm:hidden ml-auto z-20"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center gap-6 py-6 sm:hidden z-10">
          <div className="flex gap-3">
            <button
              onClick={() => setIsDarkMode(false)}
              className={`w-5 h-5 rounded-full bg-white border ${
                !isDarkMode ? "ring-2 ring-blue-400" : ""
              }`}
              aria-label="Light Theme"
            />
            <button
              onClick={() => setIsDarkMode(true)}
              className={`w-5 h-5 rounded-full bg-gray-800 ${
                isDarkMode ? "ring-2 ring-blue-400" : ""
              }`}
              aria-label="Dark Theme"
            />
          </div>

          <Link to="/favorites" aria-label="Favorites" onClick={() => setMenuOpen(false)}>
            <FaRegHeart size={24} />
          </Link>

          {user ? (
            <>
              <Link to="/profile" aria-label="Profile" onClick={() => setMenuOpen(false)}>
                <FaUser size={24} />
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-gray-600 dark:text-white hover:text-red-500 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 dark:text-white hover:text-indigo-500 font-semibold"
            >
              Log in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
