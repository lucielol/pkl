import { Button } from "@repo/ui/components/button";
import { Bell, MessageSquareText } from "lucide-react";
import { InputSearch, ModeToggle, NavbarProfile } from "@/components/molecules";

export function Navbar() {
  const baseClassButton =
    "bg-transparent text-black dark:text-white hover:bg-blue-500";
  return (
    <div className="flex py-5 justify-between w-full px-3">
      <InputSearch />
      <div className="flex gap-3">
        <Button className={baseClassButton}>
          <MessageSquareText />
        </Button>
        <Button className={baseClassButton}>
          <Bell />
        </Button>
        <ModeToggle />
        <NavbarProfile />
      </div>
    </div>
  );
}
