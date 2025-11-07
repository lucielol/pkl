import { Button } from "@repo/ui/components/button";
import { Bell, MessageSquareText } from "lucide-react";
import { InputSearch, ModeToggle, NavbarProfile } from "@/components/molecules";

export function AppNavbar() {
  const baseClassButton =
    "bg-transparent text-black dark:text-white hover:bg-neutral-100 cursor-pointer";
  return (
    <div className="flex py-5 justify-between w-full px-3">
      <InputSearch />
      <div className="flex gap-3">
        <Button variant={"ghost"} className={baseClassButton}>
          <MessageSquareText />
        </Button>
        <Button variant={"ghost"} className={baseClassButton}>
          <Bell />
        </Button>
        <ModeToggle />
        <NavbarProfile />
      </div>
    </div>
  );
}
