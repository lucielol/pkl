import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@repo/ui/components/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex justify-center items-center pt-5">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
