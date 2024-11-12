import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info, AlertCircle } from "lucide-react";

export default function InfoIcon({ description, type = "info", className }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`p-0 hover:bg-transparent hover:text-neutral-700 text-neutral-500 ${className}`}
        >
          {type === "info" ? (
            <Info className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <p className="text-sm text-gray-600">{description}</p>
      </PopoverContent>
    </Popover>
  );
}
