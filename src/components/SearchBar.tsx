import React from "react";
import { FaSearch } from "react-icons/fa";

const accentColor = "#A8D8E8";

const SearchBar = () => {
    return (
        <form className="flex w-full max-w-2xl mx-auto my-6" 
        onSubmit={e => e.preventDefault()}
        >
            {/* Icon */}
            <div className="flex items-center pl-4 bg-gray-100   ">
                <FaSearch className="text-gray-400"/>
            </div>
            {/* Input */}
            <input type="text"
            className="flex-1 px-4 py-3 bg-gray-100  border-gray-200 focus:outline-none placeholder-gray-400 "
            placeholder="Search"
            readOnly
            />
            {/* Button */}
            <button
            type="button"
            className="px-6 py-3 ml-4 font-semibold"
            style={{ background: accentColor, color: "#222"}}>
                Search
            </button>
        </form>
    );
};

export default SearchBar;

