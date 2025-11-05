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
import Link from "next/link";

export function AppSidebarContent() {
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
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="px-5">
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
