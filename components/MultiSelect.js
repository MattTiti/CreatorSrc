import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder,
  isOpen,
  onOpenChange,
}) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[200px] justify-between"
        >
          {value.length === 0 ? placeholder : `${value.length} selected`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="max-h-[300px] overflow-y-auto rounded-md border bg-white">
          <div className="p-2">
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex items-center space-x-2 rounded-sm px-2 py-2 hover:bg-slate-100 cursor-pointer",
                  value.includes(option.value) ? "bg-slate-100" : ""
                )}
                onClick={() => onChange(option.value)}
              >
                <div
                  className={cn(
                    "h-4 w-4 border rounded-sm flex items-center justify-center",
                    value.includes(option.value)
                      ? "bg-primary border-primary"
                      : "border-gray-300"
                  )}
                >
                  {value.includes(option.value) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <span className="text-sm">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
