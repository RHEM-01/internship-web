"use client";

import * as React from "react";

import { NavMain } from "@/components/web/admin/nav-main";
import { NavUser } from "@/components/web/admin/nav-user";
import { authClient } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { ComputerTerminalIcon, RoboticIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/admin",
      icon: <HugeiconsIcon icon={ComputerTerminalIcon} strokeWidth={2} />,
    },
    {
      title: "Companies",
      url: "/admin/companies",
      icon: <HugeiconsIcon icon={RoboticIcon} strokeWidth={2} />,
      isActive: true,
      items: [
        {
          title: "Suggestions",
          url: "#",
        },
        {
          title: "Add new company",
          url: "/admin/companies/add",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: <HugeiconsIcon icon={ComputerTerminalIcon} strokeWidth={2} />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const activeUser = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        avatar: session.user.image || "",
      }
    : {
        name: "Admin",
        email: "[EMAIL_ADDRESS]",
        avatar: "",
      };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image
                  src="/InterShip-logo.png"
                  width={32}
                  height={32}
                  alt="Logo"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">SIWES Hub</span>
                <span className="truncate text-xs text-muted-foreground">
                  Admin
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={activeUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
