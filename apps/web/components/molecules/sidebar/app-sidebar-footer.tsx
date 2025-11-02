"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { ChevronDown, ChevronUp, User2 } from "lucide-react";
import { useState } from "react";

export function AppSidebarFooter() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="flex justify-between">
                <div className="flex items-center gap-3">
                  <User2 /> <span>Username</span>
                </div>
                <div className="flex flex-col">
                  {isOpen === true ? (
                    <ChevronDown className="translate-y-1" size={15} />
                  ) : (
                    <ChevronUp className="translate-y-1" size={15} />
                  )}
                  {isOpen === true ? (
                    <ChevronUp className="-translate-y-1" size={15} />
                  ) : (
                    <ChevronDown className="-translate-y-1" size={15} />
                  )}
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
