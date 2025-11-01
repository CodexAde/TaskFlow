import React, { useState } from "react";

const DashboardNavbar = ({ isMobile }) => {
  const [isFocused, setIsFocused] = useState(false);

  const iconClasses = `
    w-5 h-5 cursor-pointer text-gray-500 
    transition-all duration-300 ease-in-out
    hover:text-blue-500 hover:scale-105
  `;

  return (
    <div
      className="
        sticky top-0 z-[1000] w-full h-[70px]
        flex items-center justify-between px-4
        bg-white/70 backdrop-blur-xl 
        border-b border-gray-200
        shadow-[0_2px_12px_rgba(0,0,0,0.08)]
      "
    >
      {/* Brand */}
      <div className="font-semibold text-gray-800 text-lg sm:text-xl tracking-tight">
        CodexAde
      </div>

      {/* Search Input */}
      <div className="flex flex-1 justify-center">
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            transition-all duration-300 ease-in-out
            rounded-full outline-none
            border border-gray-300
            bg-white/60 backdrop-blur-md text-gray-800
            px-4 py-2 text-[15px]
            shadow-[0_2px_8px_rgba(0,0,0,0.06)]
            focus:ring-2 focus:ring-blue-400/40 focus:shadow-[0_4px_14px_rgba(0,0,0,0.1)]
            w-[50%] max-w-[400px] sm:w-[70%] sm:max-w-[200px]
            ${isFocused ? "scale-[1.02]" : "scale-100"}
          `}
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Bell */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className={iconClasses}>
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
        </svg>

        {/* Gear */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className={iconClasses}>
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52z" />
        </svg>

        {/* Person */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className={iconClasses}>
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4" />
        </svg>
      </div>
    </div>
  );
};

export default DashboardNavbar;