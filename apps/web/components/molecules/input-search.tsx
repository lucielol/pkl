import { Input } from "@repo/ui/components/input";
import { Search } from "lucide-react";

export function InputSearch() {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input type="text" placeholder="Search..." className="pl-10 h-10" />
    </div>
  );
}
