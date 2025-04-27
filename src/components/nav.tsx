import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaUser, FaTimes, FaBars } from "react-icons/fa";


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow px-4 sm:px-6 py-4 flex items-center justify-between relative " >
        {/*Logo*/}
        <Link to="/" aria-label="Home">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-8">
          {/* Theme color circles */}
          <div className="flex gap-2">
            <span className="rounded-full inline-block" style={{width: 20, height:20, background: "#eee"}} aria-label="Light Theme" />
            <span className="rounded-full inline-block" style={{width: 20, height:20, background: "#222"}} aria-label="Dark Theme" />
            <span className="rounded-full inline-block" style={{width: 20, height:20, background: "#A8D8E8"}} aria-label="Blue Theme" />
          </div>
          {/* Right-side icons */}
          <Link to="/favorites" aria-label="Favorites" >
              <FaRegHeart size={22} />
            </Link>
            <Link to="/profile" aria-label="Profile" >
              <FaUser size={22} />
          </Link>
        </div>

        {/*Hamburger Button - Mobile Only */}
        <button className="sm:hidden ml-auto z-20"
        onClick={() => setMenuOpen((open) => !open ) }
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 sm:hidden z-10">
            <div className="flex gap-3">
              <span className="rounded-full inline-block" style={{ width: 20, height: 20, background: "#eee"}} aria-label="Light Theme"/>
              <span className="rounded-full inline-block" style={{ width: 20, height: 20, background: "#222"}} aria-label="Dark Theme"/>
              <span className="rounded-full inline-block" style={{ width: 20, height: 20, background: "#A8D8E8"}} aria-label="Blue Theme"/>
            </div>
            <Link to="#" aria-label="Favorites" onClick={() => setMenuOpen(false)}>
              <FaRegHeart size={24} />
            </Link>
            <Link to="#" aria-label="Profile" onClick={() => setMenuOpen(false)}>
              <FaUser size={24} />
            </Link>
          </div>
        )}


        </nav>
    );
};

export default NavBar;