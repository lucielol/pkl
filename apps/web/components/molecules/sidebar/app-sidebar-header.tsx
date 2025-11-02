import { SidebarHeader } from "@repo/ui/components/sidebar";
import Image from "next/image";

export function AppSidebarHeader() {
  return (
    <SidebarHeader className="flex justify-center items-center pt-5">
      {/* <h1 className="text-3xl font-bold">Dashboard</h1> */}
      <Image src={"/images/bnn-logo.png"} alt="" width={80} height={10} />
    </SidebarHeader>
  );
}
