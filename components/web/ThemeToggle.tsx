"use client";

import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon01Icon, SunIcon } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";

/**
 * Provides a control for toggling between the light and dark themes.
 */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function changeTheme() {
    setTheme(resolvedTheme === "dark" || resolvedTheme === "system" ? "light" : "dark");
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon-lg">
        <span className="size-4" />
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={changeTheme}
        render={<Button variant="outline" size="icon-lg" />}
      >
        {resolvedTheme === "dark" ? (
          <HugeiconsIcon icon={SunIcon} strokeWidth={2} className="size-4" />
        ) : (
          <HugeiconsIcon icon={Moon01Icon} strokeWidth={2} className="size-4" />
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  );
}
