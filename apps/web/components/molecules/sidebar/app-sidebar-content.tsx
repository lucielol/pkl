"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { Home, TrendingUpDown } from "lucide-react";
import { cn } from "@repo/ui/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebarContent() {
  const pathname = usePathname();
  const items = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Prediksi Rehabilitasi",
      url: "/dashboard/predict",
      icon: TrendingUpDown,
    },
  ];

  return (
    <SidebarContent>
      <SidebarGroup className="flex items-center justify-center gap-2">
        <SidebarGroupLabel>Badan Nasional Narkotika</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="flex gap-3">
            {items.map((item) => (
              <SidebarMenuItem key={item.title} className="mx-3">
                <SidebarMenuButton
                  className="hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  asChild
                >
                  <Link
                    href={item.url}
                    className={cn(
                      "px-4",
                      pathname === item.url
                        ? "dark:bg-neutral-800 bg-neutral-200"
                        : ""
                    )}
                  >
                    <item.icon size={10} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
