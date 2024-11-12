import { AlertTriangle } from "lucide-react";

export function WarningBanner() {
  return (
    <div className="sticky top-0 bg-yellow-100 border-b border-yellow-200 p-2 text-center z-[60] flex items-center justify-center gap-2 text-sm text-yellow-800">
      <AlertTriangle className="h-4 w-4" />
      <span>
        🚧 Website under construction - Launch date will be announced soon! 🚧
      </span>
    </div>
  );
}
