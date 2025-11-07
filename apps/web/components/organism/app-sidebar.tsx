import { Sidebar } from "@repo/ui/components/sidebar";
import {
  AppSidebarContent,
  AppSidebarFooter,
  AppSidebarHeader,
} from "@/components/molecules";

export default function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <AppSidebarContent />
      {/* <AppSidebarFooter /> */}
    </Sidebar>
  );
}
