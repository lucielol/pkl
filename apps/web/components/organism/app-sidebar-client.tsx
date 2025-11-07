"use client";

import { SidebarProps } from "@/types";
import dynamic from "next/dynamic";

const LazySidebar = dynamic<SidebarProps>(
  () => import("@/components/organism/app-sidebar").then((m) => m.default),
  { ssr: false }
);

export default function AppSidebarClient(props: SidebarProps) {
  return <LazySidebar {...props} />;
}
