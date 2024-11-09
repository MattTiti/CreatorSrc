import { Loader2 } from "lucide-react";

const Spinner = () => (
  <div className="flex justify-center items-center py-24">
    <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
  </div>
);

export default Spinner;
