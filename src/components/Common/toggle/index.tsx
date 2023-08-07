"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "../../ui/switch";

const Button = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Add useEffect to set the dark class on the body element
  useEffect(() => {
    document.body.classList.toggle("dark", currentTheme === "dark");
  }, [currentTheme]);

  return (
    <Switch
      onClick={() =>
        currentTheme === "dark" ? setTheme("light") : setTheme("dark")
      }
      className=""
    >
      Toggle Mode
    </Switch>
  );
};

export default Button;
