"use client";

import { useEffect, useState } from "react";
const ThemeToggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      const theme = isChecked ? "night" : "winter";
      document.documentElement.setAttribute("data-theme", theme);
    };

    // Call once to set the initial theme based on isChecked state
    handleThemeChange();

    return () => {};
  }, [isChecked]);

  // Effect to handle theme preference stored in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsChecked(storedTheme === "night");
    } else {
      const isDarkModePreferred = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsChecked(isDarkModePreferred);
    }
  }, []);

  const toggleTheme = () => {
    setIsChecked(!isChecked);
    localStorage.setItem("theme", !isChecked ? "night" : "winter");
  };

  return (
    <label
      htmlFor="toggleTheme"
      className="cursor-pointer grid place-items-center"
    >
      <input
        role="theme-toggle"
        type="checkbox"
        id="toggleTheme"
        onChange={toggleTheme}
        className="toggle toggle-md theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
        checked={isChecked}
      />
      <svg
        className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <svg
        className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  );
};

export default ThemeToggle;
