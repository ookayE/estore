"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeChecker = () => {
  const { theme } = useTheme();

  useEffect(() => {
    console.log("Current theme:", theme);
  }, [theme]);

  return null;
};

export default ThemeChecker;
