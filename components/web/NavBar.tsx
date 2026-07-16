import Image from "next/image";

import { HugeiconsIcon } from '@hugeicons/react';
import { FilterHorizontalIcon, Search02Icon } from '@hugeicons/core-free-icons';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function NavBar({
  className,
}: {
  className?: string;
}) {
  return (
    <header className={cn("sticky top-2 z-50 bg-card shadow-md shadow-blue-600/15 backdrop-blur-md flex items-center justify-between px-6 py-3 w-full rounded-lg", className)}>
      {/* Logo and Brand */}
      <div className="flex items-center gap-1">
        {/* <Logo /> */}
        <Image
          src="/InterShip-logo.png"
          width={32}
          height={32}
          alt="Logo"
        />
        <span className="text-[#003BCC] text-xl font-bold tracking-tight">
          InternShip
        </span>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-2.5 w-full max-w-2xl ml-8">
        <div className="relative flex-1">
          <HugeiconsIcon icon={Search02Icon} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search internships, companies, or roles..."
            className="w-full pl-10 pr-4 py-2 rounded-lg text-md placeholder:text-muted-foreground"
          />
        </div>
        <Button variant="outline" size="icon-lg" className="rounded-lg">
          <HugeiconsIcon icon={FilterHorizontalIcon} className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}